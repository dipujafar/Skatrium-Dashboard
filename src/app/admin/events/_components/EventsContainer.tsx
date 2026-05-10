"use client"
import EventCard from '@/components/cards/EventCard'
import PaginationSection from '@/components/shared/PaginationSection'
import { useGetAllEventDataQuery } from '@/redux/api/eventApi'
import { Event } from '@/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'


export default function EventsContainer() {
    const page = useSearchParams().get("page") || "1";
    const limit = useSearchParams().get("limit") || "18";

    const queries: Record<string, string> = {};
    if (page) queries["page"] = page;
    if (limit) queries["limit"] = limit;
    const { data } = useGetAllEventDataQuery(queries);
    console.log(data?.data?.pagination);
    return (
        <div className='xl:col-span-2 border border-[#FFFFFF33]/[0.2]  rounded-2xl p-4'>
            <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='text-xl text-[#cad1d6] font-semibold'>Event List</h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5'>
                {
                    data?.data?.events?.map((event: Event, index: number) => (
                        <EventCard key={index} event={event} />
                    ))
                }
            </div>
            <PaginationSection total={30} current={1} pageSize={10} />
        </div>
    )
}
