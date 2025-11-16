'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { FaCheck } from "react-icons/fa"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Access to free courses",
      "Basic learning materials",
      "Community forum access",
      "Limited resources",
    ],
    cta: "Get Started",
    priceId: null,
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    features: [
      "All free features",
      "Unlimited course access",
      "Premium learning materials",
      "Downloadable resources",
      "Priority support",
      "Progress tracking",
    ],
    cta: "Start Free Trial",
    priceId: "price_pro_monthly",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    features: [
      "All Pro features",
      "Team collaboration tools",
      "Custom learning paths",
      "API access",
      "Dedicated support",
      "Advanced analytics",
      "White-label options",
    ],
    cta: "Contact Sales",
    priceId: "price_enterprise_monthly",
    popular: false,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) return

    setLoading(priceId)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-amber-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your learning journey. Upgrade or cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? "ring-2 ring-sky-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FaCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading === plan.priceId}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? "bg-gradient-to-r from-sky-500 to-amber-500 text-white hover:from-sky-600 hover:to-amber-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {loading === plan.priceId ? "Loading..." : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-gray-600"
        >
          <p>All plans include a 14-day money-back guarantee</p>
          <p className="mt-2">Need help choosing? <a href="/contact" className="text-sky-600 hover:underline">Contact us</a></p>
        </motion.div>
      </div>
    </div>
  )
}
