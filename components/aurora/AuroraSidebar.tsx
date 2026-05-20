"use client";
import {
  getCurrentUserRole,
  hasPermission,
} from "@/lib/rbac";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignOutButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import ThemeToggle from "@/components/theme-toggle";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠", resource: "dashboard" },
  { name: "Conversations", href: "/dashboard/conversations", icon: "💬", resource: "conversations" },
  { name: "Agents", href: "/dashboard/agents", icon: "🤖", resource: "agents" },
  { name: "AI Tools", href: "/dashboard/chat", icon: "🧠", resource: "chat" },
  { name: "Files", href: "/dashboard/files", icon: "📎", resource: "files" },
  { name: "Knowledge Base", href: "/dashboard/knowledge-base", icon: "📚", resource: "knowledge-base" },
  { name: "Templates", href: "/dashboard/templates", icon: "📄", resource: "templates" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "📈", resource: "analytics" },
  { name: "Teams", href: "/dashboard/teams", icon: "🏢", resource: "teams" },
  { name: "Audit Logs", href: "/dashboard/audit-logs", icon: "📜", resource: "audit-logs" },
  { name: "Billing", href: "/dashboard/billing", icon: "💳", resource: "billing" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️", resource: "settings" },
];

export default function AuroraSidebar() {
  const pathname = usePathname();
  const userRole = getCurrentUserRole();

  return (
    <div className="flex h-full flex-col p-6">
      {/* Logo + Theme Toggle */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Chatbot
        </h1>

        <ThemeToggle />
      </div>

      {/* New Chat Button */}
      <Link
        href="/dashboard/chat"
        className="mb-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-purple-200"
      >
        + New Chat
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navigation
          .filter((item) =>
            hasPermission(userRole, item.resource)
          )
          .map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pro Plan Card */}
      <div className="mb-6 mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-2 text-sm font-semibold text-gray-900">
          Pro Plan
        </div>

        <div className="mb-3 text-xs text-gray-500">
          24,560 / 50,000 tokens
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </div>

      {/* Organization Switcher */}
      <div className="mb-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Workspace
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
          <OrganizationSwitcher
            hidePersonal={false}
            afterCreateOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
            afterLeaveOrganizationUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger:
                  "w-full justify-between rounded-xl border-0 bg-transparent px-2 py-2 shadow-none text-gray-900 dark:text-white",
              },
            }}
          />
        </div>
      </div>

      {/* User Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
            Y
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">
              Yaroslav
            </div>
            <div className="text-xs text-gray-500">
              Premium User
            </div>
          </div>
        </div>

        <SignOutButton>
          <button className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-red-50 hover:text-red-600">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}