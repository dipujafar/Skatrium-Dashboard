"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import DownloadFile from "./_components/DownloadFile"
import { IoLogoInstagram } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import Link from "next/link"
import { Image } from "antd"

export default function OrganizerPage() {
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

    const handleCancel = () => {
        alert("Form cancelled")
    }

    const handleApprove = () => {
        alert("Form approved!")
    }

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
                        <label className="text-white text-sm font-medium block mb-1">Location</label>
                        <p className="text-gray-400 text-sm">{formData.location}</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Organisation Name</label>
                        <p className="text-gray-400 text-sm">{formData.organisationName}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Instagram Link</label>
                       <Link href={formData.instagramLink} target="_blank"  className="text-gray-400  break-all"><IoLogoInstagram size={28} /></Link>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">Website Link</label>
                        <Link href={formData.websiteLink} target="_blank"  className="text-gray-400  break-all"><SlGlobe size={28} /></Link>
                    </div>
                </div>
            </div>

            {/* Experience & Event Information */}
            <div className="mb-8">
                <h3 className="text-white text-lg font-semibold mb-6">Experience & Event Information</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-white text-sm font-medium block mb-2">
                            Have you organised skating events before?*
                        </label>
                        <p className="text-gray-400 text-sm">{formData.hasOrganisedEvents}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-2">
                            What type of events are you planning to list?*
                        </label>
                        <p className="text-gray-400 text-sm">{formData.eventType}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-2">
                            Estimated number of attendees at your typical events*
                        </label>
                        <p className="text-gray-400 text-sm">{formData.estimatedAttendees}</p>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-2">
                            Links to previous events or social media
                        </label>
                      <Link href={formData.previousEventsLink} className="text-gray-400  break-all"><FaLink size={34} /></Link>
                    </div>
                </div>
            </div>

            {/* Legal & Safety Information */}
            <div className="mb-4">
                <h3 className="text-white text-lg font-semibold mb-6">Legal & Safety Information</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-white text-sm font-medium block mb-2">
                            Do you have public liability insurance for your events?*
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Confirm</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-white text-sm font-medium block mb-1">
                            Do you have a code of conduct or safety policy for your events?
                        </label>
                        <div>
                            <DownloadFile />
                        </div>
                    </div>

                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
                <Button
                    onClick={handleCancel}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full py-3"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full py-3"
                >
                    Approve
                </Button>
            </div>
        </div>
    )
}
