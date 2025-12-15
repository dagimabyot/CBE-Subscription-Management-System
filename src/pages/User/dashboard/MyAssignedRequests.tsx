"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UploadDocumentForm from "./components/UploadDocumentForm";
import { Upload } from "lucide-react";

type Request = {
  id: string;
  requestedBy: string;
  service: string;
  department: string;
  priority: string;
  status: string;
  requestedDate: string;
};

export default function MyAssignedRequests() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
const openUploadModal = (reqId: string) => {
  setSelectedRequestId(reqId);
  setUploadModalOpen(true);
};

  const navigate = useNavigate();

  const requests: Request[] = [
    {
      id: "req-1",
      requestedBy: "Charlie Brown",
      service: "VPN",
      department: "IT",
      priority: "Medium",
      status: "approved",
      requestedDate: "2025-08-05T10:00:00Z",
    },
    {
      id: "req-2",
      requestedBy: "Alice Smith",
      service: "Email",
      department: "IT",
      priority: "High",
      status: "pending",
      requestedDate: "2025-08-10T10:00:00Z",
    },
    {
      id: "req-3",
      requestedBy: "Bob Johnson",
      service: "Cloud Storage",
      department: "Finance",
      priority: "Low",
      status: "rejected",
      requestedDate: "2025-08-12T10:00:00Z",
    },
  ];

  const filteredData = requests.filter((req) => {
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
      navigate(`/dashboard/requests/${req.id}`, { state: { request: req } });
    } else if (action === "Complete") {
      toast.success(`Request ${req.id} marked as completed`);
    } else if (action === "Reject") {
      toast.error(`Request ${req.id} rejected`);
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6 rounded-2xl shadow-sm bg-white space-y-4">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Input
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex gap-2">
            <select
              className="border border-gray-300 rounded-lg p-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
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

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Requested By</th>
                <th className="p-3 font-medium">Service</th>
                <th className="p-3 font-medium">Department</th>
                <th className="p-3 font-medium">Priority</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Requested Date</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((req) => (
                  <tr key={req.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="p-3">{req.id}</td>
                    <td className="p-3">{req.requestedBy}</td>
                    <td className="p-3">{req.service}</td>
                    <td className="p-3">{req.department}</td>
                    <td className="p-3">{req.priority}</td>
                    <td
                      className={`p-3 capitalize ${
                        req.status === "approved"
                          ? "text-green-600"
                          : req.status === "pending"
                          ? "text-gray-600"
                          : req.status === "rejected"
                          ? "text-red-500"
                          : "text-blue-600"
                      }`}
                    >
                      {req.status}
                    </td>
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
                          <DropdownMenuItem onClick={() => handleAction("Complete", req)}>
                            <CheckCircle className="h-4 w-4 mr-2" /> Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Reject", req)}>
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                          </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => openUploadModal(req.id)}>
  <Upload className="h-4 w-4 mr-2" /> Upload Document
</DropdownMenuItem>
                        </DropdownMenuContent>
          
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {uploadModalOpen && selectedRequestId && (
  <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
    <DialogContent>
      <UploadDocumentForm
        requestId={selectedRequestId}
        onUploadSuccess={() => setUploadModalOpen(false)}
      />
    </DialogContent>
  </Dialog>
)}

        </div>
      </Card>
    </div>
  );
}
