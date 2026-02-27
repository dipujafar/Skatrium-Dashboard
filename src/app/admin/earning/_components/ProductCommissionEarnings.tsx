"use client";;
import { TableProps } from "antd";
import DataTable from "@/utils/DataTable";

type TUser = {
    name: string;
    ticketCost: number;
    totalSales: number;
    totalEarnings: number;
};

const data = Array.from({ length: 10 }, (_, index) => {
    return {
        name: `Skating gear`,
        ticketCost: 50,
        totalSales: 50,
        totalEarnings: 10,
    };
})

const ProductCommissionEarnings = () => {

    const columns: TableProps<TUser>["columns"] = [
        {
            title: "Products name",
            dataIndex: "name",
        },
        {
            title: "Price",
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

export default ProductCommissionEarnings;
