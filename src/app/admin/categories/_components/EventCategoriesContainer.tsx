"use client";
import { Button } from 'antd'
import { Plus } from 'lucide-react'
import React from 'react'
import AllEventCategories from './AllEventCategories'
import AddEventCategory from '@/components/modal/AddEventCategory'

export default function EventCategoriesContainer() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <div></div>
                <Button onClick={() => setOpen(true)} type="primary" icon={<Plus size={18} />} className='bg-gradient-to-t from-[#E6CA6E] to-[#775806]'>Add Event Category</Button>

            </div>
            <AllEventCategories />
            <AddEventCategory open={open} setOpen={setOpen} />
        </div>
    )
}
