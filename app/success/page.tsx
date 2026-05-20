import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <Card className="max-w-3xl w-full text-center">
        {/* Success Icon */}
        <div className="text-7xl mb-6">🎉</div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Purchase Successful!
        </h1>

        {/* Description */}
        <p className="text-xl text-zinc-400 leading-relaxed mb-10">
          Thank you for purchasing the AI Chatbot SaaS Starter Kit.
          Your product is now ready to use.
        </p>

        {/* Info Box */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10 text-left">
          <h2 className="text-2xl font-semibold mb-4">
            What&apos;s Next?
          </h2>

          <ul className="space-y-3 text-zinc-300">
            <li>✓ Download the full source code</li>
            <li>✓ Follow the setup documentation</li>
            <li>✓ Configure your API keys</li>
            <li>✓ Launch your own AI SaaS</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              Open Dashboard
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}