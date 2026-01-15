import { Image, Modal } from "antd";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};


const ComplainsProfileReportModal = ({ open, setOpen }: TPropsType) => {
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

export default ComplainsProfileReportModal;
