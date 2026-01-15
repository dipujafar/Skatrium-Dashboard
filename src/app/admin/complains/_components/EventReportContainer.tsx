"use client";
import PaginationSection from "@/components/shared/PaginationSection";
import { EventData } from "./ProfileReportCard";
import EventReportCard from "./EventReportCard";



const eventsData: EventData[] = [
    {
        id: "1",
        title: "Sunset Skate Session",
        image: "/event_image_2.png",
        price: 20.5,
        date: "12 Dec, 10 AM",
        location: "Los Angeles, CA",
        review: {
            userName: "Jack Robo",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
            rating: 5.0,
            comment:
                "Good event overall but the food options were limited and overpriced. The music was great though!",
        },
    },
    {
        id: "2",
        title: "Summer Music Festival",
        image: "/event_image_2.png",
        price: 75.0,
        date: "25 Jan, 6 PM",
        location: "Miami, FL",
        review: {
            userName: "Sarah Chen",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            rating: 4.5,
            comment:
                "Amazing lineup and great vibes! The venue was well organized and security was very professional.",
        },
    },
    {
        id: "3",
        title: "Holiday Ice Carnival",
        image: "/event_image_2.png",
        price: 35.0,
        date: "20 Dec, 2 PM",
        location: "New York, NY",
        review: {
            userName: "Mike Johnson",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            rating: 4.8,
            comment:
                "Perfect for families! Kids loved the decorations and the hot chocolate stand was a nice touch.",
        },
    },
    {
        id: "4",
        title: "Urban Dance Party",
        image: "/event_image_2.png",
        price: 50.0,
        date: "15 Feb, 8 PM",
        location: "San Francisco, CA",
        review: {
            userName: "Emily Davis",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            rating: 4.6,
            comment:
                "The dance floor was huge and the DJs were top-notch. The atmosphere was lively and fun.",
        },
    },
    {
        id: "5",
        title: "Summer Music Festival",
        image: "/event_image_2.png",
        price: 75.0,
        date: "25 Jan, 6 PM",
        location: "Miami, FL",
        review: {
            userName: "Sarah Chen",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            rating: 4.5,
            comment:
                "Amazing lineup and great vibes! The venue was well organized and security was very professional.",
        },
    },
    {
        id: "6",
        title: "Holiday Ice Carnival",
        image: "/event_image_2.png",
        price: 35.0,
        date: "20 Dec, 2 PM",
        location: "New York, NY",
        review: {
            userName: "Mike Johnson",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            rating: 4.8,
            comment:
                "Perfect for families! Kids loved the decorations and the hot chocolate stand was a nice touch.",
        },
    },
    {
        id: "7",
        title: "Urban Dance Party",
        image: "/event_image_2.png",
        price: 50.0,
        date: "15 Feb, 8 PM",
        location: "San Francisco, CA",
        review: {
            userName: "Emily Davis",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            rating: 4.6,
            comment:
                "The dance floor was huge and the DJs were top-notch. The atmosphere was lively and fun.",
        },
    }, {
        id: "8",
        title: "Urban Dance Party",
        image: "/event_image_2.png",
        price: 50.0,
        date: "15 Feb, 8 PM",
        location: "San Francisco, CA",
        review: {
            userName: "Emily Davis",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            rating: 4.6,
            comment:
                "The dance floor was huge and the DJs were top-notch. The atmosphere was lively and fun.",
        },
    }
];

const EventReportContainer = () => {
    const handleViewDetails = (id: string) => {
        console.log("View details for event:", id);
    };

    const handleRemove = (id: string) => {
        console.log("Remove event:", id);
    };

    return (
        <div className="border border-[#FFFFFF33]/[0.2] rounded-2xl py-5 px-4">
            <h4 className="text-[#93A4B0] text-xl font-semibold mb-4">All Reports </h4>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {eventsData.map((event) => (
                        <EventReportCard
                            key={event.id}
                            event={event}
                            onViewDetails={handleViewDetails}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            </div>
            <PaginationSection total={30} current={1} pageSize={10} />
        </div>
    );
};

export default EventReportContainer;