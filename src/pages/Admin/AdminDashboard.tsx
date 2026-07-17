import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, TrendingUp, Zap } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Subscriptions",
      value: "1,892",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      icon: Zap,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Pending Approvals",
      value: "23",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your subscription system and users</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasPermission("manage_users") && (
          <Button
            onClick={() => navigate("/admin/users")}
            variant="outline"
            className="h-12 justify-start text-left"
          >
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </Button>
        )}
        {hasPermission("manage_subscriptions") && (
          <Button
            onClick={() => navigate("/admin/subscriptions")}
            variant="outline"
            className="h-12 justify-start text-left"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Manage Subscriptions
          </Button>
        )}
        {hasPermission("view_analytics") && (
          <Button
            onClick={() => navigate("/admin/analytics")}
            variant="outline"
            className="h-12 justify-start text-left"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        )}
        {hasPermission("view_audit_logs") && (
          <Button
            onClick={() => navigate("/admin/audit-logs")}
            variant="outline"
            className="h-12 justify-start text-left"
          >
            <Zap className="w-4 h-4 mr-2" />
            Audit Logs
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
