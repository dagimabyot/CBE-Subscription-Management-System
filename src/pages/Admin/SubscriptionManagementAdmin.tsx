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
import { AlertCircle, Plus, Edit2, Trash2, Check, X, Search } from "lucide-react";

interface SubscriptionRequest {
  id: string;
  userId: string;
  userName: string;
  email: string;
  serviceType: string;
  requestType: "new" | "upgrade" | "downgrade" | "cancel";
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  amount: number;
  reason: string;
}

const SubscriptionManagementAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [requests, setRequests] = useState<SubscriptionRequest[]>([
    {
      id: "REQ-001",
      userId: "USR-001",
      userName: "John Doe",
      email: "john.doe@cbe.et",
      serviceType: "Internet Service",
      requestType: "upgrade",
      status: "pending",
      submittedDate: "2025-01-15",
      amount: 5000,
      reason: "Need faster internet for increased operations",
    },
    {
      id: "REQ-002",
      userId: "USR-002",
      userName: "Jane Smith",
      email: "jane.smith@cbe.et",
      serviceType: "Cloud Storage",
      requestType: "new",
      status: "pending",
      submittedDate: "2025-01-14",
      amount: 2500,
      reason: "Backup and archival requirements",
    },
    {
      id: "REQ-003",
      userId: "USR-003",
      userName: "Mike Johnson",
      email: "mike.johnson@cbe.et",
      serviceType: "VPN Service",
      requestType: "cancel",
      status: "approved",
      submittedDate: "2025-01-10",
      amount: 1500,
      reason: "No longer needed",
    },
  ]);

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const handleDelete = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const getRequestTypeColor = (type: string) => {
    switch (type) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "upgrade":
        return "bg-green-100 text-green-800";
      case "downgrade":
        return "bg-yellow-100 text-yellow-800";
      case "cancel":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription Requests</h1>
            <p className="text-gray-600 mt-2">Review and approve subscription requests</p>
          </div>
          <Button className="bg-[#5D0049] hover:bg-[#4A0039] gap-2">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{requests.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Requests</CardTitle>
            <CardDescription>Manage user subscription requests</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or service..."
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
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Requests Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Request ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{req.id}</td>
                        <td className="py-3 px-4 text-gray-900">{req.userName}</td>
                        <td className="py-3 px-4 text-gray-600">{req.email}</td>
                        <td className="py-3 px-4 text-gray-900">{req.serviceType}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRequestTypeColor(req.requestType)}`}>
                            {req.requestType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900">ETB {req.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-600">{req.submittedDate}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              req.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : req.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right flex gap-2 justify-end">
                          {req.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-green-600 hover:text-green-700"
                                onClick={() => handleApprove(req.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-red-600 hover:text-red-700"
                                onClick={() => handleReject(req.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(req.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-8 text-center">
                        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No requests found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionManagementAdmin;
