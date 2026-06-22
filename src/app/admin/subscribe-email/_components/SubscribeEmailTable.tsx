"use client";;
import { Image, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import moment from "moment";
import { useGetSubscriptionUsersQuery } from "@/redux/api/subscriptionEmailApi";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type TUser = {
    id: number;
    fullName: string;
    email: string;
    date: string;
    status: string;
    image: { url: string }
};

// const data = Array.from({ length: 10 }, (_, index) => {
//     return {
//         id: index,
//         name: `Jane Cooper`,
//         email: `user${index}@example.com`,
//         date: "6 April, 2023",
//         status: "Active",
//     };
// })

const SubscribeEmailTable = () => {
    const page = useSearchParams().get("page") || "1";
    const limit = useSearchParams().get("limit") || "12";
    const [searchText, setSearchText] = useState("");
    const [searchValue] = useDebounce(searchText, 500);


    const queries: Record<string, string | number> = {};
    if (page) queries.page = page;
    if (limit) queries.limit = limit;
    if (searchValue) {
        delete queries.page
        delete queries.limit
        queries.search = searchValue};
    queries.status = "active"

    const { data, isLoading } = useGetSubscriptionUsersQuery(queries);

    const columns: TableProps<TUser>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            //align: "center",
            render: (_, __, index) => <p>
                {
                    `# ${Number(page) === 1
                        ? index + 1
                        : (Number(page) - 1) * Number(limit) + index + 1
                    }`}
            </p>,
        },
        {
            title: "User",
            dataIndex: "fullName",
            //align: "center",
            render: (text, record) => (
                <div className='flex items-center gap-x-3'>
                    {record?.image?.url ? <Image
                        src={record?.image?.url}
                        alt='profile-picture'
                        width={40}
                        height={40}
                        className='size-10 aspect-square object-cover rounded-full'
                    ></Image> : <div className='size-10 aspect-square object-cover rounded-full bg-[#312912] flex items-center justify-center text-white text-sm font-semibold'>{record?.fullName?.charAt(0).toUpperCase()}</div>}
                    <p className='font-bold'>{text}</p>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            //align: "center",
        },
        {
            title: "Subscribed on",
            dataIndex: "createdAt",
            //align: "center",
            render: (text) => <p>{moment(text).format("LL")}</p>,
        },
        {
            title: "Status",
            dataIndex: "isActive",
            //align: "center",
            render: (text) => <p className="text-[#4BB54B]">{text ? "Active" : "Inactive"}</p>,
        }
    ];

    return (
        <div className="space-y-5">
            <Input.Search value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search here" size="large" className="max-w-[300px] flex fleend" />
            <div className="border border-[#FFFFFF33]/[0.2] rounded-t-xl">
                <div className='rounded-2xl'>
                    <DataTable
                        columns={columns}
                        data={data?.data?.users}
                        isLoading={isLoading}
                        pageSize={Number(limit)} total={data?.data?.meta?.total}
                    ></DataTable>
                </div>
            </div>
        </div>
    );
};

export default SubscribeEmailTable;
