import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, DollarSign, Star } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
  images: string[]
}

interface ProductsAnalyticsProps {
  products: Product[]
}

export function ProductsAnalytics({ products }: ProductsAnalyticsProps) {
  // Calculate analytics
  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const averageRating = products.reduce((sum, product) => sum + product.rating, 0) / products.length
  const lowStockProducts = products.filter((product) => product.stock < 10).length

  // Category distribution
  const categoryStats = products.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryData = Object.entries(categoryStats)
    .map(([category, count]) => ({
      category,
      count,
      percentage: (count / totalProducts) * 100,
    }))
    .sort((a, b) => b.count - a.count)

  // Price range distribution
  const priceRanges = [
    { range: "$0-$10", min: 0, max: 10 },
    { range: "$10-$50", min: 10, max: 50 },
    { range: "$50-$100", min: 50, max: 100 },
    { range: "$100-$500", min: 100, max: 500 },
    { range: "$500+", min: 500, max: Number.POSITIVE_INFINITY },
  ]

  const priceDistribution = priceRanges.map((range) => {
    const count = products.filter((p) => p.price >= range.min && p.price < range.max).length
    return {
      ...range,
      count,
      percentage: (count / totalProducts) * 100,
    }
  })

  // Top brands
  const brandStats = products.reduce(
    (acc, product) => {
      if (product.brand) {
        acc[product.brand] = (acc[product.brand] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const topBrands = Object.entries(brandStats)
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Rating distribution
  const ratingRanges = [
    { range: "4.5-5.0", min: 4.5, max: 5.0 },
    { range: "4.0-4.5", min: 4.0, max: 4.5 },
    { range: "3.5-4.0", min: 3.5, max: 4.0 },
    { range: "3.0-3.5", min: 3.0, max: 3.5 },
    { range: "0-3.0", min: 0, max: 3.0 },
  ]

  const ratingDistribution = ratingRanges.map((range) => {
    const count = products.filter((p) => p.rating >= range.min && p.rating < range.max).length
    return {
      ...range,
      count,
      percentage: (count / totalProducts) * 100,
    }
  })

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current stock value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Overall product rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Products with {"<"} 10 items</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Price Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
            <CardDescription>Products by price range</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {priceDistribution.map((item) => (
              <div key={item.range} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.range}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Brands */}
        <Card>
          <CardHeader>
            <CardTitle>Top Brands</CardTitle>
            <CardDescription>Most popular brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topBrands.map((brand, index) => (
                <div key={brand.brand} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <span className="font-medium">{brand.brand}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{brand.count} products</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Products by rating range</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ratingDistribution.map((item) => (
              <div key={item.range} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.range} ⭐</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
