import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";

function AgentsContent() {
  const agents = [
    {
      name: "Sales Assistant",
      description: "Handles lead qualification and outreach.",
      icon: "💼",
      status: "Active",
    },
    {
      name: "Support Agent",
      description: "Answers customer questions automatically.",
      icon: "🎧",
      status: "Active",
    },
    {
      name: "Research Analyst",
      description: "Performs market and competitor research.",
      icon: "📊",
      status: "Training",
    },
    {
      name: "Content Writer",
      description: "Generates blog posts and marketing copy.",
      icon: "✍️",
      status: "Ready",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
        <p className="mt-2 text-gray-500">
          Create and manage specialized autonomous AI agents.
        </p>
      </div>

      <div className="p-8">
        <div className="grid gap-6 md:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-4xl">{agent.icon}</div>

              <h3 className="text-xl font-semibold text-gray-900">
                {agent.name}
              </h3>

              <p className="mt-2 leading-7 text-gray-500">
                {agent.description}
              </p>

              <div className="mt-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                {agent.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<AgentsContent />}
      tools={<ToolsPanel />}
    />
  );
}