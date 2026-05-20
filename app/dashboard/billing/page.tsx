"use client";

import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import { notify } from "@/lib/notifications";

function BillingContent() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,920",
      icon: "💰",
      change: "+21.4%",
    },
    {
      title: "Active Subscriptions",
      value: "842",
      icon: "👥",
      change: "+13.2%",
    },
    {
      title: "MRR",
      value: "$12,450",
      icon: "📈",
      change: "+18.2%",
    },
    {
      title: "Invoices",
      value: "1,284",
      icon: "🧾",
      change: "+9.8%",
    },
  ];

  const invoices = [
    {
      id: "INV-2026-001",
      amount: "$99.00",
      status: "Paid",
      date: "May 20, 2026",
    },
    {
      id: "INV-2026-002",
      amount: "$149.00",
      status: "Paid",
      date: "May 12, 2026",
    },
    {
      id: "INV-2026-003",
      amount: "$299.00",
      status: "Paid",
      date: "April 28, 2026",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Billing & Subscription
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your plan, invoices, and payment information.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-sm font-semibold text-green-600">
                  {stat.change}
                </span>
              </div>

              <div className="text-sm font-medium text-gray-500">
                {stat.title}
              </div>

              <div className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Current Plan */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Current Plan
              </h2>
              <p className="mt-1 text-gray-500">
                Your active subscription details.
              </p>
            </div>

            <div className="rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
              Active
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white shadow-lg">
            <div className="mb-2 text-sm font-medium opacity-90">
              Enterprise Plan
            </div>

            <div className="mb-3 text-5xl font-bold">$149</div>

            <div className="text-lg opacity-90">
              Lifetime License • Premium Support
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-8 xl:grid-cols-2">
          {/* Payment Method */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Payment Method
            </h2>

            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="mb-2 text-sm text-gray-500">
                Default Card
              </div>

              <div className="text-lg font-semibold text-gray-900">
                Visa •••• 4242
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Expires 12/2028
              </div>
            </div>

            <button
              onClick={() => {
                notify.info("Redirecting to checkout...");

                setTimeout(() => {
                  notify.success("Subscription activated successfully!");
                }, 1200);
              }}
              className="mt-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg"
            >
              Update Payment Method
            </button>
          </div>

          {/* Invoice History */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Recent Invoices
            </h2>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-semibold text-gray-900">
                      {invoice.id}
                    </div>

                    <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                      {invoice.status}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    {invoice.amount} • {invoice.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<BillingContent />}
      tools={<ToolsPanel />}
    />
  );
}