import {
  OrganizationSwitcher,
  OrganizationProfile,
} from "@clerk/nextjs";

export default function TeamsPage() {
  const stats = [
    {
      icon: "👥",
      label: "Team Members",
      value: "12",
      growth: "+3 this month",
    },
    {
      icon: "🏢",
      label: "Organizations",
      value: "4",
      growth: "Active workspaces",
    },
    {
      icon: "🔐",
      label: "Admins",
      value: "2",
      growth: "Full access",
    },
    {
      icon: "📨",
      label: "Invitations",
      value: "5",
      growth: "Pending invites",
    },
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="aurora-card">
        <h1 className="aurora-page-title">Teams & Organizations</h1>
        <p className="aurora-text mt-2">
          Manage workspaces, members, invitations, and permissions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
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
            <div className="mt-2 text-sm font-medium text-green-500">
              {stat.growth}
            </div>
          </div>
        ))}
      </div>

      {/* Workspace Switcher */}
      <div className="aurora-card">
        <h2 className="aurora-title mb-6">Current Workspace</h2>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <OrganizationSwitcher
            hidePersonal={false}
            afterCreateOrganizationUrl="/dashboard/teams"
            afterSelectOrganizationUrl="/dashboard/teams"
            afterLeaveOrganizationUrl="/dashboard/teams"
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger:
                  "w-full justify-between rounded-xl border-0 bg-transparent px-3 py-3 shadow-none text-gray-900 dark:text-white",
              },
            }}
          />
        </div>
      </div>

      {/* Organization Management */}
      <div className="aurora-card">
        <h2 className="aurora-title mb-6">Team Management</h2>

        <OrganizationProfile
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full max-w-none shadow-none border-0 bg-transparent",
            },
          }}
        />
      </div>
    </div>
  );
}