import EventCard from '@/components/cards/EventCard'
import EmptyData from '@/components/shared/EmptyData'
import { Event } from '@/types'
import React from 'react'


export default function EventList({ data }: { data: Event[] }) {


    return (
        <div className='xl:col-span-2 border border-[#FFFFFF33]/[0.2]  rounded-2xl p-4'>
            <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='text-xl text-[#cad1d6] font-semibold'>Upcoming Event List</h4>
                <hr className='flex-1 border-[#FFFFFF33]/[0.2]' />
            </div>

            {
                data?.length === 0 && <EmptyData message='No upcoming events' />
            }

            {data?.length > 0 && <div className='space-y-5'>
                {
                    data?.map((event: Event, index: number) => (
                        <EventCard key={index} event={event} />
                    ))
                }
            </div>}

        </div>
    )
}
