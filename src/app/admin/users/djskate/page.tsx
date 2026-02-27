"use client";
import { useState } from "react"
import { IoLogoInstagram } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import Link from "next/link"
import { Image } from "antd"

export default function DjskatePage() {
    const [formData, setFormData] = useState({
        firstName: "Jane",
        lastName: "Cooper",
        phone: "(201) 555-0136",
        email: "dustin.h@example.com",
        location: "2972 Westheimer Rd. Santa Ana, Illinois 854864",
        organisationName: "Ultra Skating",
        instagramLink: "iijSjhUwQsL6HwAdWwl/ gudoslib-%7C%",
        websiteLink: "iijSjhUwQsL6HwAdWwl/ gudoslib-%7C%",
        hasOrganisedEvents: "Yes",
        eventType: "Roller Skating",
        estimatedAttendees: "24",
        previousEventsLink: "iijSjhUwQsL6HwAdWwl/ gudoslib-%7C%",
    })

    return (
        <div>
            {/* Profile Image Section */}
            <div className="mb-8">
                <h2 className="text-white text-sm font-medium mb-3">Profile Image/Logo</h2>
                <div className="relative max-w-md size-80  bg-gray-800 overflow-hidden">
                    <Image src="/user_image.jpg" alt="Profile" className="object-cover" />
                </div>
            </div>

            {/* Personal & Organization Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">First Name</label>
                        <p className="text-gray-400 text-sm">{formData.firstName}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Last Name</label>
                        <p className="text-gray-400 text-sm">{formData.lastName}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Phone Number</label>
                        <p className="text-gray-400 text-sm">{formData.phone}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Email Address</label>
                        <p className="text-gray-400 text-sm">{formData.email}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Country</label>
                        <p className="text-gray-400 text-sm">United London</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Location</label>
                        <p className="text-gray-400 text-sm">{formData.location}</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">How did you hear about Skatrium?</label>
                        <p className="text-gray-400 text-sm">Facebook</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Shop Name</label>
                        <p className="text-gray-400 text-sm">aear get</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Shop Type</label>
                        <p className="text-gray-400 text-sm">Virtual</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Shop Link</label>
                        <p className="text-gray-400 text-sm">bjIPEjJVuObL6OihdXcNWm/global8s-%7C%</p>
                    </div>
                    <div className="flex gap-x-2">
                        <Link href={"https://instagram.com"} target="_blank" className="text-gray-400  break-all"><IoLogoInstagram size={28} /></Link>
                        <Link href={"#"} target="_blank" className="text-gray-400  break-all"><SlGlobe size={28} /></Link>
                    </div>
                </div>
            </div>

           
        </div>
    )
}
