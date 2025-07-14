"use client"

import { ProductsTable } from "@/components/dashboard/products-table"
import { useDashboard } from "../dashboard-context"

export default function ProductsPage() {
  const { products, fetchProducts } = useDashboard()

  return <ProductsTable products={products} onRefresh={fetchProducts} />
}
