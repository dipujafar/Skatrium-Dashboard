"use client";
import { Image, message, Popconfirm, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import { ArrowDownNarrowWide, Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import Link from "next/link";

type TUser = {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  type: string;
};

const data = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index,
    name: `Jane Cooper`,
    email: `user${index}@example.com`,
    date: "6 April, 2023",
    status: "Active",
    type: index % 2 === 0 ? "User" : "Organizer",
  };
})

const RecentlyUser = () => {
  const [open, setOpen] = useState<boolean>(false);


  const confirmBlock = async (user: TUser) => {
    message.success("Blocked the user");
  };

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      //align: "center",
      render: (text) => <p>#{text + 1}</p>,
    },
    {
      title: "User",
      dataIndex: "name",
      //align: "center",
      render: (text, record) => (
        <div className='flex items-center gap-x-3'>
          <Image
            src={"/user_image.jpg"}
            alt='profile-picture'
            width={40}
            height={40}
            className='size-10 aspect-square object-cover rounded-full'
          ></Image>
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
      dataIndex: "type",
      filterIcon: <ArrowDownNarrowWide color="#fff" />,
      filters: [
        {
          text: "User",
          value: "User",
        },
        {
          text: "Organizer",
          value: "Organizer",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
      //align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      //align: "center",
      render: (text) => <p className="text-[#4BB54B]">{text}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      //align: "center",
      render: (text, record) => (
        <div className='flex items-center gap-2'>
          {
            record.type === "Organizer" ? (
              <Link
                href={`/admin/users/organizer`}
                className='cursor-pointer'
              >
                <Eye
                  size={22}
                  color='#78C0A8'
                  onClick={() => setOpen(true)}
                  className='cursor-pointer'
                />
              </Link>
            ) : <Eye
              size={22}
              color='#78C0A8'
              onClick={() => setOpen(true)}
              className='cursor-pointer'
            />
          }

          <Popconfirm
            title='Block the user'
            description={`Are you sure to block this user?`}
            onConfirm={() => confirmBlock(record)}
            okText='Yes'
            cancelText='No'
          >
            <CgUnblock
              size={22}
              color={"red"}
              className='cursor-pointer'
            />
          </Popconfirm>
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
          data={data}
          pagination={false}
        ></DataTable>
        <UserDetails open={open} setOpen={setOpen}></UserDetails>
      </div>
    </div>
  );
};

export default RecentlyUser;
