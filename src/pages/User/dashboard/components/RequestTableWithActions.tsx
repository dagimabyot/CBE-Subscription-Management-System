"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, UserCheck, XCircle } from "lucide-react";

type Request = {
  id: string;
  requestedBy: string;
  service: string;
  department: string;
  purpose: string;
  status: string;
  requestedDate: string;
  priority: string;
  assignedTo: string;
};

type Props = {
  data: Request[];
};

export default function RequestTableWithActions({ data }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const navigate = useNavigate();

  const filteredData = data.filter((req) => {
    const matchesSearch = Object.values(req)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter ? req.status === statusFilter : true;
    const matchesPriority = priorityFilter ? req.priority === priorityFilter : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleAction = (action: string, req: Request) => {
    if (action === "View") {
      // Navigate to details page and pass the request object via state
      navigate(`/dashboard/requests/${req.id}`, { state: { request: req } });
    } else {
      console.log(`${action} request: ${req.id}`);
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <select
            className="border border-gray-300 rounded-lg p-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg p-2 text-sm"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">Requested By</th>
              <th className="p-3 font-medium">Service</th>
              <th className="p-3 font-medium">Department</th>
              <th className="p-3 font-medium">Purpose</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Priority</th>
              <th className="p-3 font-medium">Assigned To</th>
              <th className="p-3 font-medium">Requested Date</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((req) => (
                <tr
                  key={req.id}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{req.id}</td>
                  <td className="p-3">{req.requestedBy}</td>
                  <td className="p-3">{req.service}</td>
                  <td className="p-3">{req.department}</td>
                  <td className="p-3">{req.purpose}</td>
                  <td className="p-3 capitalize">{req.status}</td>
                  <td className="p-3">{req.priority}</td>
                  <td className="p-3">{req.assignedTo || "-"}</td>
                  <td className="p-3">{formatDate(req.requestedDate)}</td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleAction("View", req)}>
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Assign", req)}>
                          <UserCheck className="h-4 w-4 mr-2" /> Assign
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Reject", req)}>
                          <XCircle className="h-4 w-4 mr-2" /> Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
