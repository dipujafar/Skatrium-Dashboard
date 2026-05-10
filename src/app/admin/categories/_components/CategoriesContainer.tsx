"use client"
import { Button } from 'antd'
import { Plus } from 'lucide-react'
import React from 'react'
import { AllCategories } from './AllCategories'
import AddCategory from '@/components/modal/AddCategory'

export default function CategoriesContainer() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <div></div>
                <Button onClick={() => setOpen(true)} type="primary" icon={<Plus size={18}/>} className='bg-gradient-to-t from-[#E6CA6E] to-[#775806]'>Add Product Category</Button>

            </div>
            <AllCategories />
            <AddCategory open={open} setOpen={setOpen} />
        </div>
    )
}
