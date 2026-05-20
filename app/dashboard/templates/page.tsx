import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";

function TemplatesContent() {
  const templates = [
    {
      name: "Blog Post Generator",
      description: "Create SEO-optimized blog articles.",
      icon: "📝",
      category: "Content",
    },
    {
      name: "Sales Email Writer",
      description: "Generate persuasive outreach emails.",
      icon: "📧",
      category: "Sales",
    },
    {
      name: "Business Plan Builder",
      description: "Draft complete startup business plans.",
      icon: "📊",
      category: "Strategy",
    },
    {
      name: "Social Media Posts",
      description: "Generate engaging social content.",
      icon: "📱",
      category: "Marketing",
    },
    {
      name: "Code Review Prompt",
      description: "Analyze and improve source code.",
      icon: "💻",
      category: "Development",
    },
    {
      name: "Market Research Template",
      description: "Summarize competitors and opportunities.",
      icon: "🔍",
      category: "Research",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Templates
        </h1>
        <p className="mt-2 text-gray-500">
          Reusable prompt templates for common business tasks.
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.name}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 text-4xl">{template.icon}</div>

              <h3 className="text-xl font-semibold text-gray-900">
                {template.name}
              </h3>

              <p className="mt-2 leading-7 text-gray-500">
                {template.description}
              </p>

              <div className="mt-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                {template.category}
              </div>

              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 font-semibold text-white shadow-lg">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<TemplatesContent />}
      tools={<ToolsPanel />}
    />
  );
}