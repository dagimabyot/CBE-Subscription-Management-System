import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, TrendingUp, FileText, Zap } from "lucide-react";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const stats = [
    {
      title: "Pending Approvals",
      value: "12",
      icon: CheckCircle2,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Subscriptions",
      value: "456",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Recent Requests",
      value: "28",
      icon: FileText,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Team Members",
      value: "8",
      icon: Zap,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
        <p className="text-gray-600 mt-2">Oversee subscriptions and approve requests</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hasPermission("approve_requests") && (
          <Button
            onClick={() => navigate("/manager/approvals")}
            className="h-12 justify-start text-left bg-[#5D0049] hover:bg-[#4A0039]"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Review Pending Approvals
          </Button>
        )}
        {hasPermission("manage_subscriptions") && (
          <Button
            onClick={() => navigate("/manager/subscriptions")}
            variant="outline"
            className="h-12 justify-start text-left"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Manage Subscriptions
          </Button>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
