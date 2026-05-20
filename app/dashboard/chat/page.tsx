import AuroraLayout from "@/components/aurora/AuroraLayout";
import AuroraSidebar from "@/components/aurora/AuroraSidebar";
import ConversationsPanel from "@/components/aurora/ConversationsPanel";
import ChatWorkspace from "@/components/aurora/ChatWorkspace";
import ToolsPanel from "@/components/aurora/ToolsPanel";

export default function ChatPage() {
  return (
    <AuroraLayout
      sidebar={<AuroraSidebar />}
      conversations={<ConversationsPanel />}
      main={<ChatWorkspace />}
      tools={<ToolsPanel />}
    />
  );
}