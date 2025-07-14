"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { Suspense } from "react"
import { DashboardContext, type DashboardContextType, type Product } from "./dashboard-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/")
      return
    }

    // Extract email from token
    try {
      const decoded = atob(token)
      const email = decoded.split(":")[0]
      setUserEmail(email)
    } catch (error) {
      console.error("Error decoding token:", error)
    }

    fetchProducts()
  }, [router])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      const data = await response.json()

      if (response.ok) {
        setProducts(data.products)
        toast({
          title: "Success",
          description: `Loaded ${data.products.length} products`,
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch products",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Something went wrong while fetching products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  const handleNavigate = (tab: string) => {
    switch (tab) {
      case "dashboard":
        router.push("/dashboard")
        break
      case "products":
        router.push("/dashboard/products")
        break
      case "analytics":
        router.push("/dashboard/analyze")
        break
      default:
        router.push("/dashboard")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const contextValue: DashboardContextType = {
    products,
    loading,
    userEmail,
    fetchProducts,
  }

  return (
    <DashboardContext.Provider value={contextValue}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-100 p-4">
          <AppSidebar userEmail={userEmail} onLogout={handleLogout} onNavigate={handleNavigate} />
          <SidebarInset className="flex-1 ml-4 rounded-xl shadow-lg bg-white overflow-hidden">
            {/* Header */}
            <Suspense fallback={<div>Loading...</div>}>
              <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="md:hidden" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm hidden md:block">Manage your inventory system</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-gray-100">
                    <Search className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 relative rounded-full hover:bg-gray-100">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                  </Button>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm font-medium overflow-hidden">
                    <Image
                      src="/user.png"
                      alt="User Avatar"
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </header>
            </Suspense>

            {/* Main Content */}
            <main className="flex-1 p-2 overflow-auto">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </DashboardContext.Provider>
  )
}
