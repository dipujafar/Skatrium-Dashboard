import React from 'react'
import UserTable from './_component/UserTable'
import { Tabs, TabsProps } from 'antd';
import OrganizerTable from './_component/OrganizerTable';
import MarchentTable from './_component/MarchentTable';
import DJSKATETable from './_component/DJSKATETable';


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
  {
    key: '3',
    label: 'Marchent',
    children: <MarchentTable />,
  },
  {
    key: '4',
    label: 'DJ SKATE',
    children: <DJSKATETable />,
  }
];

export default function page() {
  return <Tabs defaultActiveKey="1" items={items}/>
}
