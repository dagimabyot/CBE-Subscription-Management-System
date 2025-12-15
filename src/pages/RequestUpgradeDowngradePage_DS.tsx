// src/pages/RequestsUpgradeDowngradePage.tsx
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Paperclip,
  Percent,
  ShieldAlert,
} from "lucide-react";

// -------------------------------
// Types & Constants
// -------------------------------
type ServiceType =
  | "Internet_3G4G"
  | "Fixed_Data_Line"
  | "VSAT"
  | "VPN"
  | "POS_M2M"
  | "Backup"
  | "DataCenter_Line";

type ChangeType = "Upgrade" | "Downgrade";
type Priority = "Low" | "Medium" | "High" | "Urgent";

type Plan = {
  id: string;
  label: string;
  bandwidthMbps?: number;
  capGB?: number;
  priceETB: number; // monthly
};

type Catalog = Record<ServiceType, Plan[]>;

const planCatalog: Catalog = {
  Internet_3G4G: [
    { id: "3g4g-s", label: "Data SIM — 5GB", capGB: 5, priceETB: 300 },
    { id: "3g4g-m", label: "Data SIM — 20GB", capGB: 20, priceETB: 900 },
    { id: "3g4g-l", label: "Data SIM — 50GB", capGB: 50, priceETB: 1800 },
  ],
  Fixed_Data_Line: [
    { id: "fd-10", label: "10 Mbps", bandwidthMbps: 10, priceETB: 2500 },
    { id: "fd-30", label: "30 Mbps", bandwidthMbps: 30, priceETB: 5200 },
    { id: "fd-60", label: "60 Mbps", bandwidthMbps: 60, priceETB: 9800 },
  ],
  VSAT: [
    { id: "vsat-4", label: "VSAT 4 Mbps", bandwidthMbps: 4, priceETB: 25000 },
    { id: "vsat-8", label: "VSAT 8 Mbps", bandwidthMbps: 8, priceETB: 42000 },
  ],
  VPN: [
    { id: "vpn-basic", label: "Site-to-Site (per site)", priceETB: 1500 },
    { id: "vpn-adv", label: "Advanced (per site)", priceETB: 2800 },
  ],
  POS_M2M: [
    { id: "pos-50mb", label: "M2M SIM 50MB", capGB: 0.05, priceETB: 80 },
    { id: "pos-200mb", label: "M2M SIM 200MB", capGB: 0.2, priceETB: 220 },
  ],
  Backup: [
    {
      id: "bkp-10",
      label: "Backup Link 10 Mbps",
      bandwidthMbps: 10,
      priceETB: 1800,
    },
    {
      id: "bkp-20",
      label: "Backup Link 20 Mbps",
      bandwidthMbps: 20,
      priceETB: 3200,
    },
  ],
  DataCenter_Line: [
    {
      id: "dc-100",
      label: "DC Line 100 Mbps",
      bandwidthMbps: 100,
      priceETB: 15000,
    },
    {
      id: "dc-500",
      label: "DC Line 500 Mbps",
      bandwidthMbps: 500,
      priceETB: 60000,
    },
  ],
};

const districts = ["Addis Ababa", "Dire Dawa", "Hawassa", "Bahir Dar"];
const branchesByDistrict: Record<string, string[]> = {
  "Addis Ababa": ["Head Office", "Bole", "Piassa", "Sarbet"],
  "Dire Dawa": ["DD Main", "Kezira"],
  Hawassa: ["HW Central", "Tabor"],
  "Bahir Dar": ["BD Main", "Belay Zeleke"],
};

// -------------------------------
// Helpers
// -------------------------------
const formatETB = (n: number) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(n);

const computeApprovalPath = (estimatedTotalETB: number) => {
  if (estimatedTotalETB > 101_000_000)
    return "VP Facility Management + Director Administration & Logistics (Above ETB 101M)";
  if (estimatedTotalETB >= 501_000)
    return "Director Administration & Logistics + Manager Subscription & GYM (ETB 501k – 100M)";
  if (estimatedTotalETB >= 101_000)
    return "Manager Subscription & GYM + Team Leader (ETB 101k – 500k)";
  return "Team Leader + Senior Banking Operation Officer (≤ ETB 100k)";
};

const isEndOfMonthBlackout = (date: string) => {
  if (!date) return false;
  const d = new Date(date);
  const day = d.getDate();
  return day >= 27; // heuristic
};

