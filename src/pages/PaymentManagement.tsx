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
import { AlertCircle, CreditCard, DollarSign, CheckCircle, Clock, XCircle, Plus } from "lucide-react";

interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  paymentMethod: "credit_card" | "debit_card" | "paypal" | "stripe" | "telebirr" | "cbe_birr";
  status: "completed" | "pending" | "failed" | "refunded";
  transactionId: string;
  dueDate: string;
  paidDate?: string;
  description: string;
}

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-001",
      invoiceNumber: "INV-2025-001",
      amount: 22500,
      currency: "ETB",
      paymentMethod: "cbe_birr",
      status: "completed",
      transactionId: "TXN-CBE-001",
      dueDate: "2025-01-15",
      paidDate: "2025-01-10",
      description: "Monthly Subscription Services",
    },
    {
      id: "PAY-002",
      invoiceNumber: "INV-2025-002",
      amount: 5000,
      currency: "ETB",
      paymentMethod: "telebirr",
      status: "completed",
      transactionId: "TXN-TBR-001",
      dueDate: "2025-01-20",
      paidDate: "2025-01-18",
      description: "Internet Service Upgrade",
    },
    {
      id: "PAY-003",
      invoiceNumber: "INV-2025-003",
      amount: 3500,
      currency: "ETB",
      paymentMethod: "credit_card",
      status: "pending",
      transactionId: "TXN-CC-001",
      dueDate: "2025-01-25",
      description: "Cloud Storage Service",
    },
    {
      id: "PAY-004",
      invoiceNumber: "INV-2024-012",
      amount: 2000,
      currency: "ETB",
      paymentMethod: "paypal",
      status: "failed",
      transactionId: "TXN-PP-001",
      dueDate: "2024-12-15",
      description: "VPN Service Renewal",
    },
  ]);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return "💳";
      case "paypal":
        return "🅿️";
      case "stripe":
        return "🔷";
      case "telebirr":
        return "📱";
      case "cbe_birr":
        return "🏦";
      default:
        return "💰";
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Credit Card";
      case "debit_card":
        return "Debit Card";
      case "paypal":
        return "PayPal";
      case "stripe":
        return "Stripe";
      case "telebirr":
        return "Telebirr";
      case "cbe_birr":
        return "CBE Birr";
      default:
        return method;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "failed":
      case "refunded":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">Track and manage all payments and invoices</p>
          </div>
          <Button className="bg-[#5D0049] hover:bg-[#4A0039] gap-2">
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">ETB {totalAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">ETB {completedAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">ETB {pendingAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {totalAmount > 0 ? ((completedAmount / totalAmount) * 100).toFixed(0) : 0}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {["invoices", "methods", "history"].map((tab) => (
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

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and manage all invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Invoices Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Invoice</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{payment.invoiceNumber}</td>
                          <td className="py-3 px-4 text-gray-600">{payment.description}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {payment.currency} {payment.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className="flex items-center gap-2">
                              <span>{getPaymentMethodIcon(payment.paymentMethod)}</span>
                              {getPaymentMethodLabel(payment.paymentMethod)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{payment.dueDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(payment.status)}`}>
                              {getStatusIcon(payment.status)}
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center">
                          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No invoices found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "methods" && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Supported payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Credit Card", icon: "💳", description: "Visa, Mastercard, American Express" },
                  { name: "Debit Card", icon: "🏧", description: "Bank debit cards" },
                  { name: "PayPal", icon: "🅿️", description: "PayPal account payments" },
                  { name: "Stripe", icon: "🔷", description: "Stripe payment platform" },
                  { name: "Telebirr", icon: "📱", description: "Ethiopia's mobile payment" },
                  { name: "CBE Birr", icon: "🏦", description: "Commercial Bank of Ethiopia direct transfer" },
                ].map((method, idx) => (
                  <Card key={idx} className="cursor-pointer hover:shadow-md transition">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{method.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Complete payment transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{payment.invoiceNumber}</h3>
                        <p className="text-sm text-gray-600">{payment.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600">Amount</p>
                        <p className="font-semibold text-gray-900">{payment.currency} {payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Method</p>
                        <p className="font-semibold text-gray-900">{getPaymentMethodLabel(payment.paymentMethod)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Transaction ID</p>
                        <p className="font-semibold text-gray-900 text-sm">{payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Date</p>
                        <p className="font-semibold text-gray-900">{payment.paidDate || payment.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
