import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

export default function ApprovalsPage() {
  const pendingApprovals = [
    { id: "APP001", requester: "John Doe", amount: "ETB 50,000", service: "Enterprise Voice", priority: "High", date: "2024-01-15" },
    { id: "APP002", requester: "Jane Smith", amount: "ETB 25,000", service: "Data Bundle", priority: "Medium", date: "2024-01-14" },
    { id: "APP003", requester: "Mike Johnson", amount: "ETB 100,000", service: "Bulk Services", priority: "High", date: "2024-01-13" },
  ];

  const approvalHistory = [
    { id: "APP-H001", requester: "Sarah Wilson", amount: "ETB 15,000", service: "SMS Package", status: "Approved", date: "2024-01-12", approver: "Admin" },
    { id: "APP-H002", requester: "Tom Brown", amount: "ETB 30,000", service: "Roaming", status: "Rejected", date: "2024-01-11", approver: "Manager" },
    { id: "APP-H003", requester: "Lisa Anderson", amount: "ETB 75,000", service: "Enterprise", status: "Approved", date: "2024-01-10", approver: "Director" },
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Approvals & Authorizations</h1>
        <p className="text-muted-foreground">Review and approve service requests and high-value transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-yellow-700 font-medium">Pending Approvals</p>
              <p className="text-3xl font-bold text-yellow-900">12</p>
              <p className="text-xs text-yellow-600">Awaiting your decision</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-green-700 font-medium">Approved This Month</p>
              <p className="text-3xl font-bold text-green-900">234</p>
              <p className="text-xs text-green-600">ETB 2.5M total value</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-blue-700 font-medium">Avg. Response Time</p>
              <p className="text-3xl font-bold text-blue-900">1.5h</p>
              <p className="text-xs text-blue-600">Within SLA targets</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            Pending Approvals
          </CardTitle>
          <CardDescription>Requests awaiting your authorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="font-semibold">Request ID</TableHead>
                  <TableHead className="font-semibold">Requester</TableHead>
                  <TableHead className="font-semibold">Service</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Submitted</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-blue-600">{approval.id}</TableCell>
                    <TableCell>{approval.requester}</TableCell>
                    <TableCell>{approval.service}</TableCell>
                    <TableCell className="font-medium">{approval.amount}</TableCell>
                    <TableCell>
                      <Badge className={approval.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                        {approval.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{approval.date}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 size={16} className="mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <XCircle size={16} className="mr-1" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* High-Value Authorizations */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-red-600" />
            High-Value Payment Authorizations
          </CardTitle>
          <CardDescription>Transactions requiring director-level approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.filter(a => parseInt(a.amount) > 50000).map((approval) => (
              <div key={approval.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex-1">
                  <p className="font-medium text-red-900">{approval.service}</p>
                  <p className="text-sm text-red-700">From: {approval.requester} • Amount: {approval.amount}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                  <Button size="sm" variant="outline">Escalate</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approval History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Approval History</CardTitle>
          <CardDescription>Recent approvals and rejections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="font-semibold">Request ID</TableHead>
                  <TableHead className="font-semibold">Requester</TableHead>
                  <TableHead className="font-semibold">Service</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Approver</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvalHistory.map((record) => (
                  <TableRow key={record.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-blue-600">{record.id}</TableCell>
                    <TableCell>{record.requester}</TableCell>
                    <TableCell>{record.service}</TableCell>
                    <TableCell className="font-medium">{record.amount}</TableCell>
                    <TableCell>
                      <Badge className={record.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.approver}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.date}</TableCell>
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
