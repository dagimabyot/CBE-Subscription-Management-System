import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lock, Eye, EyeOff, Download, Trash2, CheckCircle, Clock, MapPin } from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  status: "success" | "failed";
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

const SecurityPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: "1",
      device: "Chrome on Windows",
      location: "Addis Ababa, Ethiopia",
      ipAddress: "192.168.1.100",
      lastActive: "Now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "Addis Ababa, Ethiopia",
      ipAddress: "192.168.1.101",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Chrome on Mac",
      location: "Lagos, Nigeria",
      ipAddress: "203.0.113.50",
      lastActive: "3 days ago",
      isCurrent: false,
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      action: "Login",
      timestamp: "2025-01-17 14:30:00",
      ipAddress: "192.168.1.100",
      location: "Addis Ababa, Ethiopia",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: "2",
      action: "Password Changed",
      timestamp: "2025-01-15 10:15:00",
      ipAddress: "192.168.1.100",
      location: "Addis Ababa, Ethiopia",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: "3",
      action: "Logout",
      timestamp: "2025-01-14 18:45:00",
      ipAddress: "192.168.1.101",
      location: "Addis Ababa, Ethiopia",
      device: "Safari on iPhone",
      status: "success",
    },
    {
      id: "4",
      action: "Failed Login Attempt",
      timestamp: "2025-01-13 22:10:00",
      ipAddress: "203.0.113.75",
      location: "Unknown Location",
      device: "Unknown",
      status: "failed",
    },
  ]);

  const handleLogoutSession = (id: string) => {
    setActiveSessions(activeSessions.filter((s) => s.id !== id));
  };

  const handleLogoutAllOthers = () => {
    setActiveSessions(activeSessions.filter((s) => s.isCurrent));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account security and privacy</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-200 mt-8 mb-8">
          {["overview", "password", "sessions", "logs"].map((tab) => (
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

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Your account security overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Enabled</p>
                    </div>
                  </div>
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Strong Password</h3>
                      <p className="text-sm text-gray-600">Last changed 2 months ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Unrecognized Login</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        We detected a login from Lagos, Nigeria on 2025-01-13. If this wasn't you, please change your password immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-700">Enable backup authentication codes</span>
                  <Button size="sm" variant="outline">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-700">Review and remove suspicious sessions</span>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700">Security checkup completed</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password regularly to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="max-w-2xl space-y-6">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="current"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="new">New Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="new"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Password must be at least 12 characters with uppercase, lowercase, numbers, and symbols
                </p>
              </div>

              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-[#5D0049] hover:bg-[#4A0039]">Update Password</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Devices currently logged into your account</CardDescription>
              </CardHeader>
              <CardContent>
                {activeSessions.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleLogoutAllOthers}
                    className="mb-4 gap-2 text-red-600 hover:text-red-700"
                  >
                    <Lock className="h-4 w-4" />
                    Logout All Other Sessions
                  </Button>
                )}
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.device}</h3>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {session.location}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">IP: {session.ipAddress}</p>
                          <p className="text-xs text-gray-500">Last active: {session.lastActive}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.isCurrent && (
                            <span className="px-3 py-1 bg-[#5D0049] text-white text-xs rounded-full font-medium">
                              Current
                            </span>
                          )}
                          {!session.isCurrent && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleLogoutSession(session.id)}
                            >
                              Logout
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === "logs" && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>Complete history of account activities and security events</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Timestamp</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Device</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">IP Address</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{log.action}</td>
                        <td className="py-3 px-4 text-gray-600">{log.timestamp}</td>
                        <td className="py-3 px-4 text-gray-600">{log.device}</td>
                        <td className="py-3 px-4 text-gray-600">{log.location}</td>
                        <td className="py-3 px-4 text-gray-600 font-mono text-xs">{log.ipAddress}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              log.status === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SecurityPage;
