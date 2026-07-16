"use client";;
import { Image, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { cn } from "@/lib/utils";
import BlockUser from "@/components/shared/BlockUser";
import UserDelete from "@/components/shared/DeleteUser";
import OrganizerUserDetails from "@/components/(adminDashboard)/user/OrganizerUserDetails";
import MarchentUserDetails from "@/components/(adminDashboard)/user/MarchentUserDetails";
import DJSKATETUserDetails from "@/components/(adminDashboard)/user/DJSKATETUserDetails";
import { useGetAllUserQuery } from "@/redux/api/userApi";

type TUser = {
  _id: string;
  fullName: string;
  email: string;
  date: string;
  status: string;
  role: string;
  isActive: boolean;
  image: {
    url: string;
  };
};

const userRole = (role: string): string => {
  switch (role.toLocaleLowerCase()) {
    case "organizer":
      return `Organiser`;
    case "marchant":
      return `Merchant`;
    case "kaatedj":
      return `Skate DJ`;
    default:
      return "#";
  }
};

const RecentlyUser = ({ data }: { data: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<TUser>();
  const [openOrganizerDetails, setOpenOrganizerDetails] =
    useState<boolean>(false);
  const [openMarchentDetails, setOpenMarchentDetails] =
    useState<boolean>(false);
  const [openDjDetails, setOpenDjDetails] = useState<boolean>(false);

  const { data: usersData, isLoading } = useGetAllUserQuery({limit: 5});

  const userReDirect = (role: string, record: TUser) => {
    switch (role.toLocaleLowerCase()) {
      case "user":
        setCurrentData(record);
        setOpen(true);
        return;
      case "organizer":
        setCurrentData(record);
        setOpenOrganizerDetails(true);
        return;
      case "marchant":
        setCurrentData(record);
        setOpenMarchentDetails(true);
        return;
      case "kaatedj":
        setCurrentData(record);
        setOpenDjDetails(true);
        return;
      default:
        return;
    }
  };

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      //align: "center",
      render: (_, __, index) => <p>#{index + 1}</p>,
    },
    {
      title: "User",
      dataIndex: "fullName",
      //align: "center",
      render: (text, record) => (
        <div className="flex items-center gap-x-3">
          {record?.image?.url ? (
            <Image
              src={record?.image?.url}
              alt="profile-picture"
              width={40}
              height={40}
              className="size-10 aspect-square object-cover rounded-full"
            ></Image>
          ) : (
            <div className="size-10 aspect-square object-cover rounded-full bg-[#312912] flex items-center justify-center text-white text-sm font-semibold">
              {record.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="font-bold">{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      //align: "center",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      //align: "center",
      render: (text) => <p>{moment(text).format("LL")}</p>,
    },
    {
      title: "Type",
      dataIndex: "role",
      render: (text) => <p>{userRole(text)}</p>,
      //align: "center",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      //align: "center",
      render: (text) => (
        <p className={cn("text-[#4BB54B]", !text && "text-[#ee0808]")}>
          {text ? "Active" : "Blocked"}
        </p>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      //align: "center",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Eye
            size={22}
            color="#78C0A8"
            onClick={() => {
              userReDirect(record?.role, record);
              setCurrentData(record);
            }}
            className="cursor-pointer"
          />

          <BlockUser id={record?._id} isActive={record?.isActive} />
          <UserDelete id={record?._id} />
        </div>
      ),
    },
  ];

  return (
    <div className="border border-[#FFFFFF33]/[0.2] rounded-t-xl">
      <h4 className="text-xl font-semibold text-[#cad1d6] py-2 px-2">
        New users
      </h4>
      <div className="rounded-2xl">
        <DataTable columns={columns} data={usersData?.data}></DataTable>
        <UserDetails
          open={open}
          setOpen={setOpen}
          data={currentData}
        ></UserDetails>
        <OrganizerUserDetails
          open={openOrganizerDetails}
          setOpen={setOpenOrganizerDetails}
          data={currentData}
        ></OrganizerUserDetails>
        <MarchentUserDetails
          open={openMarchentDetails}
          setOpen={setOpenMarchentDetails}
          data={currentData}
        ></MarchentUserDetails>
        <DJSKATETUserDetails
          open={openDjDetails}
          setOpen={setOpenDjDetails}
          data={currentData}
        ></DJSKATETUserDetails>
      </div>
    </div>
  );
};

export default RecentlyUser;
