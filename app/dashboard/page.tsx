import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";

function DashboardHomeContent() {
  const stats = [
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+18.2%",
      icon: "💰",
    },
    {
      title: "AI Messages",
      value: "24,560",
      change: "+12.4%",
      icon: "🤖",
    },
    {
      title: "Files Processed",
      value: "1,284",
      change: "+9.7%",
      icon: "📎",
    },
    {
      title: "Active Users",
      value: "842",
      change: "+23.1%",
      icon: "👥",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-500">
          Monitor your AI SaaS performance and growth metrics.
        </p>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
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

        {/* Revenue Chart Placeholder */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Revenue Analytics
          </h2>

          <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center">
              <div className="mb-4 text-6xl">📈</div>
              <div className="text-xl font-semibold text-gray-900">
                Enterprise Analytics Dashboard
              </div>
              <div className="mt-2 text-gray-500">
                Revenue charts and usage trends will appear here.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-8 xl:grid-cols-2">
          {/* Quick Actions */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Quick Actions
            </h2>

            <div className="space-y-4">
              {[
                "🚀 Start New Chat",
                "📎 Upload Documents",
                "🧠 Build Knowledge Base",
                "💳 Manage Billing",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-700"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {[
                "🤖 AI analysis completed successfully",
                "📄 5 documents uploaded",
                "💳 Payment processed",
                "🧠 Knowledge base updated",
                "📈 Revenue increased by 18%",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-gray-50 px-4 py-3 text-gray-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<DashboardHomeContent />}
      tools={<ToolsPanel />}
    />
  );
}