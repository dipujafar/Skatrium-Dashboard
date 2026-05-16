import { useState } from "react";
import { Image, Modal } from "antd";
import { AlertCircle, User, Star } from "lucide-react";
import { Button } from "../ui/button";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    report: any;
    onRemove: () => void;
    isDeleting: boolean;
};

const ComplainsProfileReportModal = ({ open, setOpen, report, onRemove, isDeleting }: TPropsType) => {
    const reviewData = report?.review || {};
    const organizerData = reviewData?.organizer || {};
    const reviewerData = reviewData?.reviewer || {};
    const reportedBy = report?.reportedBy || {};
    const reportedImage: { url: string; _id: string } | null = reportedBy?.image || null;

    const [organizerPreviewVisible, setOrganizerPreviewVisible] = useState(false);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-[#FFBA49] text-[#FFBA49]" : "fill-muted text-muted"}`}
            />
        ));
    };

    return (
        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}
            style={{
                minWidth: "max-content",
                position: "relative",
            }}
        >
            <div className="max-w-xl">

                {/* Reported By */}
                <div className="flex items-center gap-x-2 mb-2">
                    <Image
                        src={reportedBy?.image?.url}
                        height={40}
                        width={40}
                        className="border border-main-color size-16 !rounded-full"
                        fallback={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='17' fill='%2300BFA5'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='14' font-weight='600' fill='white'>${reportedBy?.fullName?.charAt(0)}</text></svg>`}
                       
                    />
                    <div>
                        <h1 className="text-lg font-semibold">{reportedBy?.fullName}</h1>
                        <span className="text-xs">  {reportedBy?.email} </span>
                    </div>
                </div>

                <div>
                    {/* Organizer profile cover */}
                    <div className="relative overflow-hidden rounded-t-2xl h-[300px]">
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

                        {/* Overlay */}
                        <div className="rounded-b-2xl pt-3 absolute -bottom-2  w-full">
                            <h1 className="text-xl md:text-2xl font-bold text-white mb-2 flex  gap-2 bg-gray-600/50 p-1 w-full">
                                <User className="w-5 h-5 text-[#FA9416]" />
                                <div className="flex flex-col">
                                    <span>{organizerData?.fullName}</span>
                                    <span className="text-xs">  {organizerData?.email} </span>
                                </div>
                            </h1>
                        </div>
                    </div>

                    {/* Reviewer Info */}
                    <div className="mt-3 flex items-start gap-3 bg-white/5 rounded-xl p-3">
                        <Image
                            src={reviewerData?.image?.url}
                            height={40}
                            width={40}
                            className="border border-main-color !rounded-full"
                            fallback={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='17' fill='%2300BFA5'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='14' font-weight='600' fill='white'>${reviewerData?.fullName?.charAt(0)}</text></svg>`}
                           
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-medium text-white text-sm">
                                        {reviewerData?.fullName}
                                    </span>
                                    <span className="text-xs">  {reviewerData?.email} </span>
                                </div>


                                <div className="flex items-center gap-1">
                                    <div className="flex">{renderStars(reviewData?.rating)}</div>
                                    <span className="text-muted-foreground text-xs">{reviewData?.rating}/5</span>
                                </div>
                            </div>
                            <p className="text-[#CBD5E1] text-sm mt-2">{reviewData?.comment}</p>
                        </div>
                    </div>

                    {/* Reason For Report */}
                    <section className="mt-3">
                        <h2 className="text-xl font-semibold text-white mb-2">Reason For report</h2>
                        <div className="bg-[#580505] p-2 border border-red-300 flex gap-x-2 items-start rounded-xl">
                            <div className="bg-[#8B0505] p-1 rounded-md flex-shrink-0">
                                <AlertCircle size={18} />
                            </div>
                            <div className="flex-1">
                                <p>{report?.reason}</p>

                                {/* Review image thumbnail with preview */}
                                {reportedImage && (
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <Image.PreviewGroup>
                                            <Image
                                                src={reportedImage.url}
                                                width={56}
                                                height={56}
                                                className="!rounded-lg object-cover cursor-pointer"
                                                style={{ borderRadius: 8 }}
                                            />
                                        </Image.PreviewGroup>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Remove button */}
                    <Button
                        className="w-full mt-4 bg-[#FF4848] hover:bg-slate-700 disabled:opacity-50"
                        disabled={isDeleting}
                        onClick={onRemove}
                    >
                        {isDeleting ? "Removing..." : "Remove Post"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ComplainsProfileReportModal;