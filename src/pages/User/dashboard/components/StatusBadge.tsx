// components/shared/StatusBadge.tsx
import { Badge } from '@/components/ui/badge';
import { STATUS_COLORS } from '@/constants/requester';

interface StatusBadgeProps {
  status: keyof typeof STATUS_COLORS;
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const colors = STATUS_COLORS[status];
  
  return (
    <Badge 
      variant="outline" 
      className={`${colors.bg} ${colors.text} ${colors.border} font-medium`}
    >
      {label}
    </Badge>
  );
};