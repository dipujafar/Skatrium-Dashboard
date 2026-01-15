"use client";
import { Image, Input, message, Popconfirm, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        email: `organizer${index}@example.com`,
        date: "6 April, 2023",
        status: index % 2 === 0 ? "Active" : "Pending",
    };
})

const OrganizerTable = () => {
    const [open, setOpen] = useState<boolean>(false);


    const confirmBlock = async (user: TUser) => {
        message.success("Blocked the user");
    };

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
            title: "Join Date",
            dataIndex: "createdAt",
            //align: "center",
            render: (text) => <p>{moment(text).format("LL")}</p>,
        },
        {
            title: "Status",
            dataIndex: "status",
            //align: "center",
            render: (text) => <p className={cn("text-[#4BB54B]", text === "Pending" && "text-[#FFA36E]")}>{text}</p>,
        },

        {
            title: "Action",
            dataIndex: "action",
            //align: "center",
            render: (text, record) => (
                <div className='flex items-center gap-2'>
                    <Link href={`/admin/users/organizer`}>
                        <Eye
                            size={22}
                            color='#78C0A8'
                            onClick={() => setOpen(true)}
                            className='cursor-pointer'
                        />
                    </Link>
                    <Popconfirm
                        title='Block the user'
                        description={`Are you sure to block this user?`}
                        onConfirm={() => confirmBlock(record)}
                        okText='Yes'
                        cancelText='No'
                    >
                        <CgUnblock
                            size={22}
                            color={"red"}
                            className='cursor-pointer'
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="border border-[#FFFFFF33]/[0.2] rounded-t-xl">
            <div className="flex items-center justify-between py-2 px-2">
                <h4 className="text-xl font-semibold text-[#cad1d6]">All Organizers</h4>
                <Input.Search placeholder="Search here" size="large" className="max-w-[300px]" />
            </div>
            <div className='rounded-2xl'>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination={true}
                ></DataTable>
                <UserDetails open={open} setOpen={setOpen}></UserDetails>
            </div>
        </div>
    );
};

export default OrganizerTable;
