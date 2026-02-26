import SettingContainer from '@/components/(adminDashboard)/(setting)/SettingContainer';
import { Tabs, TabsProps } from 'antd';
import React from 'react';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'User',
        children: <SettingContainer />,
    },
    {
        key: '2',
        label: 'Organizer',
        children: <SettingContainer />,
    },
    {
        key: '3',
        label: 'Marchent',
        children: <SettingContainer />,
    },
    {
        key: '4',
        label: 'Skate DJ',
        children: <SettingContainer />,
    },
];

const SettingsPage = () => {
    return (
        <Tabs defaultActiveKey="1" items={items} />
        // <SettingContainer></SettingContainer>
    );
};

export default SettingsPage;