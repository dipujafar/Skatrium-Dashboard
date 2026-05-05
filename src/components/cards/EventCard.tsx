'use client'
import React from 'react'
import { Button } from '../ui/button'
import EarningDetailsModal from '../modal/EventDetailsModal'
import { Event } from '@/types'
import { Image } from 'antd'
import moment from 'moment'


export default function EventCard({ event }: { event: Event }) {
    const [open, setOpen] = React.useState(false)
    return (
        <div>
            <div className='flex justify-between items-center border border-[#FFFFFF33]/[0.2]  rounded-2xl p-2'>
                <div className='flex gap-x-3'>
                    {event?.coverImage?.url

                        ? <Image src={event?.coverImage?.url} alt={event?.title} className='rounded !size-[60px]' />

                        : <div className='bg-[#211604] rounded !size-[60px] flex items-center justify-center'>
                        <p className='text-[#F6F6F6]  text-lg'>{event?.title?.charAt(0)}</p>
                        </div>


                    }
                    <div className='flex flex-col justify-between'>
                        <h5 className='text-[#F6F6F6] lg:text-lg  font-semibold'>{event?.title}</h5>
                        <p className='text-[#CBD5E1]'>{moment(event.date).format('MMM DD, YYYY')}</p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} size={"sm"} className='bg-[#211604] rounded-full border border-[#FFFFFF33]/[0.2]'>View Details</Button>
            </div>
            <EarningDetailsModal open={open} setOpen={setOpen} />
        </div>
    )
}
