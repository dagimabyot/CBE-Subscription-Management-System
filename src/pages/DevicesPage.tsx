import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Smartphone, Activity, Archive, Plus } from "lucide-react";

interface Device {
  id: string;
  imei: string;
  model: string;
  sim: string;
  status: "active" | "inactive" | "lost";
  lastActivity: string;
  owner: string;
}

interface SIMCard {
  id: string;
  msisdn: string;
  status: "active" | "suspended" | "deactivated";
  balance?: string;
  assignedTo: string;
}

const DevicesPage = () => {
  const devices: Device[] = [
    { id: "1", imei: "123456789012345", model: "iPhone 14 Pro", sim: "251911234567", status: "active", lastActivity: "2024-07-20", owner: "John Doe" },
    { id: "2", imei: "234567890123456", model: "Samsung S23", sim: "251911234568", status: "active", lastActivity: "2024-07-19", owner: "Jane Smith" },
    { id: "3", imei: "345678901234567", model: "iPhone 13", sim: "251911234569", status: "inactive", lastActivity: "2024-07-10", owner: "Mike Johnson" },
    { id: "4", imei: "456789012345678", model: "Samsung A53", sim: "251911234570", status: "lost", lastActivity: "2024-06-15", owner: "Sarah Williams" },
  ];

  const sims: SIMCard[] = [
    { id: "1", msisdn: "251911234567", status: "active", balance: "ETB 500", assignedTo: "John Doe" },
    { id: "2", msisdn: "251911234568", status: "active", balance: "ETB 1,200", assignedTo: "Jane Smith" },
    { id: "3", msisdn: "251911234569", status: "suspended", assignedTo: "Mike Johnson" },
    { id: "4", msisdn: "251911234570", status: "deactivated", assignedTo: "Unassigned" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "lost": return "destructive";
      case "suspended": return "outline";
      case "deactivated": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Device & SIM Management</h1>
        <p className="text-muted-foreground">Track and manage devices and SIM card assignments.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Devices", value: "234" },
          { label: "Active Devices", value: "218" },
          { label: "SIM Cards", value: "234" },
          { label: "Lost/Missing", value: "4" },
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

      {/* Device Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Device Management</CardTitle>
            <CardDescription>All registered devices and their status</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Register Device
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>IMEI</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>SIM</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-sm">{device.imei}</TableCell>
                    <TableCell>{device.model}</TableCell>
                    <TableCell className="font-mono">{device.sim}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(device.status)} className="capitalize">
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.owner}</TableCell>
                    <TableCell>{new Date(device.lastActivity).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* SIM Card Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>SIM Card Assignments</CardTitle>
            <CardDescription>SIM card allocation and status</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Assign SIM
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>MSISDN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sims.map((sim) => (
                  <TableRow key={sim.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono">{sim.msisdn}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(sim.status)} className="capitalize">
                        {sim.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{sim.balance || "N/A"}</TableCell>
                    <TableCell>{sim.assignedTo}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Device Replacement & Decommissioned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Device Replacement Tracking</CardTitle>
            <CardDescription>Track device replacements and handovers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Smartphone className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active replacements at the moment</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Decommissioned Devices</CardTitle>
            <CardDescription>Devices that have been retired or removed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Archive className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No decommissioned devices</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevicesPage;
