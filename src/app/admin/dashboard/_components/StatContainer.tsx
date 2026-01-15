"use client";
import { StatCard } from "@/components/shared/StatCard";
import { Tickets, UserRound, Wallet } from "lucide-react";

const StatContainer = () => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 `}>
      <StatCard
        title='Active User'
        value={"8"}
        suffix={"K+"}
        change={{ value: "+11.01%", positive: true }}
        icon={<UserRound />}
        className='bg-[#211604]'
      />
      <StatCard
        title='Ongoing events'
        value={"100"}
        suffix={"+events"}
        change={{ value: "+6.08%", positive: true }}
        icon={<Tickets />}
        className='bg-[#211604]'
      />
      <StatCard
        title='Total Earning'
        value={"100"}
        suffix={"k+"}
        prefix="$"
        change={{ value: "+6.08%", positive: true }}
        icon={<Wallet />}
        className='bg-[#211604]'
      />
    </div>
  );
};

export default StatContainer;
