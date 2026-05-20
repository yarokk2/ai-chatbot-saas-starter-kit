interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl rounded-3xl px-6 py-4 ${
          isUser
            ? "bg-white text-black"
            : "bg-white/5 border border-white/10 text-white"
        }`}
      >
        <p className="leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}