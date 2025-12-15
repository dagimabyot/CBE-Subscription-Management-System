"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RequestForm, Request } from "./components/RequestForm";

const initialData: Request[] = [
  {
    id: "req-3",
    requestedBy: "Charlie Brown",
    service: "VPN",
    department: "IT",
    purpose: "Remote work setup",
    status: "approved",
    requestedDate: "2025-08-05T10:00:00Z",
    priority: "Medium",
    assignedTo: "Charlie",
  },
  {
    id: "req-4",
    requestedBy: "Alice Johnson",
    service: "Email",
    department: "HR",
    purpose: "Onboarding new employee",
    status: "pending",
    requestedDate: "2025-09-15T09:00:00Z",
    priority: "High",
    assignedTo: "Sam",
  },
];

export default function RequestTable() {
  const [requests, setRequests] = useState<Request[]>(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const handleAddRequest = (req: Request) => {
    setRequests((prev) => [req, ...prev]);
  };

  const filteredData = requests.filter((req) => {
    const matchesSearch =
      req.requestedBy.toLowerCase().includes(search.toLowerCase()) ||
      req.service.toLowerCase().includes(search.toLowerCase()) ||
      req.department.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Card className="p-6 shadow-lg rounded-2xl">
      <CardContent className="space-y-6">
        {/* Header with Add Request Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Service Requests</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Request</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>New Request</DialogTitle>
              </DialogHeader>
              <RequestForm onSubmit={handleAddRequest} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Input
            placeholder="Search by requester, service, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3"
          />

          <div className="flex gap-4">
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setPriorityFilter} defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="p-3">Requester</th>
                <th className="p-3">Service</th>
                <th className="p-3">Department</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Requested Date</th>
                <th className="p-3">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{req.requestedBy}</td>
                    <td className="p-3">{req.service}</td>
                    <td className="p-3">{req.department}</td>
                    <td className="p-3">{req.purpose}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          req.priority === "High"
                            ? "destructive"
                            : req.priority === "Medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {req.priority}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          req.status === "approved"
                            ? "default"
                            : req.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {req.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {new Date(req.requestedDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">{req.assignedTo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
