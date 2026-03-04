"use client";;
import { Image, Input, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import moment from "moment";
import { useState } from "react";

type TUser = {
    id: number;
    name: string;
    email: string;
    date: string;
    status: string;
};

const data = Array.from({ length: 10 }, (_, index) => {
    return {
        id: index,
        name: `Jane Cooper`,
    email: `user${index}@example.com`,
        date: "6 April, 2023",
        status: "Active",
    };
})

const SubscribeEmailTable = () => {
    const [open, setOpen] = useState<boolean>(false);

    const columns: TableProps<TUser>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            //align: "center",
            render: (text) => <p>#{text + 1}</p>,
        },
        {
            title: "User",
            dataIndex: "name",
            //align: "center",
            render: (text, record) => (
                <div className='flex items-center gap-x-3'>
                    <Image
                        src={"/user_image.jpg"}
                        alt='profile-picture'
                        width={40}
                        height={40}
                        className='size-10 aspect-square object-cover rounded-full'
                    ></Image>
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
            title: "Subscribed at",
            dataIndex: "createdAt",
            //align: "center",
            render: (text) => <p>{moment(text).format("LL")}</p>,
        },
        {
            title: "Status",
            dataIndex: "status",
            //align: "center",
            render: (text) => <p className="text-[#4BB54B]">{text}</p>,
        }
    ];

    return (
        <div className="space-y-5">
            <Input.Search placeholder="Search here" size="large" className="max-w-[300px]" />
            <div className="border border-[#FFFFFF33]/[0.2] rounded-t-xl">
                <div className='rounded-2xl'>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={true}
                    ></DataTable>
                    <UserDetails open={open} setOpen={setOpen}></UserDetails>
                </div>
            </div>
        </div>
    );
};

export default SubscribeEmailTable;
