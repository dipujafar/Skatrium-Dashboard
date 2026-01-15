import EventList from "./_components/EventList/EventList";
import PlatformAnalyticsChart from "./_components/platformAnalytics/PlatformAnalyticsChart";
import RecentlyUser from "./_components/RecentlyUser";
import StatContainer from "./_components/StatContainer";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-5 space-y-3 ">

      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
        <div className="xl:col-span-4 space-y-4">
          <StatContainer />
          <PlatformAnalyticsChart />
        </div>
        <EventList />
      </div>
      <RecentlyUser />
    </div>
  );
};

export default DashboardPage;
