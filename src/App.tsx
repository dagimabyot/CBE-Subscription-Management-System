// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import RequestsPage from "./pages/RequestsPage";
import BillsPage from "./pages/BillsPage";
import Dashboard from "./pages/Dashboard";
import RequestsUpgradeDowngradePage from "./pages/RequestUpgradeDowngradePage";
import RequestTermination from "./pages/RequestTermination";
import ServicesPage from "./pages/servicePages";
import NotificationsPage from "./pages/NotificationsPage";
import { DashboardUser } from "./pages/User/dashboard/DashboardPage";
import MyRequests from "./pages/User/dashboard/MyRequests";

import BulkImportPage from "./pages/User/dashboard/BulkImportPage";
import SubscriptionPage from "./pages/User/dashboard/MySubscriptions";
import MyApprovals from "./pages/User/dashboard/MyApprovals";
import { Toaster } from "sonner";
import RequestDetailsPage from "./pages/User/dashboard/components/RequestDetailsPage";
import MyAssignedRequests from "./pages/User/dashboard/MyAssignedRequests";
import ApprovalsPage from "./pages/ApprovalsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ReportsPage from "./pages/ReportsPage";
import ContractsPage from "./pages/ContractsPage";
import DevicesPage from "./pages/DevicesPage";
import AdminPage from "./pages/AdminPage";
import SupportPage from "./pages/SupportPage";

function App() {
  return (
    <>
      <Toaster />

    
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="user/dashboard" element={<DashboardUser/>} />
        <Route path="user/myrequest" element={<MyRequests/>} />
        <Route path="user/my-subs" element={<SubscriptionPage/>} />
        <Route path="bulk-import" element={<BulkImportPage/>} />
        <Route path="my-approvals" element={<MyApprovals />} />
        <Route path="my-assigned" element={<MyAssignedRequests />} />
         <Route path="requests/:id" element={<RequestDetailsPage />} />
        
        <Route path="bills" element={<BillsPage />} />
        <Route
          path="upgrade-downgrade"
          element={<RequestsUpgradeDowngradePage />}
        />
        <Route path="requests/terminate" element={<RequestTermination />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />

        {/* Approvals & Authorizations */}
        <Route path="approvals/pending" element={<ApprovalsPage />} />
        <Route path="approvals/history" element={<ApprovalsPage />} />
        <Route path="approvals/high-value" element={<ApprovalsPage />} />

        {/* Contracts & Documentation */}
        <Route path="contracts" element={<ContractsPage />} />
        <Route path="agreements" element={<ContractsPage />} />
        <Route path="templates" element={<ContractsPage />} />

        {/* Payments */}
        <Route path="payments/initiate" element={<PaymentsPage />} />
        <Route path="payments/verify" element={<PaymentsPage />} />
        <Route path="payments/processing" element={<PaymentsPage />} />
        <Route path="payments/send" element={<PaymentsPage />} />
        <Route path="payments/settlement" element={<PaymentsPage />} />
        <Route path="payments/history" element={<PaymentsPage />} />

        {/* Device & SIM Management */}
        <Route path="devices/handover" element={<DevicesPage />} />
        <Route path="devices/replacement" element={<DevicesPage />} />
        <Route path="devices/sims" element={<DevicesPage />} />
        <Route path="devices/decommissioned" element={<DevicesPage />} />

        {/* Reports & Analytics */}
        <Route path="reports/subscriptions" element={<ReportsPage />} />
        <Route path="reports/payments" element={<ReportsPage />} />
        <Route path="reports/billing" element={<ReportsPage />} />
        <Route path="reports/distribution" element={<ReportsPage />} />

        {/* Administration */}
        <Route path="admin/users" element={<AdminPage />} />
        <Route path="admin/workflow" element={<AdminPage />} />
        <Route path="admin/settings" element={<AdminPage />} />
        <Route path="admin/guidelines" element={<AdminPage />} />

        {/* Support */}
        <Route path="support/help" element={<SupportPage />} />
        <Route path="support/contact" element={<SupportPage />} />
        <Route path="support/logs" element={<SupportPage />} />
      </Route>
      
    </Routes></>
  
  );
}

export default App;
