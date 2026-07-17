import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Plus, Edit2, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Subscription {
  id: string;
  name: string;
  provider: string;
  cost: number;
  billingCycle: "monthly" | "quarterly" | "annual";
  status: "active" | "inactive" | "pending" | "suspended";
  startDate: string;
  renewalDate: string;
  description: string;
  autoRenew: boolean;
}

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "SUB-001",
      name: "Internet Service",
      provider: "Ethio Telecom",
      cost: 2500,
      billingCycle: "monthly",
      status: "active",
      startDate: "2024-01-15",
      renewalDate: "2025-01-15",
      description: "Fiber Internet 100Mbps",
      autoRenew: true,
    },
    {
      id: "SUB-002",
      name: "Cloud Storage",
      provider: "Google Drive",
      cost: 5000,
      billingCycle: "annual",
      status: "active",
      startDate: "2024-06-01",
      renewalDate: "2025-06-01",
      description: "2TB Cloud Storage",
      autoRenew: true,
    },
    {
      id: "SUB-003",
      name: "VPN Service",
      provider: "ExpressVPN",
      cost: 1500,
      billingCycle: "monthly",
      status: "inactive",
      startDate: "2023-12-01",
      renewalDate: "2024-12-01",
      description: "Premium VPN Access",
      autoRenew: false,
    },
  ]);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalMonthlyCost = subscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, sub) => {
      if (sub.billingCycle === "monthly") return sum + sub.cost;
      if (sub.billingCycle === "quarterly") return sum + sub.cost / 3;
      if (sub.billingCycle === "annual") return sum + sub.cost / 12;
      return sum;
    }, 0);

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
            <p className="text-gray-600 mt-2">Manage all your subscriptions and recurring services</p>
          </div>
          <Button className="bg-[#5D0049] hover:bg-[#4A0039] gap-2">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#5D0049]">
                {subscriptions.filter((s) => s.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">ETB {totalMonthlyCost.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{subscriptions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Renewals This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {subscriptions.filter((s) => new Date(s.renewalDate).getMonth() === new Date().getMonth()).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-gray-200">
            {["list", "active", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-[#5D0049] text-[#5D0049]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "list" ? "All Subscriptions" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Subscriptions List Tab */}
          {activeTab === "list" && (
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriptions List</CardTitle>
                <CardDescription>View and manage all your subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search subscriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subscriptions Grid */}
                <div className="space-y-4">
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((subscription) => (
                      <div
                        key={subscription.id}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{subscription.name}</h3>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  subscription.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : subscription.status === "inactive"
                                    ? "bg-gray-100 text-gray-800"
                                    : subscription.status === "suspended"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {subscription.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{subscription.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">ETB {subscription.cost}</p>
                            <p className="text-xs text-gray-500">per {subscription.billingCycle}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 py-4 border-t border-gray-200 border-b text-sm">
                          <div>
                            <p className="text-gray-600">Provider</p>
                            <p className="font-medium text-gray-900">{subscription.provider}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Start Date</p>
                            <p className="font-medium text-gray-900">{subscription.startDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Renewal Date</p>
                            <p className="font-medium text-gray-900">{subscription.renewalDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Auto-Renewal</p>
                            <p className="font-medium text-gray-900">
                              {subscription.autoRenew ? "Enabled" : "Disabled"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-4">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteSubscription(subscription.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No subscriptions found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            </div>
          )}

          {/* Active Tab */}
          {activeTab === "active" && (
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
                <CardDescription>Your currently active subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-600">Active subscriptions view</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <Card>
              <CardHeader>
                <CardTitle>Subscription Analytics</CardTitle>
                <CardDescription>Cost trends and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-600">Analytics dashboard</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
