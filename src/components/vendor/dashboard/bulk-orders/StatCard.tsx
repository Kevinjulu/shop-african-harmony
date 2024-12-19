import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  prefix?: string;
  suffix?: string;
}

export const StatCard = ({ title, value, description, prefix = "", suffix = "" }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold mt-2">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};