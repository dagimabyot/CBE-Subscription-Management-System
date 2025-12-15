// src/pages/RequestTerminationPage.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";

// -------------------
// Mock API
// -------------------
const mockServices = [
  { id: "1", name: "Mobile Plan", plan: "Gold", price: 50 },
  { id: "2", name: "Internet", plan: "Fiber 100Mbps", price: 70 },
  { id: "3", name: "TV Subscription", plan: "Premium", price: 30 },
];

const mockApi = {
  getServices: async () => {
    return new Promise<typeof mockServices>((resolve) => {
      setTimeout(() => resolve(mockServices), 2000);
    });
  },
  submitTermination: async (payload: {
    serviceId: string;
    reason: string;
    notes?: string;
  }) => {
    return new Promise((resolve) => {
      console.log("Mock termination submitted:", payload);
      setTimeout(() => resolve({ success: true }), 3000); 
    });
  },
};

// -------------------
// Types
// -------------------
interface Service {
  id: string;
  name: string;
  plan: string;
  price: number;
}

// -------------------
// Component
// -------------------
export default function RequestTermination() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  // Query: fetch services
  const { data: services, isLoading: loadingServices } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: () => mockApi.getServices(),
  });

  // Mutation: submit termination
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: {
      serviceId: string;
      reason: string;
      notes?: string;
    }) => mockApi.submitTermination(payload),
    onSuccess: () => {
      alert("✅ Your termination request has been submitted (mock).");
      setSelectedService(null);
      setReason("");
      setNotes("");
    },
    onError: () => {
      alert("❌ Failed to submit request. Try again.");
    },
  });

  if (loadingServices) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Request Service Termination
      </h1>
      <p className="text-gray-500 text-sm">
        Select a service you want to terminate and provide a reason.
      </p>

      {/* Step 1: Select Service */}
      <Card>
        <CardHeader>
          <CardTitle>Select Service</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedService?.id ?? ""}
            onChange={(e) => {
              const service =
                services?.find((s) => s.id === e.target.value) || null;
              setSelectedService(service);
            }}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Select a Service --</option>
            {services?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.plan} - ${s.price}/mo)
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Step 2: Reason */}
      {selectedService && (
        <Card>
          <CardHeader>
            <CardTitle>Reason for Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">-- Select a Reason --</option>
              <option value="moving">Relocation / Moving</option>
              <option value="cost">Too Expensive</option>
              <option value="quality">Service Quality Issues</option>
              <option value="alternative">Switched to Another Provider</option>
              <option value="other">Other</option>
            </select>

            <Textarea
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNotes(e.target.value)
              }
              placeholder="Additional comments (optional)"
            />
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {selectedService && reason && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-600 text-sm font-medium">
              ⚠ This action may be irreversible. Once submitted, your request
              will be reviewed before final termination.
            </p>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Service</p>
                <p className="font-medium">{selectedService.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Reason</p>
                <p className="font-medium">{reason}</p>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() =>
                mutate({
                  serviceId: selectedService.id,
                  reason,
                  notes,
                })
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              Submit Termination Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
