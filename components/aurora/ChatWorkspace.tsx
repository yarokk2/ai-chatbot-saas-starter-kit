"use client";

import { useState } from "react";
import { notify } from "@/lib/notifications";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWorkspace() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your enterprise AI assistant. How can I help you today?",
    },
  ]);

  async function sendMessage() {
    const trimmed = input.trim();

    if (!trimmed || loading) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    notify.success("Response generated successfully.");
    setInput("");
    setLoading(true);

    notify.info("Generating AI response...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.message ||
          "I'm sorry, but I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      notify.error("Failed to generate response.");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "An error occurred while processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-100 px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">
          New Conversation
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              {message.role === "user" ? (
                <div className="max-w-2xl rounded-3xl rounded-tr-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 text-white shadow-lg">
                  {message.content}
                </div>
              ) : (
                <div className="max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      🤖
                    </div>
                    <div className="font-semibold text-gray-900">
                      AI Assistant
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap leading-8 text-gray-700">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-3xl border border-gray-100 bg-white px-6 py-4 shadow-sm text-gray-500">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-6">
        <div className="mx-auto flex max-w-4xl items-center gap-4 rounded-3xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-xl text-white shadow-lg disabled:opacity-50"
          >
            ✈️
          </button>
        </div>
      </div>
    </div>
  );
}