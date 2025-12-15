"use client";

import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import clsx from "clsx";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Navigation
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={clsx(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Link
                  to={item.url}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon && (
                    <item.icon
                      size={18}
                      className={clsx(
                        "transition-colors duration-200",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-accent-foreground"
                      )}
                    />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
