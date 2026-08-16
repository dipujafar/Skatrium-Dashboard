"use client";
import { Image, Input, TableProps } from "antd";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import BlockUser from "@/components/shared/BlockUser";
import { cn } from "@/lib/utils";
import UserDelete from "@/components/shared/DeleteUser";

type TUser = {
  _id: number;
  fullName: string;
  email: string;
  date: string;
  status: string;
  isActive: string;
  image: {
    url: string;
  };
};

const UserTable = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "12";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  const [currentData, setCurrentData] = useState<TUser>();
  const [open, setOpen] = useState<boolean>(false);

  //  set queries
  const queries: Record<string, string> = {};
  queries.role = "USER";
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) {
    delete queries.page;
    delete queries.limit;
    queries.search = searchValue;
  }

  const { data: usersData, isLoading } = useGetAllUserQuery(queries);

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (_, __, index) => (
        <p>
          {`# ${
            Number(page) === 1
              ? index + 1
              : (Number(page) - 1) * Number(limit) + index + 1
          }`}
        </p>
      ),
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
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Eye
            size={22}
            color="#78C0A8"
            onClick={() => {
              setOpen(true);
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
      <div className="flex items-center justify-between py-2 px-2">
        <h4 className="text-xl font-semibold text-[#cad1d6]">All users</h4>
        <Input.Search
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search here"
          size="large"
          className="max-w-[300px]"
        />
      </div>
      <div className="rounded-2xl">
        <DataTable
          columns={columns}
          data={usersData?.data}
          isLoading={isLoading}
          pageSize={Number(limit)}
          total={usersData?.meta?.total}
        ></DataTable>
        <UserDetails
          open={open}
          setOpen={setOpen}
          data={currentData}
        ></UserDetails>
      </div>
    </div>
  );
};

export default UserTable;
