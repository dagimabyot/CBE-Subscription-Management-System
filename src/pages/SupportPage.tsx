import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, FileText, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const SupportPage = () => {
  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "How do I submit a new service request?",
      answer: "Navigate to Service Requests menu and click 'New Service Request' to begin the process.",
      category: "Requests",
    },
    {
      id: "2",
      question: "What is the typical approval timeline?",
      answer: "Most requests are approved within 2-3 business days depending on complexity and amount.",
      category: "Approvals",
    },
    {
      id: "3",
      question: "How can I track my subscription status?",
      answer: "Go to My Subscriptions page to view all your active subscriptions and their status.",
      category: "Subscriptions",
    },
    {
      id: "4",
      question: "How do I download my payment reports?",
      answer: "Visit Reports & Analytics section and select Payment Reports to generate and download.",
      category: "Payments",
    },
  ];

  const activityLogs = [
    { id: "1", action: "Login", user: "john.doe@telecom.com", timestamp: "2024-07-20 14:30:15" },
    { id: "2", action: "Created Request", user: "jane.smith@telecom.com", timestamp: "2024-07-20 13:45:22" },
    { id: "3", action: "Approved Request", user: "manager.a@telecom.com", timestamp: "2024-07-20 12:15:45" },
    { id: "4", action: "Payment Processed", user: "system@telecom.com", timestamp: "2024-07-20 10:30:00" },
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Support & Help</h1>
        <p className="text-muted-foreground">Get help, find answers, and contact support.</p>
      </div>

      <div className="space-y-6">
        {/* Help & FAQs Section */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search FAQs..." className="pl-9" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <Card key={faq.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{faq.question}</CardTitle>
                      <Badge variant="outline" className="mt-2 w-fit">{faq.category}</Badge>
                    </div>
                    <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Still need help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Can&apos;t find what you&apos;re looking for? Visit our documentation or contact our support team.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">View Documentation</Button>
                <Button>Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support Section */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Contact Support Team</CardTitle>
              <CardDescription>Get in touch with our support team for assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border">
                  <CardHeader className="pb-3">
                    <MessageSquare className="w-6 h-6 text-blue-600 mb-2" />
                    <CardTitle className="text-base">Live Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
                    <Button variant="outline" className="mt-3 w-full">Open Chat</Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-3">
                    <FileText className="w-6 h-6 text-green-600 mb-2" />
                    <CardTitle className="text-base">Email Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">support@telecom.com</p>
                    <Button variant="outline" className="mt-3 w-full">Send Email</Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-3">
                    <HelpCircle className="w-6 h-6 text-orange-600 mb-2" />
                    <CardTitle className="text-base">Phone Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">+251-1-234-5678</p>
                    <Button variant="outline" className="mt-3 w-full">Call Now</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Support Form */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-semibold">Submit a Support Ticket</h3>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your issue" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Select category" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Provide detailed information about your issue..." className="mt-1" rows={5} />
                </div>
                <Button className="w-full">Submit Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Logs Section */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>Recent system activity and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
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

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current system status and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { metric: "Uptime", value: "99.9%" },
                { metric: "Response Time", value: "145ms" },
                { metric: "Active Users", value: "234" },
                { metric: "Requests/Hour", value: "1,234" },
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
