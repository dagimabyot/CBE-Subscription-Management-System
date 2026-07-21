import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  Users,
  LayoutDashboard,
  Settings,
  HelpCircle,
  File,
  CreditCard,
  Smartphone,
  BarChart2,
  ChevronDown,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import clsx from "clsx";
import { useAuthUser } from "@/hooks/useAuthUser";

interface MenuItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "Service Requests",
    icon: FileText,
    children: [
      { title: "New Service Request", url: "/dashboard/requests" },
      { title: "Upgrade/Downgrade Service", url: "/dashboard/upgrade-downgrade" },
      { title: "Terminate Service", url: "/dashboard/requests/terminate" },
      { title: "Services", url: "/dashboard/services" },
      { title: "Request History", url: "/requests/history" },
      { title: "My Requests", url: "/dashboard/user/myrequest" },
      { title: "My Subscriptions", url: "/dashboard/user/my-subs" },
      { title: "Bulk Import", url: "/dashboard/bulk-import" },
      { title: "My Approvals", url: "/dashboard/my-approvals" },
      { title: "Assigned to Me", url: "/dashboard/my-assigned" },
    ],
  },
  {
    title: "Approvals & Authorizations",
    icon: Users,
    children: [
      { title: "My Pending Approvals", url: "/approvals/pending" },
      { title: "Approval History", url: "/approvals/history" },
      { title: "High-Value Payment Authorizations", url: "/approvals/high-value" },
    ],
  },
  {
    title: "Contracts & Documentation",
    icon: File,
    children: [
      { title: "Contracts with Ethio Telecom", url: "/contracts" },
      { title: "Service Agreements", url: "/agreements" },
      { title: "Download Templates", url: "/templates" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    children: [
      { title: "Initiate Payment Memo", url: "/payments/initiate" },
      { title: "Verify Payments", url: "/payments/verify" },
      { title: "Payment Processing", url: "/payments/processing" },
      { title: "Send Payment to Ethio Telecom", url: "/payments/send" },
      { title: "Settlement Processing", url: "/payments/settlement" },
      { title: "Payment History", url: "/payments/history" },
    ],
  },
  {
    title: "Device & SIM Management",
    icon: Smartphone,
    children: [
      { title: "Device Handover/Takeover", url: "/devices/handover" },
      { title: "Replacement Tracking", url: "/devices/replacement" },
      { title: "SIM Card Assignments", url: "/devices/sims" },
      { title: "Decommissioned Devices List", url: "/devices/decommissioned" },
    ],
  },
  {
    title: "Reports & Analytics",
    icon: BarChart2,
    children: [
      { title: "Subscription Reports", url: "/reports/subscriptions" },
      { title: "Payment Reports", url: "/reports/payments" },
      { title: "Monthly Billing Reports", url: "/reports/billing" },
      { title: "Service Distribution Map", url: "/reports/distribution" },
    ],
  },
  {
    title: "Administration",
    icon: Settings,
    children: [
      { title: "User Management", url: "/admin/users" },
      { title: "Approval Workflow Configuration", url: "/admin/workflow" },
      { title: "System Settings", url: "/admin/settings" },
      { title: "Guidelines & Procedures", url: "/admin/guidelines" },
    ],
  },
  {
    title: "Support",
    icon: HelpCircle,
    children: [
      { title: "Help & FAQs", url: "/support/help" },
      { title: "Contact Support Team", url: "/support/contact" },
      { title: "Activity Logs", url: "/support/logs" },
    ],
  },
];

export function AppSidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { user } = useAuthUser();
  const location = useLocation();

  // Auto-open menu items based on current route
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) =>
          location.pathname.includes(child.url || "")
        );
        if (hasActiveChild && !openMenus.includes(item.title)) {
          setOpenMenus((prev) => [...prev, item.title]);
        }
      }
    });
  }, [location.pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon" className="bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700">
      {/* HEADER */}
      <SidebarHeader className="px-4 py-4 border-b border-slate-700 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">CBE</span>
          <span className="text-xs text-slate-400 ml-1">Management</span>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="space-y-1">
          <SidebarMenu>
            {menuItems.map((item) => {
              const isOpen = openMenus.includes(item.title);
              const hasActiveChild = item.children?.some((child) =>
                location.pathname.includes(child.url || "")
              );

              return (
                <div key={item.title} className="space-y-0.5">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild={item.url && !item.children ? true : false}
                      onClick={() => item.children && toggleMenu(item.title)}
                      className={clsx(
                        "relative group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 overflow-hidden",
                        item.url && !item.children
                          ? "text-slate-300 hover:text-white hover:bg-slate-700"
                          : item.children
                          ? clsx(
                              "text-slate-300 hover:text-white cursor-pointer",
                              hasActiveChild && "bg-slate-700 text-white"
                            )
                          : "text-slate-300 hover:text-white hover:bg-slate-700"
                      )}
                    >
                      {item.url && !item.children ? (
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            clsx(
                              "flex items-center gap-3 w-full",
                              isActive && "text-white"
                            )
                          }
                        >
                          {item.icon && (
                            <item.icon size={20} className="flex-shrink-0" />
                          )}
                          <span>{item.title}</span>
                        </NavLink>
                      ) : (
                        <div className="flex items-center gap-3 w-full">
                          {item.icon && (
                            <item.icon size={20} className="flex-shrink-0" />
                          )}
                          <span className="flex-1">{item.title}</span>
                          {item.children && (
                            <div
                              className={clsx(
                                "transition-transform duration-300",
                                isOpen && "rotate-180"
                              )}
                            >
                              <ChevronDown size={16} />
                            </div>
                          )}
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* SUBMENU */}
                  {item.children && (
                    <div
                      className={clsx(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="pl-3 pr-2 py-1 space-y-1 border-l border-slate-700 ml-2">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.title}
                            to={child.url || "#"}
                            className={({ isActive }) =>
                              clsx(
                                "block px-3 py-2 text-xs font-medium rounded-md transition-all duration-200",
                                isActive
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                              )
                            }
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="px-2 py-3 border-t border-slate-700">
        <NavUser
          user={{
            name: user ? `${user.firstName} ${user.lastName}` : "Guest User",
            email: user ? user.email : "user@ethiotelecom.et",
            avatar: "/avatar.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
