"use client";

import { useState, KeyboardEvent } from "react";
import Button from "@/components/ui/Button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({
  onSend,
  isLoading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter отправляет сообщение.
    // Shift + Enter добавляет новую строку.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl p-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={4}
            className="w-full resize-none bg-transparent text-white placeholder:text-zinc-500 outline-none"
          />

          <div className="flex justify-end mt-4">
            <Button
              variant="primary"
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? "Thinking..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}