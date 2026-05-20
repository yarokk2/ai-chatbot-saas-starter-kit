"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solo developers and indie hackers.",
    featured: false,
    features: [
      "Full source code",
      "Next.js + TypeScript",
      "AI Chat UI",
      "Authentication",
      "Stripe Billing",
      "Documentation",
    ],
  },
  {
    name: "Pro",
    price: "$99",
    description: "Best choice for serious SaaS founders.",
    featured: true,
    features: [
      "Everything in Starter",
      "File Upload",
      "RAG-ready Architecture",
      "Usage Limits",
      "Priority Updates",
      "Premium Support",
    ],
  },
  {
    name: "Extended License",
    price: "$199",
    description: "For agencies and client projects.",
    featured: false,
    features: [
      "Everything in Pro",
      "Use in client projects",
      "Commercial license",
      "Unlimited deployments",
      "Agency rights",
      "Lifetime updates",
    ],
  },
];

export default function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleCheckout(planName: string) {
    setLoadingPlan(planName);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planName,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Simple Pricing
        </h2>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Choose the license that fits your business needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.featured
                ? "relative border-white/30 bg-white/10 scale-105"
                : ""
            }
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

            <div className="text-5xl font-bold mb-4">{plan.price}</div>

            <p className="text-zinc-400 mb-8">{plan.description}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="text-zinc-300">
                  ✓ {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.featured ? "primary" : "outline"}
              size="lg"
              className="w-full"
              onClick={() => handleCheckout(plan.name)}
              disabled={loadingPlan === plan.name}
            >
              {loadingPlan === plan.name ? "Loading..." : "Buy Now"}
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}