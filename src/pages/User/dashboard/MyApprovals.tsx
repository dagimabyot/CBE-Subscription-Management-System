import RequestTableWithActions from "./components/RequestTableWithActions";

const requests = [
  {
    id: "req-3",
    requestedBy: "Charlie Brown",
    userId: "user-3",
    service: "VPN",
    serviceId: "svc-4",
    department: "IT",
    purpose: "Remote work setup",
    status: "approved",
    requestedDate: "2025-08-05T10:00:00Z",
    priority: "Medium",
    assignedTo: "Charlie",
    rejectionReason: "",
    amendmentNote: "",
  },
  {
    id: "req-4",
    requestedBy: "Alice Smith",
    userId: "user-4",
    service: "Email",
    serviceId: "svc-5",
    department: "IT",
    purpose: "Email account setup",
    status: "pending",
    requestedDate: "2025-08-10T10:00:00Z",
    priority: "High",
    assignedTo: "",
    rejectionReason: "",
    amendmentNote: "",
  },
];

export default function MyApprovals () {
  return (
    <div className="p-6">
      <RequestTableWithActions data={requests} />
    </div>
  );
}
