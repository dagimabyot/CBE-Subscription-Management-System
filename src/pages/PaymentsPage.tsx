import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Payment {
  id: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  reference: string;
}

const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: "1", description: "Service Renewal", amount: 5000, status: "completed", date: "2024-07-20", reference: "REF-001" },
    { id: "2", description: "Upgrade Payment", amount: 2500, status: "pending", date: "2024-07-19", reference: "REF-002" },
    { id: "3", description: "Monthly Subscription", amount: 1200, status: "completed", date: "2024-07-18", reference: "REF-003" },
    { id: "4", description: "Device Setup", amount: 800, status: "failed", date: "2024-07-17", reference: "REF-004" },
  ]);

  const totalRevenue = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "pending": return "secondary";
      case "failed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle2;
      case "pending": return Clock;
      case "failed": return AlertCircle;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage and monitor all payments and settlements.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ETB {totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 font-medium">+12.5% from last period</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-orange-600 font-medium">{payments.filter(p => p.status === "pending").length} transactions</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Failed Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.filter(p => p.status === "failed").length}</div>
            <p className="text-xs text-red-600 font-medium">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Initiate Payment Memo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Payment Memo</DialogTitle>
              <DialogDescription>Fill in the details for your payment memo</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Payment purpose..." className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Amount</label>
                <Input placeholder="0.00" type="number" className="mt-1" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1">Create Memo</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline">Verify Payments</Button>
        <Button variant="outline">Settlement Processing</Button>
      </div>

      {/* Payments Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Recent transactions and settlements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const StatusIcon = getStatusIcon(payment.status);
                  return (
                    <TableRow key={payment.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{payment.reference}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell className="font-medium">ETB {payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payment.status)} className="capitalize">
                          {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
