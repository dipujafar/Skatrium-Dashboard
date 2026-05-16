import { Image, Modal } from "antd";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import moment from "moment";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    event: any
};


const EarningDetailsModal = ({ open, setOpen, event }: TPropsType) => {
    const [address, setAddress] = useState();



    useEffect(() => {
        const lat = event?.location?.coordinates?.[1];
        const lon = event?.location?.coordinates?.[0];

        // Guard: skip if coordinates are missing or not valid numbers
        if (!lat || !lon || isNaN(Number(lat)) || isNaN(Number(lon))) return;

        const getAddress = async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
                    { headers: { "User-Agent": "YourAppName" } },
                );
                const data = await res.json();
                setAddress(data?.display_name)
            } catch (err) {
                console.error("Reverse geocode failed:", err);
            }
        };

        getAddress();
    }, [event]);


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

                {/*  */}
                <div>
                    {/* Header Image */}
                    <div className="relative overflow-hidden rounded-t-2xl max-h-[300px]">
                        <Image src={event?.coverImage?.url || "/default_banner_image.png"} alt="event image" className="!h-full !w-full object-cover" />

                        {/* Content Container */}
                        <div className=" rounded-b-2xl pt-3 absolute bottom-0 left-2 w-fit">
                            {/* price */}
                            <p className="bg-[#FA9416] w-fit  px-2 rounded-full font-medium mb-2 ">
                                ${event?.price}
                            </p>
                            {/* Title */}
                            <h1 className="text-xl md:text-2xl font-bold text-white mb-2 w-fit">{event?.title}</h1>

                            {/* Location Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline" className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {moment(event?.date).format("DD MMM")}, {event?.time}
                                </Badge>
                                <Badge variant="outline" className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600 items-stretch">
                                    <MapPin className=" mr-2" />
                                    {address}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* About This Event */}
                    <section className="mt-3">
                        <h2 className="text-xl font-semibold text-white mb-2">About This Event</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            {event?.description}
                        </p>
                        <div className="space-y-1">
                            <h4 className="font-medium text-lg">Host</h4>

                            <div className="flex items-center gap-3 rounded-lg border border-gray-400 p-2">
                                {/* Avatar */}
                                {event?.host?.image?.url ? (
                                    <Image
                                        src={event?.host.image.url}
                                        alt={event?.host.fullName}
                                        className="!h-12 !w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase">
                                        {event?.host?.fullName
                                            ?.split(" ")
                                            ?.map((name: string) => name[0])
                                            ?.join("")
                                            ?.slice(0, 2)}
                                    </div>
                                )}

                                {/* Info */}
                                <div className="min-w-0">
                                    <p className="truncate text-lg font-medium">{event?.host?.fullName}</p>
                                    <p className="truncate text-sm text-gray-400">
                                        {event?.host?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Event Gallery */}
                    {event?.gallery?.length ? <section>
                        <h2 className="text-xl font-semibold text-white my-2">Event Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {event?.gallery?.map((item: any) => (
                                <Image src={item?.url} alt="events images" className="h-full w-full rounded-lg object-cover" />
                            ))}
                        </div>
                    </section> : ""}
                </div>
            </div>
        </Modal>
    );
};

export default EarningDetailsModal;
