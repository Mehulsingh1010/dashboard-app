"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Package, BarChart3, Home } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
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

  return (
    <div className="w-64 bg-white shadow-lg border-r">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start mb-2",
                  activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700",
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
