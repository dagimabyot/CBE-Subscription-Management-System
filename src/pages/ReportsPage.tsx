import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Calendar } from "lucide-react";

const ReportsPage = () => {
  const subscriptionData = [
    { month: "Jan", voice: 120, data: 98, sms: 65, roaming: 45 },
    { month: "Feb", voice: 140, data: 112, sms: 72, roaming: 52 },
    { month: "Mar", voice: 165, data: 135, sms: 85, roaming: 61 },
    { month: "Apr", voice: 180, data: 156, sms: 98, roaming: 72 },
    { month: "May", voice: 200, data: 175, sms: 110, roaming: 85 },
    { month: "Jun", voice: 220, data: 198, sms: 128, roaming: 95 },
  ];

  const paymentData = [
    { month: "Jan", received: 450000, pending: 50000, delayed: 20000 },
    { month: "Feb", received: 520000, pending: 30000, delayed: 15000 },
    { month: "Mar", received: 680000, pending: 40000, delayed: 18000 },
    { month: "Apr", received: 750000, pending: 25000, delayed: 12000 },
    { month: "May", received: 920000, pending: 35000, delayed: 22000 },
    { month: "Jun", received: 1100000, pending: 45000, delayed: 28000 },
  ];

  const reports = [
    { name: "Subscription Reports", type: "PDF", size: "2.4 MB", generated: "2024-07-20" },
    { name: "Payment Reports", type: "XLSX", size: "1.8 MB", generated: "2024-07-20" },
    { name: "Monthly Billing", type: "PDF", size: "3.1 MB", generated: "2024-06-30" },
    { name: "Service Distribution", type: "PDF", size: "4.2 MB", generated: "2024-07-15" },
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and generate reports.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </Button>
      </div>

      {/* Subscription Trends */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Subscription Trends</CardTitle>
          <CardDescription>Monthly subscription volume by service type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {subscriptionData.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <span className="font-medium w-10">{item.month}</span>
                <div className="flex-1 flex gap-1">
                  <div className="h-6 bg-blue-500 rounded" style={{width: `${item.voice}px`}}></div>
                  <div className="h-6 bg-green-500 rounded" style={{width: `${item.data / 2}px`}}></div>
                  <div className="h-6 bg-orange-500 rounded" style={{width: `${item.sms / 2}px`}}></div>
                  <div className="h-6 bg-purple-500 rounded" style={{width: `${item.roaming / 2}px`}}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Analysis */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Payment Analysis</CardTitle>
          <CardDescription>Revenue collection and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentData.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <span className="font-medium w-10">{item.month}</span>
                <div className="flex gap-2 flex-1">
                  <div className="h-6 bg-green-500 rounded flex-1"></div>
                  <div className="h-6 bg-orange-500 rounded flex-1"></div>
                  <div className="h-6 bg-red-500 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Pre-generated reports ready for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.generated} • {report.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.type}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Subscriptions", value: "2,340" },
          { label: "Active Users", value: "1,856" },
          { label: "Total Revenue", value: "ETB 4.5M" },
          { label: "Growth Rate", value: "+18.2%" },
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
    </div>
  );
};

export default ReportsPage;
