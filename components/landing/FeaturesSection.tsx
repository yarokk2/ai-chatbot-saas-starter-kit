import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

const features = [
  {
    icon: "🤖",
    title: "AI Chat Interface",
    description:
      "Beautiful ChatGPT-style interface with streaming responses and conversation history.",
  },
  {
    icon: "🔐",
    title: "Authentication",
    description:
      "Secure user authentication with Clerk or NextAuth integration.",
  },
  {
    icon: "💳",
    title: "Stripe Billing",
    description:
      "Recurring subscriptions, checkout flows, and customer portal.",
  },
  {
    icon: "📎",
    title: "File Upload",
    description:
      "Upload documents and images for advanced AI workflows.",
  },
  {
    icon: "🧠",
    title: "RAG Ready",
    description:
      "Architecture prepared for vector search and knowledge retrieval.",
  },
  {
    icon: "🌙",
    title: "Dark Mode",
    description:
      "Premium dark and light themes with elegant design.",
  },
];

export default function FeaturesSection() {
  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Everything You Need
        </h2>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Production-ready features to launch your AI SaaS faster.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.title}>
            <div className="text-4xl mb-4">{feature.icon}</div>

            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}