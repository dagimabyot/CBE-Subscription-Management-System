// types/requester.ts
export interface Subscription {
  id: string;
  name: string;
  type: 'cloud' | 'analytics' | 'security' | 'storage';
  status: 'active' | 'expiring' | 'suspended' | 'cancelled';
  startDate: string;
  endDate?: string;
  plan: string;
  usage?: {
    current: number;
    limit: number;
    unit: string;
  };
}

export interface Request {
  id: string;
  requestId: string;
  type: 'new' | 'amendment' | 'upgrade' | 'downgrade' | 'cancellation';
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  title: string;
  submittedAt: string;
  processedAt?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
  subscriptionId?: string;
}

export interface DashboardMetrics {
  activeSubscriptions: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  trends: {
    activeSubscriptions: { direction: 'up' | 'down' | 'neutral'; percentage: number };
    pendingRequests: { direction: 'up' | 'down' | 'neutral'; percentage: number };
    approvedRequests: { direction: 'up' | 'down' | 'neutral'; percentage: number };
    rejectedRequests: { direction: 'up' | 'down' | 'neutral'; percentage: number };
  };
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentSubscriptions: Subscription[];
  recentRequests: Request[];
}