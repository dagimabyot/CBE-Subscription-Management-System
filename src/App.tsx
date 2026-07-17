// App.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import OfficerDashboard from "./pages/Officer/OfficerDashboard";
import { Toaster } from "sonner";
import RequestDetailsPage from "./pages/User/dashboard/components/RequestDetailsPage";
import MyAssignedRequests from "./pages/User/dashboard/MyAssignedRequests";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <>
      <Toaster />

    
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      

      {/* Admin Routes */}
      <Route element={<RequireAuth allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Manager Routes */}
      <Route element={<RequireAuth allowedRoles={["manager"]} />}>
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Route>

      {/* Officer Routes */}
      <Route element={<RequireAuth allowedRoles={["officer"]} />}>
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
      </Route>

      {/* User Routes */}
      <Route element={<RequireAuth allowedRoles={["user"]} />}>
        <Route path="/user/dashboard" element={<DashboardUser />} />
      </Route>

      {/* Legacy Dashboard Routes */}
      <Route element={<RequireAuth allowedRoles={["manager"]} />}>
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
          <Route path="upgrade-downgrade" element={<RequestsUpgradeDowngradePage />} />
          <Route path="requests/terminate" element={<RequestTermination />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Route>
      
    </Routes></>
  
  );
}

export default App;
