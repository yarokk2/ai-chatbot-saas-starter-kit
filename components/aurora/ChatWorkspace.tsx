"use client";
import { Conversation } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notify } from "@/lib/notifications";



export default function ChatWorkspace() {

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your enterprise AI assistant. How can I help you today?",
    },
  ]);

  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  const [activeConversationId, setActiveConversationId] =
    useState<string>("");

  const [uploadedFiles, setUploadedFiles] = useState<File[]>(
    []
  );

  interface UploadedDocument {
    id: string;
    name: string;
    content: string;
    uploadedAt: number;
  }

  const [documents, setDocuments] = useState<
    UploadedDocument[]
  >([]);



  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    const savedConversations = localStorage.getItem(
      "ai-chat-conversations"
    );

    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);

      setConversations(parsed);

      if (parsed.length > 0) {
        setActiveConversationId(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    } else {
      const initialConversation: Conversation = {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [
          {
            role: "assistant",
            content:
              "Hello! I'm your enterprise AI assistant. How can I help you today?",
          },
        ],
        createdAt: Date.now(),
      };

      setConversations([initialConversation]);

      setActiveConversationId(initialConversation.id);

      setMessages(initialConversation.messages);

      localStorage.setItem(
        "ai-chat-conversations",
        JSON.stringify([initialConversation])
      );
    }
  }, []);

  useEffect(() => {
    const savedDocuments =
      localStorage.getItem("ai-documents");

    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ai-documents",
      JSON.stringify(documents)
    );
  }, [documents]);



  useEffect(() => {
    if (!activeConversationId) return;

    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversationId
        ? {
            ...conv,
            messages,
          }
        : conv
    );

    setConversations(updatedConversations);

    localStorage.setItem(
      "ai-chat-conversations",
      JSON.stringify(updatedConversations)
    );
  }, [messages]);

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    setUploadedFiles((prev) => [...prev, ...files]);
  }

  async function sendMessage() {
    const trimmed = input.trim();

    if ((!trimmed && uploadedFiles.length === 0) || isLoading)
      return;

    const userMessage = {
      role: "user",
      content:
        uploadedFiles.length > 0
          ? `${trimmed}

    Attached files:
    ${uploadedFiles
      .map((file) => `- ${file.name}`)
      .join("\n")}`
          : trimmed,
    };

    const activeConversation = conversations.find(
      (conv) => conv.id === activeConversationId
    );

    if (
      activeConversation &&
      activeConversation.title === "New Chat"
    ) {
      const generatedTitle =
        trimmed.length > 30
          ? trimmed.slice(0, 30) + "..."
          : trimmed;

      const updatedConversations = conversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              title: generatedTitle,
            }
          : conv
      );

      setConversations(updatedConversations);

      localStorage.setItem(
        "ai-chat-conversations",
        JSON.stringify(updatedConversations)
      );
    }
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setIsLoading(true);

    try {
        let documentsForChat = [...documents];

        if (uploadedFiles.length > 0) {
          const formData = new FormData();

          uploadedFiles.forEach((file) => {
            formData.append("files", file);
          });

          const uploadResponse = await fetch(
            "/api/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadResult =
            await uploadResponse.json();

          console.log(uploadResult);

          if (uploadResult.content) {
            const newDocument = {
              id: crypto.randomUUID(),
              name: uploadedFiles[0].name,
              content: uploadResult.content,
              uploadedAt: Date.now(),
            };

            documentsForChat = [
              ...documentsForChat,
              newDocument,
            ];

            setDocuments(documentsForChat);
          }
        }
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          documents: documentsForChat,
        }),
      });

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("No response stream.");
      }

      let assistantMessage = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        assistantMessage += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };

          return updated;
        });
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred.",
        },
      ]);
    } finally {
        setUploadedFiles([]);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 bg-[#f8fafc]">
    {/* Sidebar */}
    <div className="flex w-80 flex-col border-r border-gray-200 bg-white">
      {/* Sidebar Header */}
      <div className="border-b border-gray-100 p-4">
        <button
          onClick={() => {
            const newConversation: Conversation = {
              id: crypto.randomUUID(),
              title: "New Chat",
              messages: [
                {
                  role: "assistant",
                  content:
                    "Hello! I'm your enterprise AI assistant. How can I help you today?",
                },
              ],
              createdAt: Date.now(),
            };

            setConversations((prev) => [
              newConversation,
              ...prev,
            ]);

            setActiveConversationId(newConversation.id);

            setMessages(newConversation.messages);
          }}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 font-medium text-white shadow-lg transition hover:opacity-90"
        >
          + New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => {
                setActiveConversationId(conversation.id);
                setMessages(conversation.messages);
              }}
              className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                activeConversationId === conversation.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="truncate font-medium">
                {conversation.title}
              </div>

              <div
                className={`mt-1 text-xs ${
                  activeConversationId === conversation.id
                    ? "text-blue-100"
                    : "text-gray-400"
                }`}
              >
                {conversation.messages.length} messages
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col">
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
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

                  <div className="max-w-none leading-8 text-gray-700 whitespace-pre-wrap">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code(props) {
                          const { children, className } = props;

                          const match = /language-(\w+)/.exec(className || "");

                          return match ? (
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]">
                              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                                <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                  {match[1]}
                                </span>

                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      String(children).replace(/\n$/, "")
                                    );

                                    notify.success("Code copied.");
                                  }}
                                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1 text-xs text-zinc-300 transition hover:bg-white/10"
                                >
                                  <Copy size={14} />
                                  Copy
                                </button>
                              </div>

                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  padding: "1.25rem",
                                  background: "transparent",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code className="rounded bg-gray-100 px-1 py-0.5">
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </motion.div>
                    ))}

                    <div ref={messagesEndRef} />

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-3xl border border-gray-100 bg-white px-6 py-4 shadow-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:0.2s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-6">
<div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                >
                  📄 {file.name}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4">
          <label className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-xl transition hover:bg-gray-100">
            📎

            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button
            onClick={sendMessage}

            disabled={isLoading}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-xl text-white shadow-lg disabled:opacity-50"
          >
            ✈️
          </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}