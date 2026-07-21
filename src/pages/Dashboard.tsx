import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, FileText, CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  // Sample data for charts
  const monthlyData = [
    { month: "Jan", requests: 400, approved: 320, pending: 80 },
    { month: "Feb", requests: 520, approved: 420, pending: 100 },
    { month: "Mar", requests: 680, approved: 540, pending: 140 },
    { month: "Apr", requests: 750, approved: 610, pending: 140 },
    { month: "May", requests: 920, approved: 750, pending: 170 },
    { month: "Jun", requests: 1100, approved: 880, pending: 220 },
  ];

  const statusData = [
    { name: "Approved", value: 420, color: "#10b981" },
    { name: "Pending", value: 150, color: "#f59e0b" },
    { name: "Rejected", value: 80, color: "#ef4444" },
  ];

  const requestsByService = [
    { service: "Voice", value: 320 },
    { service: "Data", value: 280 },
    { service: "SMS", value: 200 },
    { service: "Roaming", value: 190 },
    { service: "Enterprise", value: 150 },
  ];

  const stats = [
    {
      title: "Total Requests",
      value: "1,234",
      change: "+12.5%",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Approved",
      value: "987",
      change: "+8.2%",
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Pending",
      value: "180",
      change: "-2.1%",
      icon: Users,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Avg Response Time",
      value: "2.3h",
      change: "-15%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your subscription management overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Trend */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Request Trend</CardTitle>
            <CardDescription>Request volume and approval rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((item) => (
                <div key={item.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{item.month}</span>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1 h-6 bg-green-500 rounded" style={{width: `${(item.approved / item.requests) * 100}%`}} title={`Approved: ${item.approved}`}></div>
                    <div className="flex-1 h-6 bg-orange-500 rounded" style={{width: `${(item.pending / item.requests) * 100}%`}} title={`Pending: ${item.pending}`}></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">{item.requests}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current request status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests by Service */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Requests by Service</CardTitle>
          <CardDescription>Distribution of requests across service types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requestsByService.map((item) => (
              <div key={item.service} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.service}</span>
                <div className="flex-1 mx-4 h-2 bg-blue-500 rounded" style={{width: `${(item.value / 320) * 100}px`}}></div>
                <span className="text-sm font-semibold text-right w-12">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ View pending approvals</p>
              <p>✓ Create new request</p>
              <p>✓ Download reports</p>
              <p>✓ Manage subscriptions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Status:</span>
                <span className="text-green-600 font-medium">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync:</span>
                <span className="text-muted-foreground">5 min ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Users:</span>
                <span className="font-medium">234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
