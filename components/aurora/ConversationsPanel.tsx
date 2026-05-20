const conversations = [
  {
    section: "Today",
    items: [
      { title: "Business Strategy Analysis", time: "2:30 PM", active: true },
      { title: "Code Review Assistance", time: "1:45 PM" },
      { title: "Market Research Summary", time: "11:20 AM" },
    ],
  },
  {
    section: "Yesterday",
    items: [
      { title: "Content Writing Help", time: "4:30 PM" },
      { title: "Data Analysis Request", time: "2:15 PM" },
      { title: "Email Draft Assistance", time: "9:45 AM" },
    ],
  },
  {
    section: "Previous 7 Days",
    items: [
      { title: "Product Launch Plan", time: "May 26" },
      { title: "Competitive Analysis", time: "May 25" },
      { title: "Customer Feedback Review", time: "May 24" },
    ],
  },
];

export default function ConversationsPanel() {
  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Conversations
      </h2>

      {/* Search */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Conversation Groups */}
      <div className="space-y-8">
        {conversations.map((group) => (
          <div key={group.section}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {group.section}
            </h3>

            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.title}
                  className={`w-full rounded-xl px-4 py-3 text-left transition-all ${
                    item.active
                      ? "bg-purple-50 text-purple-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-medium">
                      {item.title}
                    </span>

                    <span className="text-xs text-gray-400">
                      {item.time}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}