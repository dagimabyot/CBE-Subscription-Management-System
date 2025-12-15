"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export type Request = {
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

export function RequestForm({ onSubmit }: { onSubmit: (req: Request) => void }) {
  const [form, setForm] = useState<Omit<Request, "id" | "requestedDate">>({
    requestedBy: "",
    service: "",
    department: "",
    purpose: "",
    status: "pending",
    priority: "Medium",
    assignedTo: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.requestedBy || !form.service || !form.department || !form.purpose) return;

    onSubmit({
      id: `req-${Date.now()}`,
      ...form,
      requestedDate: new Date().toISOString(),
    });

    // reset form
    setForm({
      requestedBy: "",
      service: "",
      department: "",
      purpose: "",
      status: "pending",
      priority: "Medium",
      assignedTo: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Requested By</Label>
        <Input
          placeholder="Enter requester's name"
          value={form.requestedBy}
          onChange={(e) => handleChange("requestedBy", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Service</Label>
        <Input
          placeholder="Enter service (e.g., VPN, Email)"
          value={form.service}
          onChange={(e) => handleChange("service", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Department</Label>
        <Input
          placeholder="Enter department"
          value={form.department}
          onChange={(e) => handleChange("department", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Purpose</Label>
        <Input
          placeholder="Enter purpose"
          value={form.purpose}
          onChange={(e) => handleChange("purpose", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Priority</Label>
        <Select
          defaultValue={form.priority}
          onValueChange={(val) => handleChange("priority", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

     

      <DialogFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit Request
        </Button>
      </DialogFooter>
    </div>
  );
}
