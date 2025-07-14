"use client"

import { DashboardHome } from "@/components/dashboard/page"
import { useDashboard } from "./dashboard-context"

export default function DashboardPage() {
  const { products } = useDashboard()

  return <DashboardHome products={products} />
}
