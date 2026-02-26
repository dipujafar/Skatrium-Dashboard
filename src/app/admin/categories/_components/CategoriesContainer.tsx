"use client"
import { Button, Input } from 'antd'
import { Plus } from 'lucide-react'
import React from 'react'
import { AllCategories } from './AllCategories'
import AddCategory from '@/components/modal/AddCategory'

export default function CategoriesContainer() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <Input.Search placeholder="Search Category" size='large' className='max-w-[400px]' />

                <Button onClick={() => setOpen(true)} type="primary" size='large' icon={<Plus />} className='bg-gradient-to-t from-[#E6CA6E] to-[#775806]'>Add Category</Button>

            </div>
            <AllCategories />
            <AddCategory open={open} setOpen={setOpen} />
        </div>
    )
}
