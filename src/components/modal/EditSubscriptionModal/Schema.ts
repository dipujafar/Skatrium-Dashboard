import { z } from "zod"

export const planDurationSchema = z.object({
  duration: z.string().min(1, "Duration is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
})

export const editSubscriptionSchema = z.object({
  planName: z.string().min(1, "Plan name is required").min(2, "Plan name must be at least 2 characters"),
  planDurations: z.array(planDurationSchema).min(1, "At least one plan duration is required"),
})

export type EditSubscriptionFormData = z.infer<typeof editSubscriptionSchema>
export type PlanDuration = z.infer<typeof planDurationSchema>
