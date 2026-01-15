"use client";;
import { TableProps } from "antd";
import DataTable from "@/utils/DataTable";

type TUser = {
    name: string;
    ticketCost: number;
    totalSales: number;
    totalEarnings: number;
    date: string;
};

const data = Array.from({ length: 10 }, (_, index) => {
    return {
        name: `Sunset Skate Session`,
        ticketCost: 50,
        totalSales: 50,
        totalEarnings: 10,
        date: "6 April, 2023",
    };
})

const CommissionEarningsTable = () => {

    const columns: TableProps<TUser>["columns"] = [
        {
            title: "Event name",
            dataIndex: "name",
        },
        {
            title: "Ticket Cost",
            dataIndex: "ticketCost",
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Total Sales",
            dataIndex: "totalSales",
            render: (text) => <p>${text}K</p>,
        },
        {
            title: "Total Earings",
            dataIndex: "totalEarnings",
            render: (text) => <p>${text}K</p>,
        },
        {
            title: "Event Date",
            dataIndex: "date",
        }
    ];

    return (
        <div className='rounded-2xl'>
            <DataTable
                columns={columns}
                data={data}
            ></DataTable>
        </div>
    );
};

export default CommissionEarningsTable;
