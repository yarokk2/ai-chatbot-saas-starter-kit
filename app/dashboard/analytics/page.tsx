import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import AnalyticsChart from "@/components/aurora/AnalyticsChart";

function AnalyticsContent() {
  const metrics = [
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
      title: "Active Users",
      value: "842",
      change: "+23.1%",
      icon: "👥",
    },
    {
      title: "Conversion Rate",
      value: "8.4%",
      change: "+1.6%",
      icon: "📈",
    },
  ];

  const topInsights = [
    "🚀 Revenue increased 18.2% this month",
    "🤖 AI usage grew by 12.4%",
    "👥 User acquisition accelerated by 23.1%",
    "💳 Conversion rate reached 8.4%",
    "📄 Document processing volume continues to rise",
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics
        </h1>
        <p className="mt-2 text-gray-500">
          Monitor revenue, growth, and platform performance.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{metric.icon}</span>
                <span className="text-sm font-semibold text-green-600">
                  {metric.change}
                </span>
              </div>

              <div className="text-sm font-medium text-gray-500">
                {metric.title}
              </div>

              <div className="mt-2 text-3xl font-bold text-gray-900">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Overview */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Performance Overview
          </h2>

          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 dark:from-slate-900/40 dark:to-purple-950/30">
            <AnalyticsChart />
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Top Insights
          </h2>

          <div className="space-y-4">
            {topInsights.map((insight) => (
              <div
                key={insight}
                className="rounded-2xl bg-gray-50 px-5 py-4 text-gray-700"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<AnalyticsContent />}
      tools={<ToolsPanel />}
    />
  );
}