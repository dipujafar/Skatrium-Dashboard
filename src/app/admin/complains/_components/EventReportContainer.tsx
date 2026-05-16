"use client";
import PaginationSection from "@/components/shared/PaginationSection";
import EventReportCard from "./EventReportCard";
import { useGetAllEventReportQuery } from "@/redux/api/eventReportsApi";
import { useSearchParams } from "next/navigation";
import { Empty, Spin } from "antd";
import EmptyData from "@/components/shared/EmptyData";

const EventReportContainer = () => {
    const page = useSearchParams().get("page")
    const pageSize = 12;

    const { data, isLoading } = useGetAllEventReportQuery({ page, limit: pageSize });

    const reports = data?.data?.reports || [];
    const total = data?.data?.meta?.total || 0;

    const handleViewDetails = (id: string) => {
        console.log("View details for event:", id);
    };

    if (isLoading) return <div className="flex justify-center items-center min-h-[calc(100vh-250px)]"><Spin size="large" /></div>

    return (
        <div className="border border-[#FFFFFF33]/[0.2] rounded-2xl py-5 px-4">
            <h4 className="text-[#93A4B0] text-xl font-semibold mb-4">All Reports</h4>
            <div>
                {
                    total === 0 && <div>  <EmptyData message="No reports " /> </div>
                }
                {total > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {reports.map((event: any) => (
                        <EventReportCard
                            key={event?._id}
                            event={event}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>}
            </div>
            <PaginationSection
                total={total}
                current={Number(page)}
                pageSize={pageSize}
            />
        </div>
    );
};

export default EventReportContainer;