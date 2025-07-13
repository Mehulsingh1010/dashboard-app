import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, DollarSign, Star, TrendingDown, AlertTriangle, Target, BarChart3 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts'
import { useState, useEffect } from 'react'

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

// Custom animated counter hook
const useAnimatedCounter = (endValue: number, duration: number = 1000) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * endValue))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [endValue, duration])
  
  return count
}

// Custom animated metric card
const AnimatedMetricCard = ({ title, value, icon: Icon, subtitle, trend, color = "text-blue-600" }: {
  title: string
  value: number
  icon: any
  subtitle: string
  trend?: { value: number; isPositive: boolean }
  color?: string
}) => {
  const animatedValue = useAnimatedCounter(value)
  
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 bg-gradient-to-br ${color === "text-red-600" ? "from-red-50 to-red-100" : color === "text-green-600" ? "from-green-50 to-green-100" : "from-blue-50 to-blue-100"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color === "text-red-600" ? "bg-red-100" : color === "text-green-600" ? "bg-green-100" : "bg-blue-100"} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className={`text-2xl font-bold ${color} mb-1`}>
          {title === "Total Inventory Value" ? `$${animatedValue.toLocaleString()}` : 
           title === "Average Rating" ? (animatedValue / 100).toFixed(2) : 
           animatedValue.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  )
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
      name: category,
      value: count,
      percentage: (count / totalProducts) * 100,
    }))
    .sort((a, b) => b.value - a.value)

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316']

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
      name: range.range,
      value: count,
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
    .map(([brand, count]) => ({ name: brand, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

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
      name: range.range,
      value: count,
      percentage: (count / totalProducts) * 100,
    }
  })

  // Stock vs Rating analysis
  const stockRatingData = products.map(product => ({
    name: product.title.substring(0, 15) + "...",
    stock: product.stock,
    rating: product.rating,
    price: product.price,
  })).slice(0, 10)

  // Monthly trends (simulated data)
  const monthlyTrends = [
    { month: 'Jan', products: 45, revenue: 12000, orders: 89 },
    { month: 'Feb', products: 52, revenue: 15000, orders: 112 },
    { month: 'Mar', products: 61, revenue: 18000, orders: 145 },
    { month: 'Apr', products: 58, revenue: 22000, orders: 167 },
    { month: 'May', products: 65, revenue: 25000, orders: 198 },
    { month: 'Jun', products: 72, revenue: 28000, orders: 234 },
  ]

  // Performance radar data
  const performanceData = [
    { subject: 'Quality', A: averageRating * 20, fullMark: 100 },
    { subject: 'Variety', A: (categoryData.length / 10) * 100, fullMark: 100 },
    { subject: 'Stock', A: ((totalProducts - lowStockProducts) / totalProducts) * 100, fullMark: 100 },
    { subject: 'Value', A: 85, fullMark: 100 },
    { subject: 'Brands', A: (topBrands.length / 20) * 100, fullMark: 100 },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedMetricCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          subtitle="Across all categories"
          trend={{ value: 12, isPositive: true }}
        />
        <AnimatedMetricCard
          title="Total Inventory Value"
          value={totalValue}
          icon={DollarSign}
          subtitle="Current stock value"
          trend={{ value: 8, isPositive: true }}
          color="text-green-600"
        />
        <AnimatedMetricCard
          title="Average Rating"
          value={averageRating * 100}
          icon={Star}
          subtitle="Overall product rating"
          trend={{ value: 3, isPositive: true }}
          color="text-blue-600"
        />
        <AnimatedMetricCard
          title="Low Stock Alert"
          value={lowStockProducts}
          icon={AlertTriangle}
          subtitle="Products with < 10 items"
          trend={{ value: 15, isPositive: false }}
          color="text-red-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Category Distribution
            </CardTitle>
            <CardDescription>Products by category with visual breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Distribution Bar Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Price Distribution
            </CardTitle>
            <CardDescription>Products by price range</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Simple Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Brands */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Brands</CardTitle>
            <CardDescription>Most popular brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topBrands.slice(0, 5).map((brand, index) => (
                <div key={brand.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                    <span className="font-medium">{brand.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{brand.value} products</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stock Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stock Status</CardTitle>
            <CardDescription>Inventory levels overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Well Stocked</span>
                <span className="text-sm text-green-600 font-semibold">
                  {totalProducts - lowStockProducts} products
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Low Stock</span>
                <span className="text-sm text-red-600 font-semibold">
                  {lowStockProducts} products
                </span>
              </div>
              <div className="pt-2">
                <Progress 
                  value={((totalProducts - lowStockProducts) / totalProducts) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {(((totalProducts - lowStockProducts) / totalProducts) * 100).toFixed(1)}% adequately stocked
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Insights</CardTitle>
            <CardDescription>Important highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 text-sm">Top Category</span>
                </div>
                <p className="text-sm text-blue-700">
                  {categoryData[0]?.name} ({categoryData[0]?.value} products)
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800 text-sm">Quality</span>
                </div>
                <p className="text-sm text-green-700">
                  {averageRating.toFixed(1)} avg rating across all products
                </p>
              </div>
              
              {lowStockProducts > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800 text-sm">Action Needed</span>
                  </div>
                  <p className="text-sm text-red-700">
                    {lowStockProducts} products need restocking
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}