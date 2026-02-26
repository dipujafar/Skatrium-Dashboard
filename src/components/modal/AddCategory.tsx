"use client";;
import { Modal } from "antd";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};


export const categoryFormSchema = z.object({
    name: z.string().min(1, "Category name is required").min(2, "Category name must be at least 2 characters"),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;



const AddCategory = ({ open, setOpen }: TPropsType) => {

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

            // Here you would typically send the data to your API
            // const formData = new FormData();
            // formData.append("name", data.name);
            // formData.append("image", data.image);
            // await fetch("/api/categories", { method: "POST", body: formData });

            alert("Category saved successfully!");
            form.reset();

        } catch (error) {
            console.error("Error saving category:", error);
        } finally {
            setOpen(false);
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
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
};

export default AddCategory;
