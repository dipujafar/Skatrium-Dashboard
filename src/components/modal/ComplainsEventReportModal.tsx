import { Image, Modal } from "antd";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};


const ComplainsEventReportModal = ({ open, setOpen }: TPropsType) => {
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
                <Image src="/user_image.jpg" className="!w-14 !h-14 object-cover rounded-full"></Image>
                <h1 className="text-lg font-semibold">Jack Robo</h1>
             </div>
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
                        <h2 className="text-xl font-semibold text-white mb-2">Reason For report</h2>
                        <div className="bg-[#580505] p-2 border border-red-300 flex gap-x-2 items-center rounded-xl">
                            <div className="bg-[#8B0505] p-1 rounded-md"><AlertCircle /></div>
                            <p>Just to let you know this might be a problem</p>
                        </div>
                    </section>
                    {/* remove button */}
                    <Button className="w-full mt-4 bg-[#FF4848] hover:bg-slate-700">Remove Post</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ComplainsEventReportModal;
