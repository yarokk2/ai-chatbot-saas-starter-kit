import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import { getCurrentOrganizationId } from "@/lib/tenant";

function KnowledgeBaseContent({
  organizationId,
}: {
  organizationId: string;
}) {
  const stats = [
    {
      title: "Documents",
      value: "1,284",
      icon: "📄",
      change: "+12.8%",
    },
    {
      title: "Embeddings",
      value: "128K",
      icon: "🧠",
      change: "+24.6%",
    },
    {
      title: "Vectors",
      value: "2.4M",
      icon: "🗄️",
      change: "+18.3%",
    },
    {
      title: "Search Latency",
      value: "84 ms",
      icon: "⚡",
      change: "-9.4%",
    },
  ];

  const pipeline = [
    {
      title: "Document Upload",
      description: "PDF, DOCX, TXT, and image ingestion",
      icon: "📎",
      status: "Ready",
    },
    {
      title: "Chunking Engine",
      description: "Intelligent text segmentation",
      icon: "✂️",
      status: "Active",
    },
    {
      title: "Embedding Generation",
      description: "Vector creation for semantic search",
      icon: "🧠",
      status: "Processing",
    },
    {
      title: "Vector Storage",
      description: "High-performance similarity indexing",
      icon: "🗄️",
      status: "Ready",
    },
    {
      title: "Semantic Retrieval",
      description: "Context-aware document search",
      icon: "🔍",
      status: "Ready",
    },
    {
      title: "RAG Responses",
      description: "Grounded AI answers using your data",
      icon: "🤖",
      status: "Ready",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Knowledge Base
        </h1>
        <p className="mt-2 text-gray-500">
          Manage document embeddings, vector storage, and retrieval-augmented generation.
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

        {/* Vector Database Status */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Vector Database Status
              </h2>
              <p className="mt-1 text-gray-500">
                Semantic search infrastructure is fully operational.
              </p>
            </div>

            <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
              Ready
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white shadow-lg">
            <div className="mb-2 text-sm font-medium opacity-90">
              Enterprise RAG Pipeline
            </div>

            <div className="mb-3 text-5xl font-bold">
              99.98%
            </div>

            <div className="text-lg opacity-90">
              Availability • Low-Latency Retrieval
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            RAG Processing Pipeline
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pipeline.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl bg-gray-50 p-6"
              >
                <div className="mb-4 text-4xl">{step.icon}</div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mb-4 text-sm leading-6 text-gray-500">
                  {step.description}
                </p>

                <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function KnowledgeBasePage() {
    const organizationId = await getCurrentOrganizationId();
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={
        <KnowledgeBaseContent
          organizationId={organizationId}
        />
      }
      tools={<ToolsPanel />}
    />
  );
}