// "use client";
// import { Tabs, TabsProps } from "antd";
// import PrivacyPolicyEditor from "./privacyPolicy/PrivacyPolicyEditor";
// import TermsConditionsEditor from "./TermsConditions/TermsConditionsEditor";
// import AboutUsEditor from "./aboutUs/AboutUsEditor";
// import MissionStatement from "./missionStatement/MissionStatement";
// import FAQsContainer from "@/app/admin/faqs/_components/FAQsContainer";

// const SettingContainer = ({  data, role }: { data: any, role: string }) => {

//   const privacyPolicy = data?.find((content: any) => content?.type === "privacy_policy");
//   const termsConditions = data?.find((content: any) => content?.type === "terms_conditions");
//   const aboutUs = data?.find((content: any) => content?.type === "about_us"); 
//   const missionStatement = data?.find((content: any) => content?.type === "mission_statement");
 
//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: 'Privacy Policy',
//       children: <PrivacyPolicyEditor data={privacyPolicy} role={role} />,
//     },
//     {
//       key: '2',
//       label: 'Terms & Conditions',
//       children: <TermsConditionsEditor data={termsConditions} role={role} />,
//     },
//     {
//       key: '3',
//       label: 'About Us',
//       children: <AboutUsEditor data={aboutUs} role={role} />,
//     },
//     {
//       key: '4',
//       label: 'Mission Statement',
//       children: <MissionStatement data={missionStatement} role={role} />,
//     },
//     {
//       key: '5',
//       label: 'FAQ',
//       children: <FAQsContainer />,
//     }
//   ];

//   return (
//     <div className="mt-2">
//       <Tabs defaultActiveKey="1" items={items}  />
//     </div>
//   );
// };

// export default SettingContainer;
