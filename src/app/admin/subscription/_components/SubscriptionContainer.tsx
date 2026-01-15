"use client"
import { useState } from "react"
import { PricingTier, SubscriptionCard } from "./SubscriptionCard"

const pricingData: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    subtitle: "Free Trail",
    prices: [{ period: "30 Days" }, { period: "60 Days" }, { period: "90 Days" }, { period: "1 year" }],
    features: [],
    onEdit: () => console.log("Edit Free plan"),
  },
  {
    id: "starter",
    name: "Starter",
    subtitle: "Essential Features",
    prices: [
      { amount: 9.99, currency: "£", period: "Month" },
      { amount: 24.99, currency: "£", period: "3-month" },
      { amount: 44.99, currency: "£", period: "6-month" },
      { amount: 84.99, currency: "£", period: "Annual" },
    ],
    features: [
      { name: "Organiser profile", included: true },
      { name: "List & manage events", included: true },
      { name: "Standard event visibility (search & map)", included: true },
      { name: "Featured placement", included: false },
      { name: "Highlighted events", included: false },
      { name: "Pin events to profile", included: false },
      { name: "PRO badge", included: false },
    ],
    onEdit: () => console.log("Edit Starter plan"),
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "Maximum Visibility",
    accent: true,
    prices: [
      { amount: 19.99, currency: "£", period: "Month" },
      { amount: 49.99, currency: "£", period: "3-month" },
      { amount: 99.99, currency: "£", period: "6-month" },
      { amount: 189.99, currency: "£", period: "Annual" },
    ],
    features: [
      { name: "Organiser profile", included: true },
      { name: "List & manage events", included: true },
      { name: "Priority event visibility", included: true },
      { name: "Featured placement", included: true },
      { name: "Highlighted events", included: true },
      { name: "Pin events to profile", included: true },
      { name: "PRO badge", included: true, badge: "PRO" },
    ],
    onEdit: () => console.log("Edit Pro plan"),
  },
]

export default function SubscriptionContainer() {
  const [tiers] = useState<PricingTier[]>(pricingData)

  return (
    <div>
      <SubscriptionCard tiers={tiers} />
    </div>
  )
}
