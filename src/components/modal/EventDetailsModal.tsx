import { Image, Modal } from "antd";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge"

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};

const eventImage = [
    "/event_image_3.png",
    "/event_image_4.png",
    "/event_image_5.png",
    "/event_image_6.png"
]

const EarningDetailsModal = ({ open, setOpen }: TPropsType) => {
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
                        <Image src="/event_image_2.png" alt="Sunset Skate Session" className="h-full w-full object-cover" />

                        {/* Content Container */}
                        <div className=" rounded-b-2xl pt-3 absolute bottom-0 left-2">
                            {/* price */}
                            <p className="bg-[#FA9416] w-fit  px-2 rounded-full font-medium mb-2">
                                $20
                            </p>
                            {/* Title */}
                            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Sunset Skate Session</h1>

                            {/* Location Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline" className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    12 Dec, 10 AM
                                </Badge>
                                <Badge variant="outline" className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Los Angeles, CA
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* About This Event */}
                    <section className="mt-3">
                        <h2 className="text-xl font-semibold text-white mb-2">About This Event</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Join us for an unforgettable night of music featuring top artists from around the world. Experience live
                            performances in an electric and amazing atmosphere.
                        </p>
                        <div className="space-y-2">
                            <p className="text-gray-300">
                                <span className="font-semibold text-white">What to bring:</span> Valid ID, comfortable shoes, and your
                                dancing spirit!
                            </p>
                            <p className="text-gray-300">
                                <span className="font-semibold text-white">Rules:</span> No outside food or drinks, no professional
                                cameras...
                            </p>
                        </div>
                    </section>

                    {/* Event Gallery */}
                    <section>
                        <h2 className="text-xl font-semibold text-white my-2">Event Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {eventImage?.map((item) => (
                               <Image src={item} alt="Sunset Skate Session" className="h-full w-full rounded-lg object-cover" />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Modal>
    );
};

export default EarningDetailsModal;
