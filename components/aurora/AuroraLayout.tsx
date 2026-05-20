interface AuroraLayoutProps {
  sidebar: React.ReactNode;
  conversations: React.ReactNode;
  main: React.ReactNode;
  tools: React.ReactNode;
}

export default function AuroraLayout({
  sidebar,
  conversations,
  main,
  tools,
}: AuroraLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f7f7fb] p-4 md:p-6 dark:bg-transparent">
      <div
        className="
          h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)]
          overflow-hidden
          rounded-[24px] md:rounded-[32px]
          border border-black/5
          bg-white
          shadow-2xl
          dark:border-white/10
          dark:bg-white/5
          dark:backdrop-blur-2xl
          dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        "
      >
        <div
          className="
            grid h-full min-h-0
            grid-cols-[240px_1fr]
            lg:grid-cols-[240px_320px_1fr]
            xl:grid-cols-[240px_320px_1fr_320px]
          "
        >
          {/* Sidebar */}
          <aside className="min-h-0 border-r border-black/5 bg-white dark:border-white/10 dark:bg-white/5">
            {sidebar}
          </aside>

          {/* Conversations */}
          <section className="hidden min-h-0 border-r border-black/5 bg-[#fcfcfe] dark:border-white/10 dark:bg-white/[0.03] lg:block">
            {conversations}
          </section>

          {/* Main Workspace */}
          <section className="min-h-0 bg-white dark:bg-transparent">
            {main}
          </section>

          {/* Tools */}
          <aside className="hidden min-h-0 border-l border-black/5 bg-[#fcfcfe] dark:border-white/10 dark:bg-white/[0.03] xl:block">
            {tools}
          </aside>
        </div>
      </div>
    </main>
  );
}