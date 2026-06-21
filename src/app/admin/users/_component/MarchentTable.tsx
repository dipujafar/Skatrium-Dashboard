"use client";
import { Image, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BlockUser from "@/components/shared/BlockUser";
import { useSearchParams } from "next/navigation";
import { useGetUsersByRoleQuery } from "@/redux/api/userApi";
import { useDebounce } from "use-debounce";

type TUser = {
  _id: number;
  fullName: string;
  email: string;
  date: string;
  status: string;
  isActive: boolean;
  image: {
    url: string;
  };
};

const MarchentTable = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "12";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) {
    delete queries.page;
    delete queries.limit;
    queries.search = searchValue;
  }
  queries.role = "MARCHANT";

  const { data: usersData, isLoading } = useGetUsersByRoleQuery(queries);

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      //align: "center",
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
              {record?.fullName?.charAt(0).toUpperCase()}
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
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/marchent?id=${record?._id}`}>
            <Eye size={22} color="#78C0A8" className="cursor-pointer" />
          </Link>
          <BlockUser id={record?._id} isActive={record?.isActive} />
        </div>
      ),
    },
  ];

  return (
    <div className="border border-[#FFFFFF33]/[0.2] rounded-t-xl">
      <div className="flex items-center justify-between py-2 px-2">
        <h4 className="text-xl font-semibold text-[#cad1d6]">All Merchant</h4>
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
          data={usersData?.data?.users}
          isLoading={isLoading}
          pageSize={Number(limit)}
          total={usersData?.data?.pagination?.total}
        ></DataTable>
      </div>
    </div>
  );
};

export default MarchentTable;
