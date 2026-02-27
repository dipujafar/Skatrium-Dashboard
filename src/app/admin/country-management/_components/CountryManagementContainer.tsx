"use client"
import { Input } from 'antd'
import React from 'react'
import CountryManagementTable from './CountryManagementTable'

export default function CountryManagementContainer() {
    return (
        <div className='space-y-5'>
            <Input.Search placeholder="Search Here..." size='large' className='max-w-[400px]' />
            <CountryManagementTable />
        </div>
    )
}
