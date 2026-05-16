import { Image, Modal } from "antd";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import moment from "moment";
import { useState } from "react";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    event: any;
    address: string;
    onRemove: () => void;
    isDeleting: boolean;
};

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-base ${i < Math.floor(rating) ? "text-[#FFBA49]" : "text-gray-500"}`}>
            ★
        </span>
    ));
};

const ComplainsEventReportModal = ({ open, setOpen, event, address, onRemove, isDeleting }: TPropsType) => {
    const eventData = event?.event || {};
    const reportedBy = event?.reportedBy || {};
    const eventImage = eventData?.coverImage?.url;
    const reviewData = event?.review || {};
    const [eventPreviewVisible, setEventPreviewVisible] = useState(false);

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

                <div className="flex items-center gap-x-2 mb-2">
                    <Image
                        src={reportedBy?.image?.url}
                        height={40}
                        width={40}
                        className='border border-main-color size-16 !rounded-full'
                        fallback={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='17' fill='%2300BFA5'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='14' font-weight='600' fill='white'>${reportedBy?.fullName?.charAt(0)}</text></svg>`}
                        preview={false}
                    />
                    <div>
                        <h1 className="text-lg font-semibold">{reportedBy?.fullName}</h1>
                        <p className="text-xs">{reportedBy?.email}</p>
                    </div>
                </div>

                <div>
                    {/* Header Image */}
                    <div className="relative overflow-hidden rounded-t-2xl h-[300px]">
                        <img
                            src={eventImage || "/default_banner_image.png"}
                            alt="event image"
                            className="w-full h-full object-cover block cursor-pointer"
                            onClick={() => setEventPreviewVisible(true)}
                        />
                        {/* Hidden Ant Image for lightbox preview */}
                        <div className="hidden">
                            <Image
                                src={eventImage || "/default_banner_image.png"}
                                preview={{
                                    visible: eventPreviewVisible,
                                    onVisibleChange: (vis) => setEventPreviewVisible(vis),
                                }}
                            />
                        </div>

                        {/* Content Container */}
                        <div className="rounded-b-2xl pt-3 absolute bottom-0 left-2">
                            <p className="bg-[#FA9416] w-fit px-2 rounded-full font-medium mb-2">
                                ${eventData?.price}
                            </p>
                            <h1 className="text-xl md:text-2xl font-bold text-white mb-2 bg-black/50 backdrop-blur-sm w-fit px-2 rounded-md">{eventData?.title}</h1>

                            <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline" className="bg-black/50 border-zinc-600 text-white hover:bg-zinc-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {moment(eventData?.date).format("DD MMM")}, {eventData?.time}
                                </Badge>
                                <Badge variant="outline" className="bg-black/50 border-zinc-600 text-white hover:bg-zinc-600 items-start">
                                    <MapPin className="mr-2" />
                                    {address}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Review Info */}
                    <div className="mt-3 flex items-start gap-3 bg-white/5 rounded-xl p-3">
                        <Image
                            src={reviewData?.user?.image?.url}
                            height={40}
                            width={40}
                            className="border border-main-color !rounded-full"
                            fallback={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='17' fill='%2300BFA5'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='14' font-weight='600' fill='white'>${reviewData?.user?.fullName?.charAt(0)}</text></svg>`}

                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-white text-sm">{reviewData?.user?.fullName}</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex">{renderStars(reviewData?.rating)}</div>
                                    <span className="text-muted-foreground text-xs">{reviewData?.rating}/5</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">{reviewData?.user?.email}</p>
                            <p className="text-[#CBD5E1] text-sm mt-1">{reviewData?.comment}</p>
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
                                <p>{event?.reason}</p>

                                {reportedBy?.image?.url && (
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <Image.PreviewGroup>
                                            <Image
                                                key={"image"}
                                                src={reportedBy?.image?.url}
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

export default ComplainsEventReportModal;