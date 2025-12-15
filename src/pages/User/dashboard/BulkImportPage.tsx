"use client";

import BulkImport from "./components/BulkImport";

export default function BulkImportPage() {
  const handleBulkImport = (file: File) => {
    console.log("Imported CSV file:", file);
    // TODO: parse CSV & send to API
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Bulk Import Requests</h1>
          <p className="text-sm text-gray-600">
            Upload a <span className="font-medium">.csv</span> file to quickly import multiple requests.  
            You can also <span className="font-medium">download the sample CSV</span> to prepare your data.
          </p>
        </div>

        <BulkImport onImport={handleBulkImport} />
      </div>
    </div>
  );
}
