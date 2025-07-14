"use client"

import { ProductsAnalytics } from "@/components/dashboard/products-analytics"
import { useDashboard } from "../dashboard-context"

export default function AnalyzePage() {
  const { products } = useDashboard()

  return <ProductsAnalytics products={products} />
}
