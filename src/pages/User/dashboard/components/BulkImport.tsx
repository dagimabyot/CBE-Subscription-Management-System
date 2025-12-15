"use client";

import { useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, X } from "lucide-react";

type BulkImportProps = {
  onImport: (file: File) => void;
};

export default function BulkImport({ onImport }: BulkImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    if (!f.name.toLowerCase().endsWith(".csv")) {
      setError("Invalid file type. Only .csv files are allowed.");
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
      setFile(null);
    }
  };

  const handleSampleDownload = () => {
    const sample = `requestedBy,service,department,purpose,status,priority,assignedTo
John Doe,VPN,IT,Remote Work,approved,High,Alice`;
    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-6 rounded-2xl shadow-md bg-white">
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-gray-400 transition"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {!file ? (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-600">
              Drag & drop your <span className="font-medium">.csv</span> file here, 
              or click to select
            </p>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              id="file-upload"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
            <label
              htmlFor="file-upload"
              className="text-blue-600 text-sm cursor-pointer hover:underline"
            >
              Browse files
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <File className="h-5 w-5 text-gray-500" />
              <span className="text-sm">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFile(null)}
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mt-4 gap-3">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleSampleDownload}
        >
          Download Sample CSV
        </Button>

        <Button
          onClick={handleImport}
          disabled={!file}
          className="w-full sm:w-auto"
        >
          Import
        </Button>
      </div>
    </Card>
  );
}
