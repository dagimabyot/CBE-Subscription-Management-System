import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, FileText, CreditCard, ListTodo } from "lucide-react";

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const stats = [
    {
      title: "Assigned Subscriptions",
      value: "124",
      icon: TrendingUp,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Tasks",
      value: "7",
      icon: ListTodo,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Billings",
      value: "$12,450",
      icon: CreditCard,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Officer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage subscriptions and process requests</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        {hasPermission("manage_subscriptions") && (
          <Button
            onClick={() => navigate("/officer/subscriptions")}
            className="h-12 justify-start text-left bg-[#5D0049] hover:bg-[#4A0039]"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Subscriptions
          </Button>
        )}
        {hasPermission("manage_billing") && (
          <Button
            onClick={() => navigate("/officer/billing")}
            variant="outline"
            className="h-12 justify-start text-left"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Billing Management
          </Button>
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
