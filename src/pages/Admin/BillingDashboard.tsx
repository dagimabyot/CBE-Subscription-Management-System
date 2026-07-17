import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, Download, Filter } from "lucide-react";

interface BillingMetric {
  period: string;
  totalRevenue: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
}

const BillingDashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");

  const metrics: BillingMetric[] = [
    {
      period: "January 2025",
      totalRevenue: 2250000,
      completedPayments: 156,
      pendingPayments: 12,
      failedPayments: 3,
    },
    {
      period: "December 2024",
      totalRevenue: 2180000,
      completedPayments: 142,
      pendingPayments: 8,
      failedPayments: 2,
    },
    {
      period: "November 2024",
      totalRevenue: 2105000,
      completedPayments: 138,
      pendingPayments: 10,
      failedPayments: 4,
    },
  ];

  const currentMetrics = metrics[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing Dashboard</h1>
            <p className="text-gray-600 mt-2">Financial overview and revenue analytics</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                ETB {(currentMetrics.totalRevenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-green-600 mt-1">↑ 3.2% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{currentMetrics.completedPayments}</p>
              <p className="text-xs text-gray-600 mt-1">Successfully processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{currentMetrics.pendingPayments}</p>
              <p className="text-xs text-gray-600 mt-1">Awaiting verification</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Failed Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{currentMetrics.failedPayments}</p>
              <p className="text-xs text-gray-600 mt-1">Requires action</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 gap-2">
                {metrics.map((metric, idx) => {
                  const height = (metric.totalRevenue / 2250000) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-[#5D0049] to-purple-300 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        {metric.period.split(" ")[0]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Distribution by payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { method: "CBE Birr", count: 45, percentage: 35 },
                  { method: "Telebirr", count: 38, percentage: 28 },
                  { method: "Credit Card", count: 32, percentage: 22 },
                  { method: "PayPal", count: 18, percentage: 15 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{item.method}</p>
                      <p className="text-sm text-gray-600">{item.percentage}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#5D0049] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent High-Value Transactions</CardTitle>
            <CardDescription>Latest transactions over ETB 100,000</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Invoice</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      invoice: "INV-2025-089",
                      customer: "ABC Manufacturing",
                      amount: 450000,
                      method: "CBE Birr",
                      date: "2025-01-17",
                      status: "completed",
                    },
                    {
                      invoice: "INV-2025-088",
                      customer: "XYZ Trading",
                      amount: 320000,
                      method: "Telebirr",
                      date: "2025-01-16",
                      status: "completed",
                    },
                    {
                      invoice: "INV-2025-087",
                      customer: "Tech Solutions Ltd",
                      amount: 280000,
                      method: "Credit Card",
                      date: "2025-01-15",
                      status: "completed",
                    },
                  ].map((txn, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{txn.invoice}</td>
                      <td className="py-3 px-4 text-gray-900">{txn.customer}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        ETB {txn.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{txn.method}</td>
                      <td className="py-3 px-4 text-gray-600">{txn.date}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingDashboard;
