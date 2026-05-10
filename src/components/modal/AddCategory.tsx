"use client";;
import { Modal, Spin } from "antd";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductCategoryMutation, useDeleteProductCategoryMutation } from "@/redux/api/productCategoryApi";
import { toast } from "sonner";
import { getActualError } from "@/utils/handleError";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};


export const categoryFormSchema = z.object({
    name: z.string({ message: "Category name is required" }).min(1, "Category name is required"),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;



const AddCategory = ({ open, setOpen }: TPropsType) => {
    const [createProductCategory, { isLoading }] = useCreateProductCategoryMutation();


    const form = useForm<CategoryFormData>({
        // @ts-ignore
        resolver: zodResolver(categoryFormSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: CategoryFormData) => {
        try {
            console.log("Form data:", {
                name: data.name,
            });
            const formattedData = {
                name: data?.name
            }
            await createProductCategory(formattedData).unwrap();
            toast.success("Successfully created product category")
            form.reset();
            setOpen(false);
        } catch (error: any) {
            const errMessage = getActualError(error);
            toast.error(errMessage || "Failed")
        }
    };

    return (
        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}
            style={{
                minWidth: "max-content",
                position: "relative",
            }}
        >
            <Form {...form}>
                {/* @ts-ignore */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-main-color text-white px-4 py-2 rounded-md w-full"
                            disabled={isLoading}
                        >
                            Save {isLoading && <Spin />}
                        </button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
};

export default AddCategory;
