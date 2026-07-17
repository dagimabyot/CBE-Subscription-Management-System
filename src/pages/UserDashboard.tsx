import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Download, Plus, Bell, Settings, LogOut, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Mock data for subscriptions
  const subscriptions = [
    {
      id: 1,
      name: "Internet Service - Fiber 100Mbps",
      status: "active",
      startDate: "2024-01-15",
      renewalDate: "2025-01-15",
      amount: "2,500.00",
      currency: "ETB",
    },
    {
      id: 2,
      name: "Corporate Phone Lines - 5 Lines",
      status: "active",
      startDate: "2023-06-01",
      renewalDate: "2025-06-01",
      amount: "15,000.00",
      currency: "ETB",
    },
    {
      id: 3,
      name: "Cloud Storage Service",
      status: "pending",
      startDate: "2025-01-01",
      renewalDate: "2026-01-01",
      amount: "5,000.00",
      currency: "ETB",
    },
  ];

  const pendingRequests = [
    {
      id: 101,
      type: "Upgrade",
      service: "Internet Service - Fiber 200Mbps",
      status: "pending",
      submittedDate: "2025-01-05",
      expectedDate: "2025-01-20",
    },
    {
      id: 102,
      type: "New Service",
      service: "Video Conferencing Suite",
      status: "approved",
      submittedDate: "2024-12-28",
      expectedDate: "2025-01-15",
    },
  ];

  const recentBills = [
    {
      id: "INV-2025-001",
      amount: "22,500.00",
      date: "2025-01-01",
      status: "paid",
      dueDate: "2025-01-15",
    },
    {
      id: "INV-2024-012",
      amount: "22,500.00",
      date: "2024-12-01",
      status: "paid",
      dueDate: "2024-12-15",
    },
    {
      id: "INV-2024-011",
      amount: "20,000.00",
      date: "2024-11-01",
      status: "paid",
      dueDate: "2024-11-15",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.firstName || "User"}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/notifications")}
                className="gap-2"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/settings")}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#5D0049]">2</div>
              <p className="text-xs text-gray-500 mt-1">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">1</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">ETB 22,500</div>
              <p className="text-xs text-gray-500 mt-1">All subscriptions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">ETB 0</div>
              <p className="text-xs text-gray-500 mt-1">All bills paid</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-gray-200">
            {["overview", "subscriptions", "requests", "billing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-[#5D0049] text-[#5D0049]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Account Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full Name</p>
                      <p className="text-lg text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="text-lg text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Account Status</p>
                      <p className="text-lg">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {user?.accountStatus || "active"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Member Since</p>
                      <p className="text-lg text-gray-900">{user?.createdDate || "2024-01-15"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2 bg-[#5D0049] hover:bg-[#4A0039]">
                    <Plus className="h-4 w-4" />
                    New Request
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setActiveTab("billing")}
                  >
                    <Download className="h-4 w-4" />
                    Download Invoices
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Clock className="h-4 w-4" />
                    View History
                  </Button>
                </CardContent>
              </Card>
            </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Subscriptions</CardTitle>
                <CardDescription>Manage and view all your active and pending subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {sub.status === "active" ? "Active since" : "Starting"} {sub.startDate}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            sub.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-600">Monthly Cost</p>
                          <p className="font-semibold text-gray-900">
                            {sub.currency} {sub.amount}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Renewal Date</p>
                          <p className="font-semibold text-gray-900">{sub.renewalDate}</p>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === "requests" && (
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>Track your upgrade, downgrade, and new service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{req.type}</h3>
                          <p className="text-sm text-gray-600 mt-1">{req.service}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            req.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-600">Submitted</p>
                          <p className="font-semibold text-gray-900">{req.submittedDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Expected Date</p>
                          <p className="font-semibold text-gray-900">{req.expectedDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Invoices</CardTitle>
                <CardDescription>View and download your billing history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Invoice</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBills.map((bill) => (
                        <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{bill.id}</td>
                          <td className="py-3 px-4 text-gray-900">ETB {bill.amount}</td>
                          <td className="py-3 px-4 text-gray-600">{bill.date}</td>
                          <td className="py-3 px-4 text-gray-600">{bill.dueDate}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {bill.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
