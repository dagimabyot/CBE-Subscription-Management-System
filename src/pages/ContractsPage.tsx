import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye, Calendar } from "lucide-react";

interface Contract {
  id: string;
  name: string;
  type: string;
  status: "active" | "expired" | "pending";
  effectiveDate: string;
  expiryDate: string;
}

const ContractsPage = () => {
  const contracts: Contract[] = [
    {
      id: "1",
      name: "Master Service Agreement - Ethio Telecom",
      type: "Service Agreement",
      status: "active",
      effectiveDate: "2023-01-15",
      expiryDate: "2025-01-15",
    },
    {
      id: "2",
      name: "Data Processing Agreement",
      type: "Compliance",
      status: "active",
      effectiveDate: "2023-06-01",
      expiryDate: "2026-06-01",
    },
    {
      id: "3",
      name: "Service Level Agreement",
      type: "SLA",
      status: "pending",
      effectiveDate: "2024-08-01",
      expiryDate: "2027-08-01",
    },
    {
      id: "4",
      name: "Roaming Agreement - Regional",
      type: "Partnership",
      status: "expired",
      effectiveDate: "2021-01-01",
      expiryDate: "2024-01-01",
    },
  ];

  const templates = [
    { name: "Standard Service Agreement", size: "245 KB" },
    { name: "Amendment Template", size: "120 KB" },
    { name: "Termination Agreement", size: "189 KB" },
    { name: "NDA Template", size: "156 KB" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "expired": return "destructive";
      case "pending": return "secondary";
      default: return "outline";
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days < 90 && days > 0;
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Contracts & Documentation</h1>
        <p className="text-muted-foreground">Manage contracts with Ethio Telecom and related agreements.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Contracts", value: "3" },
          { label: "Expiring Soon", value: "1" },
          { label: "Awaiting Signature", value: "1" },
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

      {/* Contracts Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Active Contracts</CardTitle>
          <CardDescription>Contracts with Ethio Telecom and partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Contract Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium max-w-xs">{contract.name}</TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(contract.status)} className="capitalize">
                          {contract.status}
                        </Badge>
                        {isExpiringSoon(contract.expiryDate) && (
                          <Badge variant="outline" className="text-orange-600">Expiring Soon</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(contract.effectiveDate).toLocaleDateString()}</TableCell>
                    <TableCell className={isExpiringSoon(contract.expiryDate) ? "text-orange-600 font-medium" : ""}>
                      {new Date(contract.expiryDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
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

      {/* Templates */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Download Templates</CardTitle>
          <CardDescription>Standard templates for agreements and amendments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div key={template.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractsPage;
