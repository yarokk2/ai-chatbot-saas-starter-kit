interface DashboardHeaderProps {
  userName?: string | null;
}

export default function DashboardHeader({
  userName,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
      {/* Left Side */}
      <div>
        <h1 className="text-5xl font-bold mb-3">
          Welcome back, {userName || "User"} 👋
        </h1>

        <p className="text-zinc-400 text-lg">
          Manage your AI chats, files, and billing.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="w-64 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
        />

        {/* Plan Badge */}
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium">
          💎 Pro Plan
        </div>

        {/* Notifications */}
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors">
          🔔
        </button>
      </div>
    </div>
  );
}