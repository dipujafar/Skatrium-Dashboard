import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib';
import React from 'react'
import CommissionEarningsTable from './CommissionEarningsTable';
import ProductCommissionEarnings from './ProductCommissionEarnings';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Event',
    children: <CommissionEarningsTable />,
  },
  {
    key: '2',
    label: 'Product',
    children: <ProductCommissionEarnings />,
  }
];

export default function CommissionEarnings() {
  return (
   <Tabs defaultActiveKey="1" items={items} />
  )
}