// -------------------------------
// Component
// -------------------------------
const RequestsUpgradeDowngradePage: React.FC = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [ackRisk, setAckRisk] = useState(false);

  const [data, setData] = useState({
    changeType: "Upgrade" as ChangeType,
    serviceType: "" as ServiceType | "",
    currentPlanId: "",
    newPlanId: "",
    quantity: 1,
    priority: "Medium" as Priority,
    requestingDept: "",
    requestedBy: "",
    requestedFor: "",
    district: "",
    branch: "",
    siteCodes: "", // for VPN multiple sites or any multi-site change; CSV or newline
    msisdnOrCircuitId: "",
    deviceId: "",
    justification: "",
    notesToProvider: "",
    oneOffFees: 0,
    contractMonths: 12,
    temporary: false,
    tempStart: "",
    tempEnd: "",
    maintStart: "",
    maintEnd: "",
    customCurrentPlan: "",
    customNewPlan: "",
    // ...existing code...
  });

  const plans = useMemo<Plan[]>(
    () => (data.serviceType ? planCatalog[data.serviceType] : []),
    [data.serviceType]
  );

  // Helper to check if "Other" is selected
  const isCurrentOther = data.currentPlanId === "other";
  const isNewOther = data.newPlanId === "other";

  const currentPlanPrice = useMemo(
    () => plans.find((p) => p.id === data.currentPlanId)?.priceETB ?? 0,
    [plans, data.currentPlanId]
  );
  const newPlanPrice = useMemo(
    () => plans.find((p) => p.id === data.newPlanId)?.priceETB ?? 0,
    [plans, data.newPlanId]
  );

  const monthlyDelta = useMemo(() => {
    const delta = (newPlanPrice - currentPlanPrice) * (data.quantity || 1);
    return data.changeType === "Downgrade"
      ? Math.min(delta, 0)
      : Math.max(delta, 0);
  }, [newPlanPrice, currentPlanPrice, data.quantity, data.changeType]);

  const estimatedTotal = useMemo(() => {
    // total estimate: one-off + monthly delta over contract term (can be negative for downgrade)
    return data.oneOffFees + monthlyDelta * Math.max(data.contractMonths, 1);
  }, [data.oneOffFees, monthlyDelta, data.contractMonths]);

  const approvalPath = useMemo(
    () => computeApprovalPath(Math.abs(estimatedTotal)),
    [estimatedTotal]
  );
  const blackoutWarning =
    isEndOfMonthBlackout(data.maintStart) ||
    isEndOfMonthBlackout(data.maintEnd);

  const errors = useMemo(() => {
    const e: string[] = [];
    if (!data.serviceType) e.push("Select a service type.");
    if (!data.changeType) e.push("Select change type.");
    if (!data.requestingDept) e.push("Requesting department is required.");
    if (!data.requestedBy) e.push("Requester name is required.");
    if (!data.currentPlanId) e.push("Select the current plan.");
    if (!data.newPlanId) e.push("Select the target plan.");
    if (!data.justification || data.justification.trim().length < 10)
      e.push("Provide a clear business justification (min 10 characters).");
    if (data.temporary) {
      if (!data.tempStart || !data.tempEnd)
        e.push("Temporary upgrade requires start and end dates.");
      if (
        data.tempStart &&
        data.tempEnd &&
        new Date(data.tempStart) >= new Date(data.tempEnd)
      )
        e.push("Temporary window: end date must be after start date.");
    }

    if (data.changeType === "Downgrade" && !ackRisk)
      e.push("Acknowledge risk for downgrades (service impact / SLA).");
    return e;
  }, [data, ackRisk]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAttachments(Array.from(e.target.files));
  };

  const update = <K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K]
  ) => setData((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.length) return;
    // TODO: Replace with actual API call
    console.log("SUBMIT UPGRADE/DOWNGRADE REQUEST", {
      data,
      attachments,
      monthlyDelta,
      estimatedTotal,
      approvalPath,
    });
    alert("Request submitted successfully (demo).");
  };

  // Derived branches list
  const branches = data.district ? branchesByDistrict[data.district] ?? [] : [];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-full">
      {/* Main */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Request: Upgrade / Downgrade
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Submit a request to change capacity, plan, or configuration for an
            existing telecom service.
          </p>
        </div>

        {/* Validation summary */}
        {errors.length > 0 && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800 text-sm flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            <div>
              <p className="font-medium">Please review the following:</p>
              <ul className="list-disc ml-5 mt-1 space-y-0.5">
                {errors.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-8"
        >
          {/* Section: Context */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Change Type
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.changeType}
                onChange={(e) =>
                  update("changeType", e.target.value as ChangeType)
                }
              >
                <option>Upgrade</option>
                <option>Downgrade</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Type
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.serviceType}
                onChange={(e) => {
                  update("serviceType", e.target.value as ServiceType);
                  update("currentPlanId", "");
                  update("newPlanId", "");
                }}
              >
                <option value="">Select service</option>
                <option value="Internet_3G4G">Internet — 3G/4G Data SIM</option>
                <option value="Fixed_Data_Line">Fixed Data Line</option>
                <option value="VSAT">VSAT</option>
                <option value="VPN">VPN</option>
                <option value="POS_M2M">POS / M2M SIM</option>
                <option value="Backup">Backup Link</option>
                <option value="DataCenter_Line">Data Center Line</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Requesting Department
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.requestingDept}
                onChange={(e) => update("requestingDept", e.target.value)}
                placeholder="e.g., Operations, IT Infrastructure"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Requested By
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={data.requestedBy}
                  onChange={(e) => update("requestedBy", e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Requested For
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={data.requestedFor}
                  onChange={(e) => update("requestedFor", e.target.value)}
                  placeholder="Unit/Branch or Person"
                />
              </div>
            </div>
          </section>

          {/* Section: Current vs Target */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-800 mb-3">
                Current Service
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700">Plan</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={data.currentPlanId}
                    onChange={(e) => update("currentPlanId", e.target.value)}
                    disabled={!data.serviceType}
                  >
                    <option value="">
                      {data.serviceType ? "Select..." : "Choose service first"}
                    </option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} · {formatETB(p.priceETB)}/mo
                      </option>
                    ))}
                  </select>
                  {isCurrentOther && (
                    <input
                      className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={data.customCurrentPlan}
                      onChange={(e) =>
                        update("customCurrentPlan", e.target.value)
                      }
                      placeholder="Enter custom current plan (name, price, etc.)"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-800 mb-3">
                Target Service
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700">Plan</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={data.newPlanId}
                    onChange={(e) => update("newPlanId", e.target.value)}
                    disabled={!data.serviceType}
                  >
                    <option value="">
                      {data.serviceType ? "Select..." : "Choose service first"}
                    </option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} · {formatETB(p.priceETB)}/mo
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {isNewOther && (
                    <input
                      className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={data.customNewPlan}
                      onChange={(e) => update("customNewPlan", e.target.value)}
                      placeholder="Enter custom target plan (name, price, etc.)"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* VPN / Multi-site details */}
          {data.serviceType === "VPN" && (
            <section className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Impacted Sites (codes / one per line)
              </label>
              <textarea
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.siteCodes}
                onChange={(e) => update("siteCodes", e.target.value)}
                placeholder="e.g., AA-HO-01&#10;AA-Bole-02&#10;DD-Main-03"
              />
              <p className="text-xs text-gray-500">
                For VPN changes, list all sites impacted for proper
                coordination.
              </p>
            </section>
          )}

          {/* Justification */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Business Justification
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={data.justification}
              onChange={(e) => update("justification", e.target.value)}
              placeholder="Why is this change needed? Expected benefits, risk/impact, and alternatives considered."
            />
          </section>

          {/* Priority & Notes */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.priority}
                onChange={(e) => update("priority", e.target.value as Priority)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes to Provider (optional)
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.notesToProvider}
                onChange={(e) => update("notesToProvider", e.target.value)}
                placeholder="Any special handling / reference numbers"
              />
            </div>
          </section>

          {/* Temporary upgrade */}
          <section className="rounded-lg border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-800">
                Temporary Upgrade
              </div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={data.temporary}
                  onChange={(e) => update("temporary", e.target.checked)}
                />
                <span className="text-gray-700">Enable</span>
              </label>
            </div>
            {data.temporary && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700">Start</label>
                  <input
                    type="datetime-local"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={data.tempStart}
                    onChange={(e) => update("tempStart", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">End</label>
                  <input
                    type="datetime-local"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={data.tempEnd}
                    onChange={(e) => update("tempEnd", e.target.value)}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Attachments */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm cursor-pointer hover:bg-gray-50">
                <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
                Add files
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={onFileChange}
                />
              </label>
              <span className="text-xs text-gray-500">
                {attachments.length} file(s) selected
              </span>
            </div>
            {attachments.length > 0 && (
              <ul className="text-xs text-gray-600 list-disc ml-4">
                {attachments.map((f, i) => (
                  <li key={i}>{f.name}</li>
                ))}
              </ul>
            )}
          </section>

          {/* Downgrade acknowledgement */}
          {data.changeType === "Downgrade" && (
            <section className="rounded-lg border border-red-200 bg-red-50 p-3">
              <label className="flex items-start gap-2 text-sm text-red-800">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4"
                  checked={ackRisk}
                  onChange={(e) => setAckRisk(e.target.checked)}
                />
                I acknowledge potential service impact/SLA changes due to
                downgrade and confirm rollback plan is acceptable.
              </label>
            </section>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => alert("Draft saved (demo).")}
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={errors.length > 0}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${
                errors.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Submit for Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestsUpgradeDowngradePage;
