import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import { getCurrentOrganizationId } from "@/lib/tenant";

function ConversationsContent({
  organizationId,
}: {
  organizationId: string;
}) {
  const stats = [
    {
      title: "Total Conversations",
      value: "2,486",
      icon: "💬",
      change: "+14.8%",
    },
    {
      title: "Messages",
      value: "24,560",
      icon: "🤖",
      change: "+12.4%",
    },
    {
      title: "Exports",
      value: "184",
      icon: "📤",
      change: "+8.9%",
    },
    {
      title: "Avg. Length",
      value: "18 msgs",
      icon: "📊",
      change: "+3.2%",
    },
  ];

  const conversations = [
    {
      title: "Business Strategy Analysis",
      preview:
        "Comprehensive growth recommendations and market expansion plan.",
      messages: 42,
      date: "Today, 2:30 PM",
      tag: "Strategy",
      status: "Completed",
    },
    {
      title: "Code Review Assistance",
      preview:
        "Refactoring suggestions and performance optimization insights.",
      messages: 27,
      date: "Today, 1:45 PM",
      tag: "Development",
      status: "Active",
    },
    {
      title: "Market Research Summary",
      preview:
        "Competitive landscape analysis and customer segmentation.",
      messages: 35,
      date: "Yesterday",
      tag: "Research",
      status: "Completed",
    },
    {
      title: "Product Launch Plan",
      preview:
        "Go-to-market strategy, pricing, and distribution channels.",
      messages: 58,
      date: "May 26, 2026",
      tag: "Marketing",
      status: "Archived",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Conversations
        </h1>
        <p className="mt-2 text-gray-500">
          Search, organize, and export your AI conversation history.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Current Workspace ID: {organizationId}
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

        {/* Search and Filters */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-purple-400"
            />

            <select className="rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 outline-none">
              <option>All Tags</option>
              <option>Strategy</option>
              <option>Development</option>
              <option>Research</option>
              <option>Marketing</option>
            </select>

            <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg">
              Export All
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Saved Conversations
          </h2>

          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div
                key={conversation.title}
                className="rounded-3xl border border-gray-100 bg-gray-50 p-6 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {conversation.title}
                    </h3>

                    <p className="mt-2 leading-7 text-gray-500">
                      {conversation.preview}
                    </p>
                  </div>

                  <span className="rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                    {conversation.tag}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>{conversation.messages} messages</span>
                  <span>•</span>
                  <span>{conversation.date}</span>
                  <span>•</span>

                  <span className="rounded-full bg-green-50 px-3 py-1 font-semibold text-green-600">
                    {conversation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ConversationsPage() {
    const organizationId = await getCurrentOrganizationId();
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<ConversationsContent organizationId={organizationId} />}
      tools={<ToolsPanel />}
    />
  );
}