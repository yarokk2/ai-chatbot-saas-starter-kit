import Card from "@/components/ui/Card";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon?: string;
}

export default function StatsCard({
  title,
  value,
  description,
  icon,
}: StatsCardProps) {
  return (
    <Card>
      {icon && <div className="text-3xl mb-4">{icon}</div>}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-4xl font-bold">{value}</p>

      <p className="text-zinc-400 mt-2">{description}</p>
    </Card>
  );
}