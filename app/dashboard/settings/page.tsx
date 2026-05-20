"use client";

import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ToolsPanel from "@/components/aurora/ToolsPanel";
import { notify } from "@/lib/notifications";

function SettingsContent() {
  const integrations = [
    {
      name: "OpenAI API",
      status: "Connected",
      icon: "🤖",
    },
    {
      name: "Stripe Billing",
      status: "Connected",
      icon: "💳",
    },
    {
      name: "Clerk Authentication",
      status: "Connected",
      icon: "🔐",
    },
    {
      name: "Vector Database",
      status: "Ready",
      icon: "🧠",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#fafafe]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your profile, integrations, and security preferences.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 p-8">
        {/* Profile Settings */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Profile Settings
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Yaroslav Richter"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="yaroslav@example.com"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <button
            onClick={() =>
              notify.success("Settings saved successfully!")
            }
            className="mt-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg"
          >
            Save Changes
          </button>
        </div>

        {/* API Keys */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            API Keys
          </h2>

          <div className="rounded-2xl bg-gray-50 p-6">
            <div className="mb-2 text-sm text-gray-500">
              OpenAI API Key
            </div>
            <div className="font-mono text-sm text-gray-700">
              sk-••••••••••••••••••••••••
            </div>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid gap-8 xl:grid-cols-2">
          {/* Notifications */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Notifications
            </h2>

            <div className="space-y-4">
              {[
                "Email notifications",
                "Product updates",
                "Billing alerts",
                "Security warnings",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4"
                >
                  <span className="font-medium text-gray-700">
                    {item}
                  </span>
                  <input type="checkbox" defaultChecked />
                </label>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Integrations
            </h2>

            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">
                      {integration.icon}
                    </span>
                    <span className="font-medium text-gray-700">
                      {integration.name}
                    </span>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    {integration.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Security
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-2xl bg-gray-100 px-6 py-3 font-medium text-gray-700 hover:bg-gray-200">
              Change Password
            </button>

            <button className="rounded-2xl bg-gray-100 px-6 py-3 font-medium text-gray-700 hover:bg-gray-200">
              Enable 2FA
            </button>

            <button className="rounded-2xl bg-red-50 px-6 py-3 font-medium text-red-600 hover:bg-red-100">
              Sign Out All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<SettingsContent />}
      tools={<ToolsPanel />}
    />
  );
}