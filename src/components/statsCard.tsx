// components/StatsCard.tsx
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card"; // Your existing ShadCN Card

type CardVariant = "default" | "blue" | "green" | "orange" | "red" | "purple";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: CardVariant;
}

const variantStyles = {
  default: {
    icon: "bg-gray-100 text-gray-600",
    text: "text-gray-600",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    text: "text-blue-600",
  },
  green: {
    icon: "bg-green-100 text-green-600",
    text: "text-green-600",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    text: "text-orange-600",
  },
  red: {
    icon: "bg-red-100 text-red-600",
    text: "text-red-600",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    text: "text-purple-600",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  variant = "default",
}: StatsCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${variantStyles[variant].icon}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p
            className={`text-2xl font-semibold ${variantStyles[variant].text}`}
          >
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

