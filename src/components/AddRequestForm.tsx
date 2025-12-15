// src/components/AddRequestForm.tsx
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addRequestAsync } from "@/features/requests/requestsSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServices } from "../hooks/useServices";  // <-- import your service hook
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddRequestForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: services, isLoading, isError } = useServices();

  const [formData, setFormData] = useState({
    id: "",
    requestedBy: "",
    service: "",
    purpose: "",
    status: "pending" as "pending" | "approved" | "rejected",
    requestedDate: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.requestedBy || !formData.service) {
      alert("Please fill in required fields");
      return;
    }

    dispatch(addRequestAsync(formData));
    setFormData({
      id: "",
      requestedBy: "",
      service: "",
      purpose: "",
      status: "pending",
      requestedDate: new Date().toISOString(),
    });
  };

  return (
    <Card className="p-6 space-y-4">
      <form id="request-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="id">Request ID</Label>
          <Input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requestedBy">Requested By</Label>
          <Input
            type="text"
            id="requestedBy"
            name="requestedBy"
            value={formData.requestedBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          {isLoading ? (
            <p>Loading services...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load services</p>
          ) : (
            <Select onValueChange={handleServiceChange} value={formData.service}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services?.map((service) => (
                  <SelectItem key={service.id} value={service.serviceType}>
                    {service.serviceType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </Card>
  );
}
