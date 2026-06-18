"use client";
import { Modal, Spin } from "antd";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEventCategoryMutation } from "@/redux/api/eventCategoryApi";
import { toast } from "sonner";
import { getActualError } from "@/utils/handleError";
import { useRef, useState } from "react";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

export const categoryFormSchema = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(1, "Category name is required"),
  description: z.string({ message: "Description is required" }).optional(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

const AddEventCategory = ({ open, setOpen }: TPropsType) => {
  const [createEventCategory, { isLoading }] = useCreateEventCategoryMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CategoryFormData>({
    // @ts-ignore
    resolver: zodResolver(categoryFormSchema),
    mode: "onChange",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleClose = () => {
    form.reset();
    setImageFile(null);
    setImagePreview(null);
    setOpen(false);
  };

  const onSubmit = async (data: CategoryFormData) => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data?.description || "");
      formData.append("image", imageFile);

      await createEventCategory(formData).unwrap();
      toast.success("Successfully created event category");
      handleClose();
    } catch (error: any) {
      const errMessage = getActualError(error);
      toast.error(errMessage || "Failed");
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={handleClose}
      closeIcon={false}
      style={{ minWidth: "max-content", position: "relative" }}
    >
      <Form {...form}>
        {/* @ts-ignore */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            // @ts-ignore
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter category name"
                    className="text-white placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            // @ts-ignore
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter description"
                    className="text-white placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image upload */}
          <div className="space-y-2">
            <FormLabel className="text-white">Image</FormLabel>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-gray-500 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400 text-sm py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M16.5 12L12 7.5m0 0L7.5 12M12 7.5V21"
                    />
                  </svg>
                  <span>Click to upload image</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageFile && (
              <p className="text-xs text-gray-400 truncate">{imageFile.name}</p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-main-color text-white px-4 py-2 rounded-md w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : " Save"}
              {isLoading && <Spin className="ml-2 text-white" />}
            </button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddEventCategory;
