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
    label: 'Organiser',
    children: <OrganizerTable />,
  },
  {
    key: '3',
    label: 'Merchant',
    children: <MarchentTable />,
  },
  {
    key: '4',
    label: 'Skate DJ',
    children: <DJSKATETable />,
  }
];

export default function page() {
  return <Tabs defaultActiveKey="1" items={items}/>
}
