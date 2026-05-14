"use client";
import PaginationSection from "@/components/shared/PaginationSection";
import EventReportCard from "./EventReportCard";
import { useGetAllEventReportQuery } from "@/redux/api/eventReportsApi";
import { useSearchParams } from "next/navigation";

const EventReportContainer = () => {
    const page = useSearchParams().get("page")
    const pageSize = 10;

    const { data } = useGetAllEventReportQuery({ page, limit: pageSize });

    const reports = data?.data?.reports || [];
    const total = data?.data?.meta?.total || 0;

    const handleViewDetails = (id: string) => {
        console.log("View details for event:", id);
    };

    return (
        <div className="border border-[#FFFFFF33]/[0.2] rounded-2xl py-5 px-4">
            <h4 className="text-[#93A4B0] text-xl font-semibold mb-4">All Reports</h4>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {reports.map((event: any) => (
                        <EventReportCard
                            key={event?._id}
                            event={event}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
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