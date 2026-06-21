"use client";
import { useSendPushNotificationMutation } from "@/redux/api/pushNotification";
import { useState } from "react";
import { toast } from "sonner";


const USER_ROLES = [
    { label: "User", value: "USER" },
    { label: "Organiser", value: "ORGANIZER" },
    { label: "Merchant", value: "MARCHANT" },
    { label: "Skate DJ", value: "KAATEDJ" },
];

const SendNotificationForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetRole, setTargetRole] = useState("USER");

    const [sendPushNotification, { isLoading }] = useSendPushNotificationMutation();

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            await sendPushNotification({ title, description, targetRole }).unwrap();
            toast.success("Notification sent successfully");
            setTitle("");
            setDescription("");
            setTargetRole("USER");
        } catch {
            toast.error("Failed to send notification");
        }
    };

    return (
        <div className="flex flex-col gap-5">

            {/* Notification Title */}
            <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">Notification Title</label>
                <input
                    type="text"
                    placeholder="Write Notifications"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors text-sm"
                />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">Description</label>
                <textarea
                    placeholder="Write Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors text-sm resize-none"
                />
            </div>

            {/* Select User Role */}
            <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">Select User</label>
                <div className="flex flex-wrap gap-2">
                    {USER_ROLES.map((role) => (
                        <button
                            key={role.value}
                            onClick={() => setTargetRole(role.value)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                                targetRole === role.value
                                    ? "bg-[#FFBA49] text-black border-[#FFBA49]"
                                    : "bg-transparent text-white border-white/30 hover:border-white/60"
                            }`}
                        >
                            {role.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-main-color hover:bg-[#e6a83e] disabled:opacity-60 text-black font-semibold py-3 rounded-full transition-colors mt-2"
            >
                {isLoading ? "Sending..." : "Send Notification"}
            </button>
        </div>
    );
};

export default SendNotificationForm;