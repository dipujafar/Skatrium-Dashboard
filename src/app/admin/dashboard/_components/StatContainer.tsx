"use client";
import { StatCard } from "@/components/shared/StatCard";
import { Tickets, UserRound, Wallet } from "lucide-react";

const StatContainer = ({ data }: { data: any }) => {

  const eventEaring = [
    {
      amount: 7000,
      currency: "BDT",
    }
  ]
  const subscriptionEaring = [
    {
      amount: 600,
      currency: "BDT",
    },
    {
      amount: 8,
      currency: "USD",
    }
  ]
  

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title='Active User'
        value={data?.activeUsers}
        // suffix={"K+"}
        // change={{ value: "+11.01%", positive: true }}
        icon={<UserRound />}
        className='bg-[#211604]'
      />
      <StatCard
        title='Ongoing events'
        value={data?.ongoingEvents}
        // suffix={"events"}
        // change={{ value: "+6.08%", positive: true }}
        icon={<Tickets />}
        className='bg-[#211604]'
      />
      <StatCard
        title='Subscription Earning'
        // value={data?.totalEarning}
        value={subscriptionEaring}
        // prefix="$"
        // change={{ value: "+6.08%", positive: true }}
        icon={<Wallet />}
        className='bg-[#211604]'
      />
      <StatCard
        title='Event Earning'
        value={eventEaring}
        // prefix="$"
        // change={{ value: "+6.08%", positive: true }}
        icon={<Wallet />}
        className='bg-[#211604]'
      />
    </div>
  );
};

export default StatContainer;
