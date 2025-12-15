"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Subscription = {
  id: string;
  createdFrom: string;
  serviceId: string;
  activatedAt: string;
  terminatedAt: string;
  isReplacedById: string;
};

type Props = {
  data: Subscription[];
};

export default function SubscriptionTable({ data }: Props) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((sub) =>
    Object.values(sub)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Subscriptions</h2>
        <Input
          placeholder="Search subscriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">Created From (Request)</th>
              <th className="p-3 font-medium">Service ID</th>
              <th className="p-3 font-medium">Activated At</th>
              <th className="p-3 font-medium">Terminated At</th>
              <th className="p-3 font-medium">Replaced By</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{sub.id}</td>
                  <td className="p-3">{sub.createdFrom}</td>
                  <td className="p-3">{sub.serviceId}</td>
                  <td className="p-3">{formatDate(sub.activatedAt)}</td>
                  <td className="p-3">{formatDate(sub.terminatedAt)}</td>
                  <td className="p-3">
                    {sub.isReplacedById ? sub.isReplacedById : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
