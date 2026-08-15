"use client";
import { useGetDashboardPageDataQuery } from "@/redux/api/dashboardApi";
import EventList from "./_components/EventList/EventList";
import PlatformAnalyticsChart from "./_components/platformAnalytics/PlatformAnalyticsChart";
import RecentlyUser from "./_components/RecentlyUser";
import StatContainer from "./_components/StatContainer";
import { useState } from "react";
import { Spin } from "antd";

const DashboardPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSetSelectedYear] = useState(currentYear);
  const queries: Record<string, string | number> = {};
  queries.year = selectedYear;
  queries.limit = 5;
  const { data, isLoading } = useGetDashboardPageDataQuery(queries);

  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="lg:space-y-5 space-y-3 ">
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
        <div className="xl:col-span-4 space-y-4">
          <StatContainer data={data?.data?.stats} />
          <PlatformAnalyticsChart
            analytics={data?.data?.analytics}
            selectedYear={selectedYear}
            setSelectedYear={setSetSelectedYear}
          />
        </div>
        <EventList data={data?.data?.eventList} />
      </div>
      <RecentlyUser data={data?.data?.newUsers} />
    </div>
  );
};

export default DashboardPage;
