import Link from "next/link";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function HeroSection() {
  return (
    <Section className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 mb-8">
          🚀 Launch your AI SaaS faster than ever
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Build and Sell{" "}
          <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            AI Chatbot SaaS
          </span>{" "}
          Products
        </h1>

        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Premium Next.js boilerplate with AI chat, authentication, Stripe
          billing, file uploads, and production-ready architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-in">
            <Button variant="primary" size="lg">
              Sign In
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Open Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}