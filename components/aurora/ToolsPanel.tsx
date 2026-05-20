const tools = [
  {
    icon: "🔍",
    name: "Web Search",
    description: "Search the internet",
  },
  {
    icon: "💻",
    name: "Code Interpreter",
    description: "Run code & analyze data",
  },
  {
    icon: "📄",
    name: "Document Analysis",
    description: "Extract insights",
  },
  {
    icon: "🖼️",
    name: "Image Generation",
    description: "Generate images",
  },
];

const files = [
  {
    icon: "📕",
    name: "business_report.pdf",
    meta: "2.4 MB • PDF",
  },
  {
    icon: "📗",
    name: "market_data.xlsx",
    meta: "1.8 MB • Excel",
  },
];

export default function ToolsPanel() {
  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Tabs */}
      <div className="mb-8 flex items-center gap-6 border-b border-gray-100 pb-4">
        <button className="border-b-2 border-purple-500 pb-2 text-sm font-semibold text-purple-600">
          AI Tools
        </button>

        <button className="pb-2 text-sm font-medium text-gray-400">
          Files
        </button>

        <button className="pb-2 text-sm font-medium text-gray-400">
          Info
        </button>
      </div>

      {/* AI Tools */}
      <div className="mb-8">
        <div className="space-y-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="text-2xl">{tool.icon}</div>
                <div className="font-semibold text-gray-900">
                  {tool.name}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {tool.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          Recent Files
        </h3>

        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-1 flex items-center gap-3">
                <div className="text-2xl">{file.icon}</div>
                <div className="font-medium text-gray-900 truncate">
                  {file.name}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {file.meta}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-700">
          View All Files →
        </button>
      </div>
    </div>
  );
}