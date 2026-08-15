"use client";
import AboutUsEditor from "@/components/(adminDashboard)/(setting)/aboutUs/AboutUsEditor";
import MissionStatement from "@/components/(adminDashboard)/(setting)/missionStatement/MissionStatement";
import PrivacyPolicyEditor from "@/components/(adminDashboard)/(setting)/privacyPolicy/PrivacyPolicyEditor";
// import SettingContainer from "@/components/(adminDashboard)/(setting)/SettingContainer";
import TermsConditionsEditor from "@/components/(adminDashboard)/(setting)/TermsConditions/TermsConditionsEditor";
import { useGetContentDataQuery } from "@/redux/api/contentApi";
import { Spin, Tabs, TabsProps } from "antd";
import React from "react";
import FAQsContainer from "../../faqs/_components/FAQsContainer";



const SettingsPage = () => {
  //   const [role, setRole] = useState<string>("USER");

  const { data, isLoading } = useGetContentDataQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-250px)]">
        <Spin size="large" />
      </div>
    );
  }

  console.log(data?.data);

  const privacyPolicy = data?.data?.find(
    (content: any) => content?.type === "privacy_policy",
  );
  const termsConditions = data?.data?.find(
    (content: any) => content?.type === "terms_conditions",
  );
  const aboutUs = data?.data?.find(
    (content: any) => content?.type === "about_us",
  );
  const missionStatement = data?.data?.find(
    (content: any) => content?.type === "mission_statement",
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Privacy Policy",
      children: <PrivacyPolicyEditor data={privacyPolicy} />,
    },
    {
      key: "2",
      label: "Terms & Conditions",
      children: <TermsConditionsEditor data={termsConditions} />,
    },
    {
      key: "3",
      label: "About Us",
      children: <AboutUsEditor data={aboutUs} />,
    },
    {
      key: "4",
      label: "Mission Statement",
      children: <MissionStatement data={missionStatement} />,
    },
    {
      key: "5",
      label: "FAQ",
      children: <FAQsContainer />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
    // <SettingContainer></SettingContainer>
  );
};

export default SettingsPage;
