"use client";
import { Error_Modal } from "@/lib/utils";
import { useUpdateSettingsMutation } from "@/redux/api/contentApi";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// @ts-ignore
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AboutUsEditor = ({ data }: any) => {

  const [value, setValue] = useState(
    data?.content || ""
  );
  const [updateSetting, { isLoading }] = useUpdateSettingsMutation();

  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };


  const handleUpdateSettings = async () => {
    try {
      await updateSetting({
        type: "about_us",
        content: value,
      }).unwrap();

      toast.success(`About us updated successfully`);
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  useEffect(() => {
    setValue(data?.content);
  }, [data?.content]);


  return (
    <>
      <div className="flex items-center gap-2">
        <h4 className="text-2xl font-medium text-text-color">About Us</h4>
      </div>
      <ReactQuill
        modules={moduleConest}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing ......"
        style={{
          border: "1px solid #EFE8FD",
          marginTop: "20px",
          borderRadius: "10px",
          background: "#68c0a114",
        }}
      />
      <Button
        size='large'
        block
        className='bg-[#fcb806] hover:!bg-[#fcb806]/90 text-white hover:!text-white border-none disabled:bg-[#fcb806]/50 disabled:text-white'
        style={{
          marginTop: "20px",
        }}
        onClick={handleUpdateSettings}
        disabled={!value || isLoading || value === data?.content}
      >
        Save Changes {isLoading && "..." }
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(AboutUsEditor), { ssr: false });
