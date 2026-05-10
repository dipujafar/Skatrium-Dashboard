import React from 'react'
import CategoriesContainer from './_components/CategoriesContainer'
import { Tabs, TabsProps } from 'antd';
import EventCategoriesContainer from './_components/EventCategoriesContainer';

export default function page() {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Product',
            children: <CategoriesContainer />,
        },
        {
            key: '2',
            label: 'Event',
            children: <EventCategoriesContainer />,
        }
    ];
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )
}
