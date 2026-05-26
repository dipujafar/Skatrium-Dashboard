"use client";;
import {  Switch, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import { useState } from "react";

type TUser = {
    id: number;
    country: string;
    code: string;
    status: string;
};

const data = Array.from({ length: 10 }, (_, index) => {
    return {
        id: index,
        country: index % 2 === 0 ? "United Kingdom" : `United States`,
        code: index % 2 === 0 ? `UK` : `US`,
        status: "Active",
    };
})

const CountryManagementTable = () => {
    const [open, setOpen] = useState<boolean>(false);


    const columns: TableProps<TUser>["columns"] = [
        {
            title: "COUNTRY",
            dataIndex: "country",
           
        },
        {
            title: "CODE",
            dataIndex: "code",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => <p className="text-[#4BB54B]">{text}</p>,
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <Switch defaultChecked  />
            ),
        },
    ];

    return (
        <div className="border border-[#FFFFFF33]/[0.2] rounded-xl">
            <div className='rounded-2xl'>
                <DataTable
                    columns={columns}
                    data={data}
                    // pagination={true}
                ></DataTable>
                {/* <UserDetails open={open} setOpen={setOpen}></UserDetails> */}
            </div>
        </div>
    );
};

export default CountryManagementTable;
