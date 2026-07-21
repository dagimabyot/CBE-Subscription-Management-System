import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Settings, Workflow, BookOpen, Plus, Shield, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const AdminPage = () => {
  const users: User[] = [
    { id: "1", name: "Admin User", email: "admin@telecom.com", role: "Administrator", status: "active", lastLogin: "2024-07-20" },
    { id: "2", name: "Manager A", email: "manager.a@telecom.com", role: "Manager", status: "active", lastLogin: "2024-07-19" },
    { id: "3", name: "Approver B", email: "approver.b@telecom.com", role: "Approver", status: "active", lastLogin: "2024-07-18" },
    { id: "4", name: "User C", email: "user.c@telecom.com", role: "User", status: "inactive", lastLogin: "2024-07-10" },
  ];

  const settings = [
    { label: "System Name", value: "CBE Subscription Management" },
    { label: "Max File Upload Size", value: "50 MB" },
    { label: "Session Timeout", value: "30 minutes" },
    { label: "API Rate Limit", value: "1000 requests/hour" },
  ];

  const workflowRules = [
    { id: "1", name: "Approval Rule 1", condition: "Amount < 10,000", action: "Auto-approve" },
    { id: "2", name: "Approval Rule 2", condition: "Amount > 50,000", action: "Require 3 approvals" },
    { id: "3", name: "Escalation Rule", condition: "Days pending > 7", action: "Escalate to VP" },
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
        <p className="text-muted-foreground">System configuration and user management.</p>
      </div>

      {/* User Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>Add a new user to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter full name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="user@example.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Input placeholder="Select role" className="mt-1" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">Cancel</Button>
                  <Button className="flex-1">Create User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm">
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow Configuration */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Approval Workflow Rules</CardTitle>
            <CardDescription>Configure automatic approval workflows</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Rule
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflowRules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{rule.condition}</TableCell>
                    <TableCell className="text-sm">{rule.action}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure system-wide parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.label} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{setting.label}</p>
                <p className="text-sm text-muted-foreground">{setting.value}</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Health & Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Database", status: "Operational" },
              { label: "API Gateway", status: "Operational" },
              { label: "Email Service", status: "Operational" },
              { label: "File Storage", status: "Operational" },
            ].map((health) => (
              <div key={health.label} className="flex items-center justify-between">
                <span className="text-sm">{health.label}</span>
                <Badge variant="default" className="bg-green-600">{health.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Guidelines & Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Request Submission Guidelines", icon: BookOpen },
                { title: "Approval Process Procedures", icon: Workflow },
                { title: "Security & Compliance", icon: Shield },
                { title: "User Account Policies", icon: Users },
              ].map((guide) => {
                const Icon = guide.icon;
                return (
                  <div key={guide.title} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium">{guide.title}</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
