"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navigation = [
  { name: "AI Chat", href: "/dashboard" },
  { name: "Conversations", href: "/dashboard/conversations" },
  { name: "Files", href: "/dashboard/files" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="text-2xl font-bold text-white">
          AI Chatbot
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-xl px-4 py-3 font-medium transition-all ${
                isActive
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-white/10 flex items-center justify-between">
        <span className="text-zinc-400 text-sm">Account</span>
        <UserButton />
      </div>
    </aside>
  );
}