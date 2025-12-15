import SubscriptionTable from "./components/SubscriptionTable";

const subscriptions = [
  {
    id: "sub-1",
    createdFrom: "req-3",
    serviceId: "svc-4",
    activatedAt: "2025-08-05T10:00:00Z",
    terminatedAt: "2026-08-05T10:00:00Z",
    isReplacedById: "sub-2",
  },
  {
    id: "sub-2",
    createdFrom: "req-5",
    serviceId: "svc-7",
    activatedAt: "2025-09-01T10:00:00Z",
    terminatedAt: "",
    isReplacedById: "",
  },
];

export default function SubscriptionPage() {
  return (
    <div className="p-6">
      <SubscriptionTable data={subscriptions} />
    </div>
  );
}
