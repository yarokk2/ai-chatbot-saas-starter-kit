import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

const faqs = [
  {
    question: "What is included in the starter kit?",
    answer:
      "You get full source code, premium landing page, AI chat UI, authentication, Stripe billing, file upload, and complete documentation.",
  },
  {
    question: "Do I get lifetime updates?",
    answer:
      "Yes. All purchases include lifetime updates and future improvements.",
  },
  {
    question: "Do I need AI experience?",
    answer:
      "No. The project is beginner-friendly and fully documented.",
  },
  {
    question: "Can I use this in commercial projects?",
    answer:
      "Yes. All licenses allow commercial usage according to the selected license terms.",
  },
  {
    question: "Is support included?",
    answer:
      "Yes. Pro and Extended licenses include premium support.",
  },
  {
    question: "Can I deploy to Vercel?",
    answer:
      "Absolutely. The project is optimized for one-click deployment to Vercel.",
  },
];

export default function FAQSection() {
  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Everything you need to know before purchasing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((faq) => (
          <Card key={faq.question}>
            <h3 className="text-xl font-semibold mb-4">
              {faq.question}
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              {faq.answer}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}