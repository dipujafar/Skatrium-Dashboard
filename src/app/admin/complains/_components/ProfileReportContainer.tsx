"use client";
import PaginationSection from "@/components/shared/PaginationSection";
import ProfileReportCard from "./ProfileReportCard";
import { useGetAllProfileReportsQuery } from "@/redux/api/profileReportApi";
import { useSearchParams } from "next/navigation";
import EmptyData from "@/components/shared/EmptyData";
import { Spin } from "antd";

const ProfileReportContainer = () => {
    const page = useSearchParams().get("page")
    const pageSize = 12;

    const { data, isLoading } = useGetAllProfileReportsQuery({ page, limit: pageSize });

    const reports = data?.data?.reports || [];
    const total = data?.data?.pagination?.total || 0;

    if (isLoading) return <div className="flex justify-center items-center min-h-[calc(100vh-250px)]"><Spin size="large" /></div>

    return (
        <div className="border border-[#FFFFFF33]/[0.2] rounded-2xl py-5 px-4">
            <h4 className="text-[#93A4B0] text-xl font-semibold mb-4">All Profile Reports</h4>
            {total === 0 && <div>  <EmptyData message="No reports " /> </div>}
            {total > 0 && <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {reports.map((report: any) => (
                        <ProfileReportCard key={report?._id} report={report} />
                    ))}
                </div>
            </div>}
            <PaginationSection
                total={total}
                current={Number(page)}
                pageSize={pageSize}
            />
        </div>
    );
};

export default ProfileReportContainer;