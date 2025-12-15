import { NavLink } from "react-router-dom";
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
} from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
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
      {
        title: "Upgrade/Downgrade Service",
        url: "/dashboard/upgrade-downgrade",
      },
      { title: "Terminate Service", url: "/dashboard/requests/terminate" },
      { title: "Services", url: "/dashboard/services" },
      { title: "Request History", url: "/requests/history" },
      { title: "my requests", url: "/dashboard/user/myrequest" },
      { title: "My Subscriptions", url: "/dashboard/user/my-subs" },
      { title: "Bulk import", url: "/dashboard/bulk-import" },
      { title: "My Approvals", url: "/dashboard/my-approvals" },
      { title: "Assigned To Me", url: "/dashboard/my-assigned" },
    ],
  },
  {
    title: "Approvals & Authorizations",
    icon: Users,
    children: [
      { title: "My Pending Approvals", url: "/approvals/pending" },
      { title: "Approval History", url: "/approvals/history" },
      {
        title: "High-Value Payment Authorizations",
        url: "/approvals/high-value",
      },
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
  console.log( user);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon" className="bg-background border-r">
      {/* HEADER */}
      <SidebarHeader className="px-4 py-3 border-b flex items-center gap-3">
        <span className="text-sm font-semibold tracking-tight">CBE</span>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isOpen = openMenus.includes(item.title);
              return (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      onClick={() => item.children && toggleMenu(item.title)}
                      className={clsx(
                        "group flex items-center px-3 py-6 text-sm font-medium rounded-lg transition-colors",
                        item.url
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {item.icon && <item.icon size={18} />}
                        {item.url ? (
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              clsx(
                                "flex-1",
                                isActive
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground"
                              )
                            }
                          >
                            {item.title}
                          </NavLink>
                        ) : (
                          <span className="flex-1">{item.title}</span>
                        )}
                        {item.children &&
                          (isOpen ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          ))}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {item.children && (
                    <div
                      className={clsx(
                        "ml-6 overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-screen" : "max-h-0"
                      )}
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.title}
                          to={child.url || "#"}
                          className={({ isActive }) =>
                            clsx(
                              "block py-1.5 pl-6 pr-3 text-sm rounded-md transition-colors duration-200",
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser
          user={{
            name: user ? `${user.firstName} ${user.lastName}` : "Guest",
            email: user ? user.email : "",
            avatar: "/avatar.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
