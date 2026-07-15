"use client";;
import { useDeleteUserMutation } from "@/redux/api/userApi";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function UserDelete({ id }: any) {
  const [deleteUser] = useDeleteUserMutation();

  const confirmBlock: PopconfirmProps["onConfirm"] = async () => {
    try {
      await deleteUser(id).unwrap();
      message.success("Deleted the user");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <Popconfirm
      title={"Delete the user"}
      description={"Are you sure to delete this user?"}
      onConfirm={confirmBlock}
      okText="Yes"
      cancelText="No"
      className="cursor-pointer"
    >
      <Trash2 size={22} color="#CD0335" />
    </Popconfirm>
  );
}
