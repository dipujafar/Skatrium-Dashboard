import EventCard from '@/components/cards/EventCard'
import PaginationSection from '@/components/shared/PaginationSection'
import React from 'react'

const eventList = [
    {
        id: '1',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '2',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '3',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '4',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '5',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '6',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '7',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '8',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '9',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '10',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '11',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '12',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '13',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '14',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '15',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '16',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '17',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    },
    {
        id: '18',
        name: 'Sunset Skate Session',
        date: '15, December',
        image: "/event_image.png"
    }
]

export default function EventsContainer() {
    return (
        <div className='xl:col-span-2 border border-[#FFFFFF33]/[0.2]  rounded-2xl p-4'>
            <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='text-xl text-[#cad1d6] font-semibold'>Event List</h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5'>
                {
                    eventList.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))
                }
            </div>
                <PaginationSection  total={30} current={1} pageSize={10} />
        </div>
    )
}
