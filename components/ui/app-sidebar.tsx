"use client";

import * as React from "react";

import { NavDocuments } from "@/components/ui/nav-documents";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2, CommandIcon, Settings, TrendingUp } from "lucide-react";

const data = {
  documents: [
    {
      name: "Company",
      url: "/dashboard/company",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-2 p-2">
                <TrendingUp className="w-7 h-7 text-indigo-500" />
                <h1 className="text-xl font-bold tracking-wide">StockAI</h1>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavDocuments items={data.documents} />
      </SidebarContent>

      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
