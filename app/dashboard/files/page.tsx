import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import UploadDropzone from "@/components/upload/UploadDropzone";
import { getCurrentOrganizationId } from "@/lib/tenant";


function FilesContent({
  organizationId,
}: {
  organizationId: string;
}) {
  const stats = [
    {
      title: "Total Files",
      value: "1,284",
      icon: "📄",
      change: "+12%",
    },
    {
      title: "Storage Used",
      value: "24.8 GB",
      icon: "💾",
      change: "+8%",
    },
    {
      title: "Embeddings",
      value: "128K",
      icon: "🧠",
      change: "+23%",
    },
    {
      title: "Processed",
      value: "99.2%",
      icon: "⚡",
      change: "+1.4%",
    },
  ];

  const recentFiles = [
    {
      name: "business_report_2026.pdf",
      type: "PDF Document",
      size: "2.4 MB",
      status: "Processed",
      icon: "📕",
    },
    {
      name: "market_analysis.xlsx",
      type: "Excel Spreadsheet",
      size: "1.8 MB",
      status: "Embedding",
      icon: "📗",
    },
    {
      name: "customer_feedback.docx",
      type: "Word Document",
      size: "940 KB",
      status: "Queued",
      icon: "📘",
    },
    {
      name: "product_screenshots.zip",
      type: "Archive",
      size: "12.6 MB",
      status: "Processed",
      icon: "🗂️",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          File Management
        </h1>
        <p className="mt-2 text-gray-500">
          Upload, process, and manage documents for AI and RAG workflows.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Current Workspace ID: {organizationId}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 p-8">
        {/* Stats */}
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

        {/* Upload Area */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Upload Documents
          </h2>

          <UploadDropzone />
        </div>

        {/* Recent Files */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Recent Files
          </h2>

          <div className="space-y-4">
            {recentFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{file.icon}</div>

                  <div>
                    <div className="font-semibold text-gray-900">
                      {file.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {file.type} • {file.size}
                    </div>
                  </div>
                </div>

                <div className="rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                  {file.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function FilesPage() {
    const organizationId = await getCurrentOrganizationId();
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<FilesContent organizationId={organizationId} />}
      tools={<ToolsPanel />}
    />
  );
}