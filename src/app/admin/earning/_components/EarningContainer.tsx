'use client';
import { StatCard } from "@/components/shared/StatCard";
import { Tabs, TabsProps } from "antd";
import { Wallet } from "lucide-react";
import SubscriptionEarningsTable from "./SubscriptionEarningsTable";
import CommissionEarningsTable from "./CommissionEarningsTable";

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Subscription Earnings',
    children: <SubscriptionEarningsTable />,
  },
  {
    key: '2',
    label: 'Commission Earnings',
    children: <CommissionEarningsTable />,
  }
];

const EarningContainer = () => {
  return (
    <div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-2xl mb-4`}>
        <StatCard
          title='Total Ticket Sales'
          prefix="$"
          value={"100"}
          suffix={"K+ Sales"}
          change={{ value: "+11.01%", positive: true }}
          icon={<Wallet />}
          className='bg-[#211604]'
        />
        <StatCard
          title='Subscription Earning'
          value={"100"}
          suffix={"+K"}
          change={{ value: "+6.08%", positive: true }}
          icon={<Wallet />}
          className='bg-[#211604]'
        />
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default EarningContainer;

