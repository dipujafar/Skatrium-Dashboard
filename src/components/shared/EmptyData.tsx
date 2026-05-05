import { Empty } from 'antd'
import React from 'react'

export default function EmptyData({message}: {message: string}) {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Empty />
           { message && <p className='text-white -translate-y-5 '>{message}</p>}
        </div>
    )
}
