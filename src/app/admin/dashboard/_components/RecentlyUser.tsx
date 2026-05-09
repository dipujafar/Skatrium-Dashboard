"use client";
import { Image, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BlockUser from "@/components/shared/BlockUser";

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


const userReDirect = (role: string, id: string): string => {
  switch (role.toLocaleLowerCase()) {
    case "organizer":
      return `/admin/users/organizer?id=${id}`;
    case "marchant":
      return `/admin/users/marchent?id=${id}`;
    case "kaatedj":
      return `/admin/users/djskate?id=${id}`
    default:
      return "#"
  }

}

const RecentlyUser = ({ data }: { data: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<TUser>();

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
        <div className='flex items-center gap-x-3'>
          {record?.image?.url ? <Image
            src={record?.image?.url}
            alt='profile-picture'
            width={40}
            height={40}
            className='size-10 aspect-square object-cover rounded-full'
          ></Image> : <div className='size-10 aspect-square object-cover rounded-full bg-[#312912] flex items-center justify-center text-white text-sm font-semibold'>{record.fullName?.charAt(0).toUpperCase()}</div>}
          <p className='font-bold'>{text}</p>
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
      render: (text) => <p className="capitalize">{text !== 'KAATEDJ' ? (text as string)?.toLocaleLowerCase() : text}</p>,
      //align: "center",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      //align: "center",
      render: (text) => <p className={cn("text-[#4BB54B]", !text && 'text-[#ee0808]')}>{text ? "Active" : "Blocked"}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      //align: "center",
      render: (text, record) => (
        <div className='flex items-center gap-2'>
          {
            record.role === "USER" ?
              <Eye
                size={22}
                color='#78C0A8'
                onClick={() => { setOpen(true); setCurrentData(record) }}
                className='cursor-pointer'
              />
              : (
                <Link
                  href={`${userReDirect(record?.role, record?._id)}`}
                  className='cursor-pointer'
                >
                  <Eye
                    size={22}
                    color='#78C0A8'
                    className='cursor-pointer'
                  />
                </Link>
              )
          }

          <BlockUser id={record?._id} isActive={record?.isActive} />
        </div>
      ),
    },
  ];

  return (
    <div className="border border-[#FFFFFF33]/[0.2] rounded-t-xl">
      <h4 className="text-xl font-semibold text-[#cad1d6] py-2 px-2">New users</h4>
      <div className='rounded-2xl'>
        <DataTable
          columns={columns}
          data={data?.users}
        ></DataTable>
        <UserDetails open={open} setOpen={setOpen} data={currentData} ></UserDetails>
      </div>
    </div>
  );
};

export default RecentlyUser;
