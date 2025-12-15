// components/dashboard/MetricCards/MetricCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  trend: {
    direction: 'up' | 'down' | 'neutral';
    percentage: number;
  };
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon,
  color,
  isLoading = false,
}) => {
  const TrendIcon = trend.direction === 'up' ? TrendingUp : 
                   trend.direction === 'down' ? TrendingDown : Minus;

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={cn("text-2xl font-bold mt-1", color)}>{value}</p>
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
        <div className={cn(
          "flex items-center mt-2 text-sm",
          trend.direction === 'up' ? 'text-green-600' :
          trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
        )}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span>{trend.percentage}% vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};