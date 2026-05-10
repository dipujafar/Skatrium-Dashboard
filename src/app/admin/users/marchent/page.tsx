"use client";
import { useEffect, useState } from "react"
import { SlGlobe } from "react-icons/sl";
import Link from "next/link"
import { Image, Spin } from "antd"
import { userAvatarInitials } from "@/components/shared/userAvatarInitials";
import { getSocialLinks } from "@/components/shared/getSocialLinksFormData";
import { useGetUsersDetailsQuery } from "@/redux/api/userApi";
import { useSearchParams } from "next/navigation";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

export default function MarchentPage() {
    const id = useSearchParams().get("id");
    const { data, isLoading } = useGetUsersDetailsQuery(id, { skip: !id });
    const [address, setAddress] = useState("")

    const userData = data?.data;


 
    useEffect(() => {
        const lat = userData?.location?.coordinates?.[1];
        const lon = userData?.location?.coordinates?.[0];

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
    }, [userData?.location?.coordinates]);


    if (!isLoading) {
        <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spin /></div>
    }

    return (
        <div>
            {/* Profile Image Section */}
            <div className="mb-8">
                <h2 className="text-white text-sm font-medium mb-3">Profile Image/Logo</h2>
                {userData?.image?.url ? <Image src={userData?.image?.url} width={320} height={320} alt="Profile" className="object-cover lg:!size-[320px] size-[200px]" /> : <div className='lg:!size-[320px] size-[200px] aspect-square object-cover  bg-[#312912] flex items-center justify-center text-white text-3xl font-semibold'>
                    {userAvatarInitials(userData?.fullName)}
                </div>}
            </div>

            {/* Personal & Organization Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <label className="text-[#DCF3FF] text-lg font-medium block mb-1">Name</label>
                        <p className="text-[#DCF3FF] ">{userData?.fullName}</p>
                    </div>

                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Phone Number</label>
                        <p className="text-[#DCF3FF] ">{userData?.phoneNumber}</p>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Email Address</label>
                        <p className="text-[#DCF3FF] ">{userData?.email}</p>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Country</label>
                        <p className="text-[#DCF3FF] ">{userData?.country}</p>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Location</label>
                        <p className="text-[#DCF3FF] ">{address || "N/A"}</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                        <Link href={userData?.socialLink?.shoplink || "#"} className="flex gap-x-2"> <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Shop Name</label> {userData?.socialLink?.shoplink && <LiaExternalLinkAltSolid color="#DCF3FF" />} </Link>
                        <Link href={userData?.socialLink?.shoplink || "#"} className="text-[#DCF3FF] ">{userData?.socialLink?.shopName}</Link>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Social Media</label>
                        <div className="flex gap-2 flex-wrap">
                            {
                                getSocialLinks(userData?.socialLink)?.map((media) => <Link href={media?.link} target="_blank" className="text-[#DCF3FF]  break-all">{media?.icon}</Link>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Website Link</label>
                        <Link href={userData?.socialLink?.website || "#"} target="_blank" className="text-[#DCF3FF]  break-all"><SlGlobe size={28} /></Link>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">How did you hear about Skatrium?</label>
                        <p className="text-[#DCF3FF] ">{userData?.howDidYouHear}</p>
                    </div>
                    <div>
                        <label className="text-lg text-[#DCF3FF]  font-medium block mb-1">Role</label>
                        <p className="text-[#DCF3FF] ">{userData?.role}</p>
                    </div>
                </div>
            </div>


        </div>
    )
}
