import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export type Permission =
  | "view_dashboard"
  | "manage_users"
  | "manage_subscriptions"
  | "view_analytics"
  | "approve_requests"
  | "manage_billing"
  | "view_audit_logs"
  | "manage_roles";

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    "view_dashboard",
    "manage_users",
    "manage_subscriptions",
    "view_analytics",
    "view_audit_logs",
    "manage_roles",
    "approve_requests",
    "manage_billing",
  ],
  manager: [
    "view_dashboard",
    "manage_subscriptions",
    "approve_requests",
    "manage_billing",
    "view_analytics",
  ],
  officer: [
    "view_dashboard",
    "manage_subscriptions",
    "manage_billing",
  ],
  user: [
    "view_dashboard",
    "manage_billing",
  ],
};

export const usePermissions = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const hasPermission = (permission: Permission): boolean => {
    if (!user || !user.role) return false;

    for (const role of user.role) {
      const permissions = ROLE_PERMISSIONS[role] || [];
      if (permissions.includes(permission)) {
        return true;
      }
    }

    return false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((perm) => hasPermission(perm));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every((perm) => hasPermission(perm));
  };

  const userRoles = user?.role || [];

  const isAdmin = userRoles.includes("admin");
  const isManager = userRoles.includes("manager");
  const isOfficer = userRoles.includes("officer");
  const isUser = userRoles.includes("user");

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
    isManager,
    isOfficer,
    isUser,
    userRoles,
  };
};

export const getRoleBasedRedirectPath = (roles: string[]): string => {
  if (roles.includes("admin")) return "/admin/dashboard";
  if (roles.includes("manager")) return "/manager/dashboard";
  if (roles.includes("officer")) return "/officer/dashboard";
  return "/user/dashboard";
};
