"use client";
import ChangePasswordModal from "@/components/(adminDashboard)/(setting)/changePassword/ChangePasswordModal";
import PersonalInformationContainer from "@/components/(adminDashboard)/(setting)/PersonalInformation/PersonalInformationContainer";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib";
import React from "react";



const PersonalInformationPage = () => {
  const [open, setOpen] = React.useState(false);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: <PersonalInformationContainer />,
    },
    {
      key: '2',
      label: <p onClick={() => setOpen(true)} > Change Password </p>,
      children: <ChangePasswordModal open={open} setOpen={setOpen} />,
    }
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
      {/* <PersonalInformationContainer></PersonalInformationContainer> */}
    </>
  );
};

export default PersonalInformationPage;
