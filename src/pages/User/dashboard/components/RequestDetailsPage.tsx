import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

export default function RequestDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const request = location.state?.request; // get request object from state

  const [assignedTo, setAssignedTo] = useState(request?.assignedTo || "");
  const [status, setStatus] = useState(request?.status || "");

  if (!request) {
    return (
      <div className="p-6">
        <p className="text-red-500">Request data not found.</p>
        <Button onClick={() => navigate("/dashboard/requests")}>Go Back</Button>
      </div>
    );
  }

  const handleAssign = () => {
    toast.success(`Request assigned to ${assignedTo}`);
    setStatus("assigned");
  };

  const handleReject = () => {
    toast.error(`Request ${request.id} rejected`);
    setStatus("rejected");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <Card className="w-full max-w-2xl p-6 space-y-6 rounded-2xl shadow-md bg-white">
        <h1 className="text-2xl font-semibold text-gray-900">Request Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Request ID</p>
            <p className="font-medium">{request.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Requested By</p>
            <p className="font-medium">{request.requestedBy}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Service</p>
            <p className="font-medium">{request.service}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Department</p>
            <p className="font-medium">{request.department}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm">Purpose</p>
            <p className="font-medium">{request.purpose}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Priority</p>
            <p className="font-medium">{request.priority}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Requested Date</p>
            <p className="font-medium">{new Date(request.requestedDate).toLocaleDateString()}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm">Assigned To</p>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Charlie">Charlie</SelectItem>
                <SelectItem value="Alice">Alice</SelectItem>
                <SelectItem value="Bob">Bob</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm">Status</p>
            <p
              className={`font-medium capitalize ${
                status === "rejected"
                  ? "text-red-500"
                  : status === "approved"
                  ? "text-green-600"
                  : "text-gray-700"
              }`}
            >
              {status}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="destructive" onClick={handleReject}>
            Reject
          </Button>
          <Button onClick={handleAssign}>Assign</Button>
        </div>
      </Card>
    </div>
  );
}
