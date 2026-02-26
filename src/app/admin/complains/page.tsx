import React from 'react'
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import EventReportContainer from './_components/EventReportContainer';
import ProfileReportContainer from './_components/ProfileReportContainer';
import ProductReviewReportContainer from './_components/ProductReviewReportContainer';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Event Report',
        children: <EventReportContainer />,
    },
    {
        key: '2',
        label: 'Profile Report',
        children: <ProfileReportContainer />,
    },
    {
        key: '3',
        label: 'Product Review Report',
        children: <ProductReviewReportContainer />,
    }
];

export default function ComplainsPage() {
    return <Tabs defaultActiveKey="1" items={items} />
}
