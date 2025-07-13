"use client"

import { Building2, Home, Package, BarChart3, Bell, Settings, LogOut, Plus, ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  userEmail: string
  onLogout: () => void
  notificationCount?: number
}

export function AppSidebar({ activeTab, setActiveTab, userEmail, onLogout, notificationCount = 0 }: AppSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },
  ]

  const getUserName = () => {
    return userEmail.split("@")[0].charAt(0).toUpperCase() + userEmail.split("@")[0].slice(1)
  }

  return (
    <Sidebar variant="floating" className="border-r-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl m-4">
      <SidebarHeader className="p-6 pb-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">DMS</h2>
            <p className="text-xs text-gray-500 font-medium">Inventory System</p>
          </div>
        </div>
        {/* User Profile Card */}
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white font-medium shadow-inner">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{getUserName()}</p>
              <p className="text-xs text-blue-100/90 truncate">Admin Account</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        {/* Quick Action Button */}
        <div className="mb-4 px-2">
          <Button
            onClick={() => setActiveTab("products")}
            className="w-full justify-between group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md rounded-lg"
            size="sm"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-80 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveTab(item.id)}
                  isActive={activeTab === item.id}
                  className={cn(
                    "w-full justify-start px-3 py-2.5 rounded-lg relative", // Changed justify-between to justify-start
                    "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    "data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600",
                    "data-[active=true]:font-medium transition-colors duration-200",
                    activeTab === item.id &&
                      "before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2/3 before:w-1 before:bg-blue-600 before:rounded-r-full", // Blue active indicator
                  )}
                >
                  <div
                    className={cn(
                      "p-1.5 rounded-lg",
                      activeTab === item.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 pt-2">
        <SidebarSeparator className="my-4 bg-gray-200" />
        {/* Footer Actions */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 relative text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">© {new Date().getFullYear()} DMS System</p>
          <p className="text-xs text-gray-400">v1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
