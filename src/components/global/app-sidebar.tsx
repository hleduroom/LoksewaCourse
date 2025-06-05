import Link from "next/link";

import {
  ComputerIcon,
  FlagIcon,
  PersonStandingIcon,
  ShieldIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import SignoutButton from "./logout-button";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>PREP | ADMIN</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { name: "SERVICES", url: "/admin/services", icon: FlagIcon },
                { name: "COURSES", url: "/admin/courses", icon: ShieldIcon },
              ].map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={project.url}
                      className="flex items-center gap-2"
                    >
                      <project.icon />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Teachers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  name: "TEACHERS",
                  url: "/admin/teachers",
                  icon: ComputerIcon,
                },
              ].map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={project.url}
                      className="flex items-center gap-2"
                    >
                      <project.icon />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Students</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  name: "STUDENTS",
                  url: "/admin/students",
                  icon: PersonStandingIcon,
                },
              ].map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={project.url}
                      className="flex items-center gap-2"
                    >
                      <project.icon />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignoutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
