import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, Download, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ServiceRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const requests = [
    { id: "SR001", service: "Voice Plan", type: "Upgrade", status: "Approved", date: "2024-01-15", amount: "ETB 5,000" },
    { id: "SR002", service: "Data Bundle", type: "New", status: "Pending", date: "2024-01-14", amount: "ETB 2,500" },
    { id: "SR003", service: "Roaming", type: "Upgrade", status: "Processing", date: "2024-01-13", amount: "ETB 10,000" },
    { id: "SR004", service: "SMS Package", type: "Downgrade", status: "Approved", date: "2024-01-12", amount: "ETB 1,500" },
    { id: "SR005", service: "Enterprise Line", type: "New", status: "Rejected", date: "2024-01-11", amount: "ETB 25,000" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Processing":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
        <p className="text-muted-foreground">Manage and track all service requests and subscriptions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-blue-700 font-medium">Total Requests</p>
              <p className="text-3xl font-bold text-blue-900">1,234</p>
              <p className="text-xs text-blue-600">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-green-700 font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-900">987</p>
              <p className="text-xs text-green-600">80% approval rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-yellow-700 font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-900">180</p>
              <p className="text-xs text-yellow-600">Awaiting approval</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-red-700 font-medium">Processing Time</p>
              <p className="text-3xl font-bold text-red-900">2.3h</p>
              <p className="text-xs text-red-600">Average response</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Service Requests</CardTitle>
          <CardDescription>View and manage all service requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by request ID or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus size={16} />
              New Request
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="font-semibold">Request ID</TableHead>
                  <TableHead className="font-semibold">Service</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-blue-600">{request.id}</TableCell>
                    <TableCell>{request.service}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{request.amount}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{request.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
