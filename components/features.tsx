import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, BarChart, Package, Users, Cloud } from "lucide-react"
import type React from "react"

// Light mode custom icons
export function LineGraph({ color = "#2563eb" }: { color?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 40 C 10 20, 20 30, 30 10 C 40 0, 50 20, 60 10 C 70 0, 80 30, 90 20 C 100 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function FeatureIconWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border border-blue-100">{children}</div>
}

export function FingerprintIconWithLine() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border border-blue-100">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="#cbd5e1" strokeWidth="2" />
      </svg>
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-fingerprint text-blue-600"
        >
          <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" />
          <path d="M12 14.5V17.5" />
          <path d="M12 10.5V12.5" />
          <path d="M12 6.5V8.5" />
          <path d="M15.5 11.5L17.5 13.5" />
          <path d="M8.5 11.5L6.5 13.5" />
          <path d="M15.5 15.5L17.5 17.5" />
          <path d="M8.5 15.5L6.5 17.5" />
          <path d="M15.5 7.5L17.5 9.5" />
          <path d="M8.5 7.5L6.5 9.5" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-blue-500 rounded-full" />
      </div>
    </div>
  )
}

export function FeaturesGrid() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Finance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the comprehensive tools that make financial management effortless and secure
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Dashboard Overview */}
          <Card className="bg-white border border-gray-200 p-8 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FeatureIconWrapper>
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
            </FeatureIconWrapper>
            <h3 className="text-xl font-bold mt-6 text-gray-900">Dashboard Overview</h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Get a comprehensive view of your financial data and key metrics at a glance.
            </p>
          </Card>

          {/* Card 2: Secure Authentication */}
          <Card className="bg-white border border-gray-200 p-8 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FingerprintIconWithLine />
            <h3 className="text-xl font-bold mt-6 text-gray-900">Secure Authentication</h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Advanced security with biometric and multi-factor authentication for complete protection.
            </p>
          </Card>

          {/* Card 3: Real-time Analytics */}
          <Card className="bg-white border border-gray-200 p-8 rounded-xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <BarChart className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Live Analytics</span>
              </div>
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
            <div className="h-16 mb-4">
              <LineGraph />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">Real-time Analytics</h3>
            <p className="text-gray-600 mt-3 text-sm text-center leading-relaxed">
              Track your financial performance with live data and interactive charts.
            </p>
          </Card>

          {/* Card 4: Portfolio Management */}
          <Card className="bg-white border border-gray-200 p-8 rounded-xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <FeatureIconWrapper>
                <Package className="w-8 h-8 text-blue-600" />
              </FeatureIconWrapper>
            </div>
            <div className="h-16 mb-4">
              <LineGraph color="#10b981" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">Portfolio Management</h3>
            <p className="text-gray-600 mt-3 text-sm text-center leading-relaxed">
              Effortlessly manage and optimize your investment portfolio with intelligent insights.
            </p>
          </Card>

          {/* Card 5: User Management */}
          <Card className="bg-white border border-gray-200 p-8 rounded-xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <FeatureIconWrapper>
                <Users className="w-8 h-8 text-blue-600" />
              </FeatureIconWrapper>
            </div>
            <div className="flex items-center justify-center mb-4 -space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback className="text-xs bg-blue-500 text-white">A</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Manager" />
                <AvatarFallback className="text-xs bg-green-500 text-white">M</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="text-xs bg-purple-500 text-white">U</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-center gap-4 mb-4 text-xs">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Admin</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Manager</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">User</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">User Management</h3>
            <p className="text-gray-600 mt-3 text-sm text-center leading-relaxed">
              Manage user accounts, roles, and permissions with granular control.
            </p>
          </Card>

          {/* Card 6: Scalable & Secure */}
          <Card className="bg-white border border-gray-200 p-8 rounded-xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FeatureIconWrapper>
              <Cloud className="w-8 h-8 text-blue-600" />
            </FeatureIconWrapper>
            <h3 className="text-xl font-bold mt-6 text-gray-900">Scalable & Secure</h3>
            <p className="text-gray-600 mt-3 text-sm text-center leading-relaxed">
              Built on enterprise-grade infrastructure that scales with your financial needs.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}