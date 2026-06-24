import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import { BellDot, CircleAlert, Mail, Megaphone, SquareStack } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPatchQuestion } from "react-icons/bs";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
  },
  {
    key: "users",
    icon: <GoPeople size={18} />,
    label: <Link href={"/admin/users"}>Profiles</Link>,
  },
  {
    key: "subscribe-email",
    icon: <Mail size={18} />,
    label: <Link href={"/admin/subscribe-email"}>Subscribe Email</Link>,
  },
  {
    key: "complains",
    icon: <CircleAlert size={18} />,
    label: <Link href={"/admin/complains"}>Reviews</Link>,
  },
  {
    key: "events",
    icon: <Megaphone size={18} />,
    label: <Link href={"/admin/events"}>Events</Link>,
  },
  // {
  //   key: "country_management",
  //   icon: <Globe size={18} />,
  //   label: <Link href={"/admin/country-management"}>Country Management</Link>,
  // },
  {
    key: "product_categories",
    icon: <SquareStack size={18} />,
    label: <Link href={"/admin/categories"}>Categories</Link>,
  },
  // {
  //   key: "subscription",
  //   icon: <Podcast size={18} />,
  //   label: <Link href={"/admin/subscription"}>Subscriptions</Link>,
  // },

  // {
  //   key: "earning",
  //   icon: <Wallet size={18} />,
  //   label: <Link href={"/admin/earning"}>Earning</Link>,
  // },
  {
    key: "push-notification",
    icon: <BellDot size={18} />,
    label: <Link href={"/admin/push-notification"}>Push Notification</Link>,
  },
  // {
  //   key: "faq",
  //   icon: <BsPatchQuestion size={18} />,
  //   label: <Link href={"/admin/faqs"}>FAQs</Link>,
  // },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/admin/settings"}>Settings</Link>,
  }
];
