import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AI Chatbot SaaS Starter Kit",
  description:
    "Enterprise-grade Next.js boilerplate with AI chat, Stripe billing, file uploads, and Aurora design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster
              position="top-right"
              richColors
              closeButton
              theme="system"
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}