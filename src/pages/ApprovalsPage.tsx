import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, Clock, Eye } from "lucide-react";

interface PendingApproval {
  id: string;
  requestId: string;
  requester: string;
  service: string;
  amount?: string;
  priority: "low" | "medium" | "high";
  submittedDate: string;
  daysWaiting: number;
}

const ApprovalsPage = () => {
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);
  const [approvalNote, setApprovalNote] = useState("");

  const pendingApprovals: PendingApproval[] = [
    {
      id: "1",
      requestId: "REQ-001",
      requester: "John Doe",
      service: "Enterprise Voice",
      amount: "$5,000",
      priority: "high",
      submittedDate: "2024-07-19",
      daysWaiting: 5,
    },
    {
      id: "2",
      requestId: "REQ-002",
      requester: "Jane Smith",
      service: "Data Plan",
      amount: "$1,200",
      priority: "medium",
      submittedDate: "2024-07-18",
      daysWaiting: 6,
    },
    {
      id: "3",
      requestId: "REQ-003",
      requester: "Mike Johnson",
      service: "Roaming Bundle",
      amount: "$800",
      priority: "low",
      submittedDate: "2024-07-17",
      daysWaiting: 7,
    },
  ];

  const stats = [
    { label: "Pending Approvals", value: "12", icon: Clock, color: "text-orange-600" },
    { label: "Awaiting High-Value", value: "3", icon: AlertCircle, color: "text-red-600" },
    { label: "Average Wait Time", value: "2.4 days", icon: TrendingDown, color: "text-blue-600" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Approvals & Authorizations</h1>
        <p className="text-muted-foreground">Manage pending approvals and high-value payment authorizations.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Pending Approvals", value: "12" },
          { label: "High-Value Items", value: "3" },
          { label: "Average Wait", value: "2.4 days" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Approvals Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>My Pending Approvals</CardTitle>
          <CardDescription>Review and approve pending service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Days Waiting</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{approval.requestId}</TableCell>
                    <TableCell>{approval.requester}</TableCell>
                    <TableCell>{approval.service}</TableCell>
                    <TableCell>{approval.amount || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(approval.priority)}>
                        {approval.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={approval.daysWaiting > 5 ? "text-orange-600 font-medium" : ""}>
                        {approval.daysWaiting}d
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedApproval(approval)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Approve Request</DialogTitle>
                            <DialogDescription>
                              Review and approve {approval.requestId} from {approval.requester}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Request ID</p>
                                <p className="font-semibold">{approval.requestId}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Amount</p>
                                <p className="font-semibold">{approval.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Service</p>
                                <p className="font-semibold">{approval.service}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Priority</p>
                                <p className="font-semibold">{approval.priority}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Approval Notes</label>
                              <Textarea
                                placeholder="Add any notes or conditions for approval..."
                                className="mt-2"
                                value={approvalNote}
                                onChange={(e) => setApprovalNote(e.target.value)}
                              />
                            </div>
                            <div className="flex gap-2 pt-4">
                              <Button variant="outline" className="flex-1">Cancel</Button>
                              <Button variant="destructive" className="flex-1">Reject</Button>
                              <Button className="flex-1">Approve</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
          <CardTitle>High-Value Payment Authorizations</CardTitle>
          <CardDescription>Payments requiring additional authorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.filter(a => a.priority === "high").map((approval) => (
              <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{approval.requestId} - {approval.amount}</p>
                  <p className="text-sm text-muted-foreground">{approval.service}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Review</Button>
                  <Button size="sm">Authorize</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { AlertCircle, TrendingDown } from "lucide-react";

export default ApprovalsPage;
