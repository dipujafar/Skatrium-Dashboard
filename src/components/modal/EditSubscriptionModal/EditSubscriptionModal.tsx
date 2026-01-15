import { Modal } from "antd";
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import { X, Plus } from "lucide-react"
import { EditSubscriptionFormData, editSubscriptionSchema } from "./Schema";


type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};

const initialSubscription: EditSubscriptionFormData = {
    planName: "Starter",
    planDurations: [
        { duration: "6 Month", price: "23" },
        { duration: "12 Month", price: "45" },
    ],
}



const EditSubscriptionModal = ({ open, setOpen }: TPropsType) => {

    const form = useForm<EditSubscriptionFormData>({
        resolver: zodResolver(editSubscriptionSchema),
        defaultValues: initialSubscription || {
            planName: "",
            planDurations: [{ duration: "", price: "" }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "planDurations",
    })

    const onFormSubmit = async (data: EditSubscriptionFormData) => {
        console.log(data)
    }

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
            <div className="">
                <Card className="bg-transparent border-none">
                    <h1 className="text-2xl font-bold text-white mb-6">Edit Subscription</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="planName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Plan Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Starter, Professional, Enterprise"
                                                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="space-y-3 pb-4 border-b border-neutral-700 last:border-b-0">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Duration Field */}
                                            <FormField
                                                control={form.control}
                                                name={`planDurations.${index}.duration`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white text-sm">Plan Duration</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="e.g., 6 Month, 1 Year"
                                                                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Price Field */}
                                            <FormField
                                                control={form.control}
                                                name={`planDurations.${index}.price`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white text-sm">Price</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    placeholder="0.00"
                                                                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                                                                    {...field}
                                                                />
                                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Delete Button */}
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => remove(index)}
                                            className="w-full sm:w-auto"
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                onClick={() => append({ duration: "", price: "" })}
                                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-neutral-900 font-semibold"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add New
                            </Button>

                            <Button
                                type="submit"
                                // disabled={isLoading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-neutral-900 font-semibold"
                            >
                                Save Changes
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </Modal>
    );
};

export default EditSubscriptionModal;
