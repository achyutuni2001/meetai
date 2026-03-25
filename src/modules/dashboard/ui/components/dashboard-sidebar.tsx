"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BotIcon,
  CalendarDaysIcon,
  VideoIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardUserButton } from "./dashboard-user-button";

const navItems = [
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: CalendarDaysIcon,
    label: "Calendar",
    href: "/calendar",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r-0 p-0">
      <SidebarHeader className="mx-2 mt-2 overflow-hidden rounded-[22px] border border-white/8 bg-sidebar px-2.5 py-2.5 text-sidebar-accent-foreground shadow-[0_10px_24px_rgba(8,25,62,0.18)] group-data-[collapsible=icon]:px-1.5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:hidden">
            <div className="flex size-9 items-center justify-center rounded-[18px] bg-white/10 ring-1 ring-white/10">
              <Image src="/logo.svg" height={20} width={20} alt="IntelliMeet" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-base font-semibold tracking-tight text-white">
                IntelliMeet
              </p>
              <p className="text-xs text-blue-100/70">
                Schedule, join, review
              </p>
            </div>
          </Link>
          <SidebarTrigger className="size-8 shrink-0 rounded-[18px] border border-white/10 bg-white/6 p-0 text-white hover:bg-white/12 hover:text-white group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10" />
        </div>
      </SidebarHeader>
      <div className="px-3 py-3">
        <Separator className="bg-white/8" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <p className="px-4 pb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-100/45 group-data-[collapsible=icon]:hidden">
            Navigation
          </p>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-11 rounded-[18px] border border-transparent px-3 text-sm text-blue-50/85 transition-all hover:bg-white/6 hover:text-white",
                      pathname === item.href && "border-white/8 bg-linear-to-r from-[#3f6cb4] to-[#35588e] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span className="font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
};
