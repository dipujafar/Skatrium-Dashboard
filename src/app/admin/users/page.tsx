import React from 'react'
import UserTable from './_component/UserTable'
import { Tabs, TabsProps } from 'antd';
import OrganizerTable from './_component/OrganizerTable';


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Users',
    children: <UserTable />,
  },
  {
    key: '2',
    label: 'Organizer',
    children: <OrganizerTable />,
  },
];

export default function page() {
  return <Tabs defaultActiveKey="1" items={items}/>
}
