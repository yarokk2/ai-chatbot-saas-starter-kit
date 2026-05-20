import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default function CTASection() {
  return (
    <Section>
      <Card className="max-w-5xl mx-auto text-center bg-white/10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Launch Your AI SaaS Today
        </h2>

        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10">
          Save weeks of development time and start selling your AI product faster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg">
            Buy Now
          </Button>

          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </Card>
    </Section>
  );
}