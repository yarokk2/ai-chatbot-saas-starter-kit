"use client";

import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import { exportToCSV } from "@/lib/export";
import { notify } from "@/lib/notifications";
import { exportToPDF } from "@/lib/export-pdf";
import { getCurrentOrganizationId } from "@/lib/tenant";

function AuditLogsContent() {
  const logs = [
    {
      icon: "🔐",
      action: "User signed in",
      user: "Yaroslav Richter",
      time: "2 minutes ago",
      severity: "Info",
    },
    {
      icon: "🏢",
      action: "Organization created",
      user: "Yaroslav Richter",
      time: "15 minutes ago",
      severity: "Success",
    },
    {
      icon: "👥",
      action: "Team member invited",
      user: "Admin User",
      time: "1 hour ago",
      severity: "Info",
    },
    {
      icon: "📎",
      action: "Document uploaded",
      user: "Marketing Team",
      time: "3 hours ago",
      severity: "Success",
    },
    {
      icon: "💳",
      action: "Subscription upgraded",
      user: "Finance Department",
      time: "Yesterday",
      severity: "Important",
    },
    {
      icon: "⚙️",
      action: "Security settings updated",
      user: "System Administrator",
      time: "2 days ago",
      severity: "Warning",
    },
  ];

  const severityStyles = {
    Info: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
    Success:
      "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-300",
    Important:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300",
    Warning:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
  } as const;

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe] dark:bg-transparent">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6 dark:border-white/10 dark:bg-transparent">
        <h1 className="aurora-page-title">Audit Logs</h1>
        <p className="aurora-text mt-2">
          Track security events, user actions, and compliance activity.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 p-8">
        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Events Today", value: "248", icon: "📜" },
            { label: "Security Alerts", value: "3", icon: "🛡️" },
            { label: "Team Actions", value: "89", icon: "👥" },
            { label: "Compliance Score", value: "99.9%", icon: "✅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="aurora-card aurora-hover p-6"
            >
              <div className="mb-3 text-3xl">{stat.icon}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
              <div className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Logs Table */}
        <div className="aurora-card">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="aurora-title">Recent Events</h2>

            <div className="flex gap-3">
              {/* Export CSV */}
              <button
                onClick={() => {
                  const rows = logs.map((log) => ({
                    Action: log.action,
                    User: log.user,
                    Severity: log.severity,
                    Time: log.time,
                  }));

                  exportToCSV("audit-logs", rows);
                  notify.success("Audit logs exported successfully!");
                }}
                className="aurora-button px-5 py-2 text-sm"
              >
                Export CSV
              </button>

              {/* Export PDF */}
              <button
                onClick={async () => {
                  const rows = logs.map((log) => ({
                    Action: log.action,
                    User: log.user,
                    Severity: log.severity,
                    Time: log.time,
                  }));

                  await exportToPDF("Audit Logs Report", rows);
                }}
                className="aurora-button px-5 py-2 text-sm"
              >
                Export PDF
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {logs.map((log, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-white/5 dark:bg-white/[0.03] md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{log.icon}</div>

                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {log.action}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {log.user}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      severityStyles[log.severity]
                    }`}
                  >
                    {log.severity}
                  </span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {log.time}
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

export default function AuditLogsPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<AuditLogsContent />}
      tools={<ToolsPanel />}
    />
  );
}