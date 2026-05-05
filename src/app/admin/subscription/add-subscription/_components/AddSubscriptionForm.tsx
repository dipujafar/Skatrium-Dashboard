"use client";;
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { toast } from "sonner";

// ─── Zod Schema ─────────────────────────────────────────────────────────────

const subscriptionPlanSchema = z.object({
    name: z.enum(["starter", "pro"], {
        required_error: "Plan name is required",
    }),
    role: z.enum(["ORGANIZER", "MARCHANT", "KAATEDJ"], {
        required_error: "Role is required",
    }),
    description: z
        .string({ message: "Description is required" })
        .min(1, "Description is required"),
    price: z
        .number({ message: "Price is Required" })
        .int("Price must be a whole number")
        .nonnegative("Price cannot be negative"),
    //   currency: z.string().default("usd"),
    //   interval: z.enum(["month", "year"]).default("month"),
    trialDays: z
        .number({ invalid_type_error: "Trial days must be a number" })
        .int("Trial days must be a whole number")
        .min(0, "Trial days cannot be negative")
        .max(365, "Trial days cannot exceed 365")
        .default(30),
    //   stripePriceId: z
    //     .string()
    //     .min(1, "Stripe price ID is required")
    //     .regex(/^price_/, "Must be a valid Stripe price ID (starts with price_)"),
    //   features: z.array(z.string()).default([]),
});

type SubscriptionPlanFormValues = z.output<typeof subscriptionPlanSchema>;

// ─── Component ───────────────────────────────────────────────────────────────

export default function SubscriptionPlanForm() {
    // const [featureInput, setFeatureInput] = useState("");

    const [createSubs] = useCreateSubscriptionMutation();

    const form = useForm<SubscriptionPlanFormValues>({
        resolver: zodResolver(subscriptionPlanSchema) as Resolver<SubscriptionPlanFormValues>,
        defaultValues: {
            // bio: "",
            //   currency: "usd",
            //   interval: "month",
            trialDays: 30,
            //   features: [],
        },
    });

    //   const features = form.watch("features");

    // ─── Feature tag handlers ─────────────────────────────────────────────────

    //   const addFeature = () => {
    //     const trimmed = featureInput.trim();
    //     if (!trimmed) return;
    //     const current = form.getValues("features");
    //     if (current.includes(trimmed)) {
    //       setFeatureInput("");
    //       return;
    //     }
    //     form.setValue("features", [...current, trimmed]);
    //     setFeatureInput("");
    //   };

    //   const removeFeature = (index: number) => {
    //     const current = form.getValues("features");
    //     form.setValue(
    //       "features",
    //       current.filter((_, i) => i !== index)
    //     );
    //   };

    // const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault();
    //         addFeature();
    //     }
    // };

    // ─── Submit ────────────────────────────────────────────────────────────────

    const onSubmit = async (values: SubscriptionPlanFormValues) => {
        try {
            await createSubs(values).unwrap();
            toast.error("Successfully crate subscription");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create subscription");
        }
    };

    // ─── Render ────────────────────────────────────────────────────────────────

    return (
        <div className=" text-white">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold ">
                    Subscription Plan
                </h1>
                <p className="text-sm  mt-1">
                    Configure a new plan with pricing and feature access.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* ── Basic Info ─────────────────────────────────────── */}
                    <Card className="bg-transparent text-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                Basic Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Plan name</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="py-5">
                                                        <SelectValue placeholder="Select plan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="starter">Starter</SelectItem>
                                                    <SelectItem value="pro">Pro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Role */}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="py-5">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="ORGANIZER">Organizer</SelectItem>
                                                    <SelectItem value="MARCHANT">Marchant</SelectItem>
                                                    <SelectItem value="KAATEDJ">KaateDJ</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write short description about the plan...."
                                                className="resize-none h-24"
                                                {...field}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* ── Pricing ────────────────────────────────────────── */}
                    <Card className="bg-transparent text-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                Pricing
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                                                        $
                                                    </span>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter plan price"
                                                        className="pl-7 py-5"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === ""
                                                                    ? undefined
                                                                    : Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Currency */}
                                {/* <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                          <SelectItem value="bdt">BDT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                                {/* Interval */}
                                {/* <FormField
                  control={form.control}
                  name="interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing interval</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="month">Monthly</SelectItem>
                          <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                                <FormField
                                    control={form.control}
                                    name="trialDays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration days</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="py-5"
                                                    min={0}
                                                    max={365}
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value === ""
                                                                ? undefined
                                                                : Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Trial Days */}


                                {/* Stripe Price ID */}
                                {/* <FormField
                                    control={form.control}
                                    name="stripePriceId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stripe price ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="price_1ABC123xyz..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Features ───────────────────────────────────────── */}
                    {/* <Card className="bg-transparent text-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium  uppercase tracking-wide">
                                Features
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {features.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {features.map((feature, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center gap-1.5 px-3 py-1 text-sm"
                                        >
                                            {feature}
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors !text-foreground"
                                                aria-label={`Remove ${feature}`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Input
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyDown={handleFeatureKeyDown}
                                    placeholder="Enter feature"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addFeature}
                                    className="shrink-0 !text-foreground"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Press Enter or click Add to include a feature
                            </p>
                        </CardContent>
                    </Card> */}

                    {/* ── Actions ────────────────────────────────────────── */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                            className="text-black"
                        >
                            Reset
                        </Button>
                        <Button type="submit" className="flex-1 sm:flex-none sm:px-8">
                            Create plan
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}