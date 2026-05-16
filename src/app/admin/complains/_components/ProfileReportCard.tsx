import { Star, Images, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Image } from "antd";
import { toast } from "sonner";
import { useDeleteProfileReportMutation } from "@/redux/api/profileReportApi";
import ComplainsProfileReportModal from "@/components/modal/ComplainsProfileReportModal";

interface ProfileReportCardProps {
    report: any;
}

const ProfileReportCard = ({ report }: ProfileReportCardProps) => {
    const reviewData = report?.review || {};
    const organizerData = reviewData?.organizer || {};
    const reviewerData = reviewData?.reviewer || {};

    const [open, setOpen] = useState<boolean>(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [organizerPreviewVisible, setOrganizerPreviewVisible] = useState(false);

    // review image is a single object (not array) in this API
    const reviewImage: { url: string } | null = reviewData?.image || null;

    const [deleteProfileReport, { isLoading: isDeleting }] = useDeleteProfileReportMutation();

    const handleRemove = async () => {
        try {
            await deleteProfileReport(report?._id).unwrap();
            toast.success("Report removed successfully");
            setOpen(false);
        } catch {
            toast.error("Failed to remove report");
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                    ? "fill-[#FFBA49] text-[#FFBA49]"
                    : "fill-muted text-muted"
                    }`}
            />
        ));
    };

    return (
        <>
            <div className="bg-white/10 rounded-xl overflow-hidden w-full max-w-sm border border-white/20 shadow-xl text-white">

                {/* Organizer (profile being reviewed) cover */}
                <div className="relative w-full h-48">
                    <img
                        src={organizerData?.image?.url || "/default_banner_image.png"}
                        alt={organizerData?.fullName}
                        className="w-full h-full object-cover block cursor-pointer"
                        onClick={() => setOrganizerPreviewVisible(true)}
                    />
                    {/* Hidden Ant Image for lightbox */}
                    <div className="hidden">
                        <Image
                            src={organizerData?.image?.url}
                            preview={{
                                visible: organizerPreviewVisible,
                                onVisibleChange: (vis) => setOrganizerPreviewVisible(vis),
                            }}
                        />
                    </div>

                    {/* Organizer name badge */}
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-sm font-semibold flex gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#FA9416]" />
                        <div className="flex flex-col">
                            <span>
                                {organizerData?.fullName}
                            </span>
                            <span className="text-xs"> {reviewerData?.email} </span>
                        </div>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-3 space-y-2">

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Reviewer Section */}
                    <div className="flex items-start gap-2">
                        <Image
                            src={reviewerData?.image?.url}
                            height={42}
                            width={42}
                            className="border border-main-color size-16 !rounded-full"
                            fallback={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='17' fill='%2300BFA5'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='14' font-weight='600' fill='white'>${reviewerData?.fullName?.charAt(0)}</text></svg>`}

                        />
                        <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-medium text-white text-sm">
                                        {reviewerData?.fullName}
                                    </span>
                                    <span className="text-xs">  {reviewerData?.email} </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex">{renderStars(reviewData?.rating)}</div>
                                    <span className="text-muted-foreground text-xs">
                                        {reviewData?.rating}/5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment + Image Preview Icon */}
                    <div className="flex items-start justify-between gap-2">
                        <p className="text-[#CBD5E1] text-sm leading-relaxed flex-1">
                            {reviewData?.comment}
                        </p>

                        {reviewImage && (
                            <button
                                onClick={() => setPreviewVisible(true)}
                                className="flex-shrink-0 mt-0.5 flex items-center gap-1 text-[#CBD5E1] hover:text-white transition-colors"
                                title="View image"
                            >
                                <Images className="w-5 h-5" />
                                <span className="text-xs font-medium">1 image</span>
                            </button>
                        )}
                    </div>

                    {/* Hidden Ant Design Image for review image preview */}
                    {reviewImage && (
                        <div className="hidden">
                            <Image
                                src={reviewImage.url}
                                preview={{
                                    visible: previewVisible,
                                    onVisibleChange: (vis) => setPreviewVisible(vis),
                                }}
                            />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="outline"
                            className="flex-1 bg-[#222222] border-none"
                            onClick={() => setOpen(true)}
                        >
                            View report
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={isDeleting}
                            className="flex-1 bg-[#FF484830]/[0.2] hover:bg-[#FF484830]/[0.4] text-[#FF4848] border-none disabled:opacity-50"
                            onClick={handleRemove}
                        >
                            {isDeleting ? "Removing..." : "Remove"}
                        </Button>
                    </div>
                </div>
            </div>

            <ComplainsProfileReportModal
                open={open}
                setOpen={setOpen}
                report={report}
                onRemove={handleRemove}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default ProfileReportCard;