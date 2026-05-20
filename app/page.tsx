import Link from "next/link";

const features = [
  {
    icon: "🤖",
    title: "AI Chat",
    description: "Production-ready chat interface with OpenAI integration.",
  },
  {
    icon: "📎",
    title: "File Uploads",
    description: "Upload and process documents for RAG workflows.",
  },
  {
    icon: "💳",
    title: "Stripe Billing",
    description: "Checkout, subscriptions, and payment management.",
  },
  {
    icon: "🔐",
    title: "Authentication",
    description: "Secure sign-in and user management with Clerk.",
  },
  {
    icon: "🧠",
    title: "Knowledge Base",
    description: "Embeddings, vector storage, and semantic retrieval.",
  },
  {
    icon: "📈",
    title: "Analytics",
    description: "Enterprise dashboards and business metrics.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7fb] text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-24">
        {/* Aurora Background */}
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/60 bg-white/80 px-6 py-3 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl">
            🚀 Launch your AI SaaS faster than ever
          </div>

          {/* Title */}
          <h1 className="mx-auto max-w-6xl text-5xl font-bold leading-tight md:text-7xl">
            <span className="text-gray-900">Build and Sell</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              AI Chatbot
            </span>
            <br />
            <span className="text-gray-900">SaaS Products</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-gray-600 md:text-2xl">
            Premium Next.js boilerplate with AI chat, authentication,
            Stripe billing, file uploads, and enterprise-grade architecture.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sign-in"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-purple-200 transition-transform hover:scale-105"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-gray-200 bg-white px-10 py-5 text-lg font-semibold text-gray-900 shadow-sm transition-all hover:shadow-md"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold md:text-6xl">
              Everything You Need
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              Production-ready features to launch your AI SaaS business.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 text-5xl">{feature.icon}</div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}