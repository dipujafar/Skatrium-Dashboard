import { RiDashboardHorizontalFill, RiLogoutCircleLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import {
  AlignJustify,
  Award,
  ChartColumnIncreasing,
  CircleAlert,
  ClipboardList,
  Handshake,
  ListChecks,
  LogOut,
  Megaphone,
  Podcast,
  Star,
  Wallet,
  WalletCards,
} from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
  },
  {
    key: "users",
    icon: <GoPeople size={18} />,
    label: <Link href={"/admin/users"}>Users</Link>,
  },
  {
    key: "events",
    icon: <Megaphone size={18} />,
    label: <Link href={"/admin/events"}>Events</Link>,
  },
  {
    key: "subscription",
    icon: <Podcast size={18} />,
    label: <Link href={"/admin/subscription"}>Subscriptions</Link>,
  },
  {
    key: "complains",
    icon: <CircleAlert size={18} />,
    label: <Link href={"/admin/complains"}>Complains</Link>,
  },
  {
    key: "earning",
    icon: <Wallet size={18} />,
    label: <Link href={"/admin/earning"}>Earning</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/admin/settings"}>Settings</Link>,
  }
];
