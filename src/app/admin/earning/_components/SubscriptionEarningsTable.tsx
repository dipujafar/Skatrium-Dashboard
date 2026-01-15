"use client";;
import { TableProps } from "antd";
import DataTable from "@/utils/DataTable";

type TUser = {
    name: string;
    subscriptionType: string;
    amount: number;
    expireDate: string;
    date: string;
};

const data = Array.from({ length: 10 }, (_, index) => {
    return {
        name: `Jane Cooper`,
        subscriptionType: "Free",
        amount: 1000,
        expireDate: "6 April, 2023",
        date: "6 April, 2023",
    };
})

const SubscriptionEarningsTable = () => {

    

    const columns: TableProps<TUser>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Subscription Type",
            dataIndex: "subscriptionType",
            //align: "center",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            //align: "center",
        },
        {
            title: "Expire date",
            dataIndex: "expireDate",
            //align: "center",
        },
        {
            title: "Purchase date",
            dataIndex: "date",
            //align: "center",
        },
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

export default SubscriptionEarningsTable;
