"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface UploadDocumentFormProps {
  requestId: string;
  onUploadSuccess?: () => void;
}

const documentEndpoints: Record<string, string> = {
  "Payment Instruction Memo": "/api/upload/payment-instruction",
  "Request Letter": "/api/upload/request-letter",
  "Commercial Offer": "/api/upload/commercial-offer",
  "Payment Receipt": "/api/upload/payment-receipt",
  "Contract Agreement": "/api/upload/contract-agreement",
  "Settlement": "/api/upload/settlement",
  "Confirmation Letter": "/api/upload/confirmation-letter",
};

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

export default function UploadDocumentForm({ requestId, onUploadSuccess }: UploadDocumentFormProps) {
  const [documentType, setDocumentType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!allowedFileTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type! Only PDF, DOC/DOCX, JPG/PNG allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!documentType) {
      toast.error("Please select a document type.");
      return;
    }
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Conditional validation for Contract Agreement
    if (documentType === "Contract Agreement") {
      if (!startDate || !endDate) {
        toast.error("Please select both start and end dates.");
        return;
      }
      if (new Date(startDate) > new Date(endDate)) {
        toast.error("Start date cannot be after end date.");
        return;
      }
    }

    const endpoint = documentEndpoints[documentType];
    if (!endpoint) {
      toast.error("Invalid document type.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("requestId", requestId);
    formData.append("documentType", documentType);

    if (documentType === "Contract Agreement") {
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
    }

    try {
      setLoading(true);
      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Document uploaded successfully!");
      setFile(null);
      setDocumentType("");
      setStartDate("");
      setEndDate("");
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-white space-y-4 w-full max-w-md">
      <h3 className="text-lg font-semibold">Upload Document</h3>
      <div className="space-y-3">
        {/* Document Type */}
        <div>
          <Label>Document Type</Label>
          <select
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select document type</option>
            {Object.keys(documentEndpoints).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* File Input */}
        <div>
          <Label>File</Label>
          <Input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange} />
        </div>

        {/* Conditional Contract Agreement Dates */}
        {documentType === "Contract Agreement" && (
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        )}

        <Button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </Card>
  );
}
