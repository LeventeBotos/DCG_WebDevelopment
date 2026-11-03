"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  ChevronsUpDown,
  History,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Settings,
  Sun,
  Trash2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { signOutEverywhereAction } from "@/app/admin/(panel)/actions";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; badge?: number; ownerOnly?: boolean };

export default function AdminShell({
  admin,
  counts,
  children,
}: {
  admin: { email: string; role: "owner" | "editor" };
  counts: { applications: number; messages: number };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(false);

  // Dark mode lives on <html> so Radix portals (menus, dialogs) inherit it; removed again on leaving /admin.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("dcg_admin_theme");
      if (stored === "dark") setDark(true);
    } catch {}
    return () => document.documentElement.classList.remove("dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      window.localStorage.setItem("dcg_admin_theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  const nav: { label: string; items: NavItem[] }[] = [
    {
      label: "Overview",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Manage",
      items: [
        { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
        { href: "/admin/applications", label: "Applications", icon: Inbox, badge: counts.applications },
        { href: "/admin/messages", label: "Messages", icon: Mail, badge: counts.messages },
      ],
    },
    {
      label: "System",
      items: [
        { href: "/admin/audit", label: "Audit log", icon: History },
        { href: "/admin/trash", label: "Trash", icon: Trash2, ownerOnly: true },
        { href: "/admin/settings", label: "Settings", icon: Settings, ownerOnly: true },
      ],
    },
  ];

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function signOutAdmin() {
    await fetch("/api/admin/session", { method: "DELETE" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/admin">
                
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-semibold">DCG Admin</span>
                    <span className="truncate text-xs text-muted-foreground">Data Consulting Group</span>
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {nav.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items
                    .filter((item) => !item.ownerOnly || admin.role === "owner")
                    .map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                          <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                        {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold uppercase">
                      {admin.email.slice(0, 2)}
                    </span>
                    <span className="grid flex-1 text-left leading-tight">
                      <span className="truncate text-sm font-medium">{admin.email}</span>
                      <span className="truncate text-xs capitalize text-muted-foreground">{admin.role}</span>
                    </span>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
                    {admin.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setDark((d) => !d)}>
                    {dark ? <Sun className="mr-2 size-4" /> : <Moon className="mr-2 size-4" />}
                    {dark ? "Light mode" : "Dark mode"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={signOutAdmin}>
                    <LogOut className="mr-2 size-4" />
                    Sign out
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={async () => {
                      await signOutEverywhereAction();
                      router.replace("/admin/login");
                      router.refresh();
                    }}
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign out everywhere
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Button asChild variant="ghost" size="sm" showArrow={false} className="ml-auto">
            <Link href="/" target="_blank" rel="noreferrer">
              View site
            </Link>
          </Button>
        </header>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
