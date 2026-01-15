"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import EditSubscriptionModal from "@/components/modal/EditSubscriptionModal/EditSubscriptionModal"

export interface PricingTier {
  id: string
  name: string
  subtitle?: string
  accent?: boolean
  prices: Array<{
    amount?: number
    currency?: string
    period: string
    label?: string
  }>
  features: Array<{
    name: string
    included: boolean
    badge?: string
  }>
  onEdit: () => void
}

interface PricingTiersProps {
  tiers: PricingTier[]
}

export function SubscriptionCard({ tiers }: PricingTiersProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3  p-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`border rounded-2xl p-6 flex flex-col justify-between transition-all ${tier.accent ? "border-slate-700 bg-slate-900" : "border-slate-700 bg-slate-950"
              }`}
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-white mb-1">{tier.name}</h3>
              {tier.subtitle && <p className="text-sm text-amber-600 mb-4">{tier.subtitle}</p>}

              {/* Prices with Radio Buttons */}
              <div className="space-y-3 mt-4">
                {tier.prices.map((price, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex items-baseline gap-2">
                      {price.amount !== undefined ? (
                        <>
                          <span className="text-white font-bold">
                            {price.currency}
                            {price.amount.toFixed(2)}
                          </span>
                          <span className="text-slate-400 text-sm">/{price.period}</span>
                        </>
                      ) : (
                        <span className="text-white font-bold">{price.period}</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6 flex-1">
              <ul className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 text-sm ${feature.included ? "text-slate-200" : "text-slate-500"}`}
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />
                    ) : (
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="flex items-center gap-2">
                      {feature.name}
                      {feature.badge && <span className="text-xs font-bold text-amber-500 ml-1">{feature.badge}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setOpen(true)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-2 font-medium"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <EditSubscriptionModal open={open} setOpen={setOpen} />
    </>
  )
}
