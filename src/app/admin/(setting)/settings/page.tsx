"use client";
import SettingContainer from '@/components/(adminDashboard)/(setting)/SettingContainer';
import { useGetContentDataQuery } from '@/redux/api/contentApi';
import { Spin, Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';

const userRoles = {
    '1': 'USER',
    '2': 'ORGANIZER',
    '3': 'MARCHANT',
    '4': 'KAATEDJ'
}


const SettingsPage = () => {
    const [role, setRole] = useState<string>("USER");
    const { data, isLoading } = useGetContentDataQuery({ role });


    const onChange = (key: string) => {
        setRole(userRoles[(key) as keyof typeof userRoles]);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[calc(100vh-250px)]"><Spin size="large" /></div>
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'User',
            children: <SettingContainer data={data?.data} role={role} />,
        },
        {
            key: '2',
            label: 'Organizer',
            children: <SettingContainer data={data?.data}  role={role}/>,
        },
        {
            key: '3',
            label: 'Marchent',
            children: <SettingContainer data={data?.data} role={role} />,
        },
        {
            key: '4',
            label: 'Skate DJ',
            children: <SettingContainer data={data?.data} role={role} />,
        },
        {
            key: '5',
            label: 'Admin',
            children: <SettingContainer data={data?.data} role={role} />,
        }
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        // <SettingContainer></SettingContainer>
    );
};

export default SettingsPage;