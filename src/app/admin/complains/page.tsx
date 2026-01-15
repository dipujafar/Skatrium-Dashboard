import React from 'react'
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import EventReportContainer from './_components/EventReportContainer';
import ProfileReportContainer from './_components/ProfileReportContainer';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Event Report',
        children: <EventReportContainer />,
    },
    {
        key: '2',
        label: 'Profile report',
        children: <ProfileReportContainer />,
    }
];

export default function ComplainsPage() {
    return <Tabs defaultActiveKey="1" items={items} />
}
