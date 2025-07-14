"use client"
import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Package,
  DollarSign,
  Star,
  TrendingDown,
  AlertTriangle,
  Target,
  Percent,
  LineChart,
  Tag,
  Building2,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Types
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

interface MetricCardProps {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  subtitle: string
  trend?: { value: number; isPositive: boolean }
  color?: string
}

interface ChartDataItem {
  name: string
  value: number
  percentage?: number
}

interface InsightCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  bgColor: string
  iconColor: string
  textColor: string
}

// Constants
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"]
const PRICE_RANGES = [
  { range: "$0-$10", min: 0, max: 10 },
  { range: "$10-$50", min: 10, max: 50 },
  { range: "$50-$100", min: 50, max: 100 },
  { range: "$100-$500", min: 100, max: 500 },
  { range: "$500+", min: 500, max: Number.POSITIVE_INFINITY },
]
const RATING_RANGES = [
  { range: "4.5-5.0", min: 4.5, max: 5.0 },
  { range: "4.0-4.5", min: 4.0, max: 4.5 },
  { range: "3.5-4.0", min: 3.5, max: 4.0 },
  { range: "3.0-3.5", min: 3.0, max: 3.5 },
  { range: "0-3.0", min: 0, max: 3.0 },
]
const MONTHLY_TRENDS = [
  { month: "Jan", products: 45, revenue: 12000, orders: 89 },
  { month: "Feb", products: 52, revenue: 15000, orders: 112 },
  { month: "Mar", products: 61, revenue: 18000, orders: 145 },
  { month: "Apr", products: 58, revenue: 22000, orders: 167 },
  { month: "May", products: 65, revenue: 25000, orders: 198 },
  { month: "Jun", products: 72, revenue: 28000, orders: 234 },
  { month: "Jul", products: 75, revenue: 31000, orders: 250 },
]

// Hooks
const useAnimatedCounter = (endValue: number, duration = 1000) => {
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

// Utility functions
const formatValue = (title: string, value: number) => {
  switch (title) {
    case "Total Inventory Value":
      return `$${value.toLocaleString()}`
    case "Average Rating":
      return (value / 100).toFixed(2)
    case "Average Discount":
      return `${(value / 100).toFixed(1)}%`
    default:
      return value.toLocaleString()
  }
}

const createDistributionData = (
  products: Product[],
  ranges: Array<{ range: string; min: number; max: number }>,
  valueKey: keyof Product,
) => {
  return ranges.map((range) => {
    const count = products.filter((p) => {
      const value = p[valueKey] as number
      return value >= range.min && value < range.max
    }).length
    return {
      name: range.range,
      value: count,
      percentage: (count / products.length) * 100,
    }
  })
}

const getColorClasses = (baseColor: string) => {
  const colorName = baseColor.split("-")[0].replace("text-", "")
  return {
    bgColorFrom: `from-${colorName}-50`,
    bgColorTo: `to-${colorName}-100`,
    iconBgColor: `bg-${colorName}-100`,
  }
}

// Components
const AnimatedMetricCard = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  color = "text-blue-600",
}: MetricCardProps) => {
  const animatedValue = useAnimatedCounter(value)
  const { bgColorFrom, bgColorTo, iconBgColor } = getColorClasses(color)
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgColorFrom} ${bgColorTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className={`text-2xl font-bold ${color} mb-1`}>{formatValue(title, animatedValue)}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const ChartCard = ({
  title,
  description,
  icon: Icon,
  iconColor,
  children,
  className = "",
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  children: React.ReactNode
  className?: string
}) => (
  <Card className={`hover:shadow-lg transition-shadow duration-300 ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const PieChartComponent = ({ data }: { data: ChartDataItem[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percentage }) => `${name} ${percentage?.toFixed(1)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        animationBegin={0}
        animationDuration={1000}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => [`${value} products`, "Count"]} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
)

const BarChartComponent = ({ data, color }: { data: ChartDataItem[]; color: string }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value: number) => [`${value} products`, "Count"]} />
      <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

const InsightCard = ({ icon: Icon, title, description, bgColor, iconColor, textColor }: InsightCardProps) => (
  <div className={`p-3 ${bgColor} rounded-lg`}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`h-4 w-4 ${iconColor}`} />
      <span className={`font-medium ${textColor} text-sm`}>{title}</span>
    </div>
    <p className={`text-sm ${textColor.replace("800", "700")}`}>{description}</p>
  </div>
)

export function ProductsAnalytics({ products }: ProductsAnalyticsProps) {
  // Memoized calculations
  const analytics = useMemo(() => {
    const totalProducts = products.length
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
    const averageRating = products.reduce((sum, product) => sum + product.rating, 0) / products.length
    const lowStockProducts = products.filter((product) => product.stock < 10) // Filter actual products
    const averageDiscount = products.reduce((sum, product) => sum + product.discountPercentage, 0) / products.length
    return {
      totalProducts,
      totalValue,
      averageRating,
      lowStockProducts, // Now an array of products
      averageDiscount,
    }
  }, [products])

  const chartData = useMemo(() => {
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
        percentage: (count / analytics.totalProducts) * 100,
      }))
      .sort((a, b) => b.value - a.value)

    // Brand statistics
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

    // Distribution data
    const priceDistribution = createDistributionData(products, PRICE_RANGES, "price")
    const ratingDistribution = createDistributionData(products, RATING_RANGES, "rating")

    // Performance radar data
    const performanceData = [
      { subject: "Quality", A: analytics.averageRating * 20, fullMark: 100 },
      { subject: "Variety", A: Math.min((categoryData.length / 10) * 100, 100), fullMark: 100 },
      {
        subject: "Stock Health",
        A: ((analytics.totalProducts - analytics.lowStockProducts.length) / analytics.totalProducts) * 100,
        fullMark: 100,
      },
      { subject: "Value for Money", A: Math.min((analytics.averageDiscount / 20) * 100, 100), fullMark: 100 },
      { subject: "Brand Diversity", A: Math.min((topBrands.length / 15) * 100, 100), fullMark: 100 },
    ]

    // Top Rated Products (top 5 with rating >= 4.5)
    const topRatedProducts = products
      .filter((p) => p.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5) // Limit to 5 items

    // Highly Discounted Products (top 5 with discount > 0)
    const highlyDiscountedProducts = products
      .filter((p) => p.discountPercentage > 0)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 5) // Limit to 5 items

    // Top Priced Products (top 5 most expensive)
    const topPricedProducts = products.sort((a, b) => b.price - a.price).slice(0, 5) // Limit to 5 items

    return {
      categoryData,
      topBrands,
      priceDistribution,
      ratingDistribution,
      performanceData,
      topRatedProducts,
      highlyDiscountedProducts,
      topPricedProducts, // Added top priced products
    }
  }, [products, analytics])

  const insights = useMemo(() => {
    const { categoryData } = chartData
    const { averageRating, lowStockProducts, averageDiscount } = analytics
    const newInsights: InsightCardProps[] = [] // Explicitly type the array [^1]

    if (categoryData.length > 0) {
      newInsights.push({
        icon: TrendingUp,
        title: "Top Category",
        description: `${categoryData[0]?.name} (${categoryData[0]?.value} products) is your leading category. Focus marketing efforts here.`,
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        textColor: "text-blue-800",
      })
    }
    if (averageRating > 0) {
      newInsights.push({
        icon: Star,
        title: "Quality Assurance",
        description: `Your products maintain a strong average rating of ${averageRating.toFixed(1)}. Leverage this in promotions.`,
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
        textColor: "text-green-800",
      })
    }
    if (lowStockProducts.length > 0) {
      newInsights.push({
        icon: AlertTriangle,
        title: "Action Needed: Low Stock",
        description: `${lowStockProducts.length} products are currently low on stock and require immediate attention to prevent lost sales.`,
        bgColor: "bg-red-50",
        iconColor: "text-red-600",
        textColor: "text-red-800",
      })
    }
    if (averageDiscount > 0) {
      newInsights.push({
        icon: Percent,
        title: "Discount Strategy",
        description: `An average discount of ${averageDiscount.toFixed(1)}% is applied across products. Review if this aligns with profit goals.`,
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        textColor: "text-purple-800",
      })
    }
    return newInsights
  }, [chartData, analytics])

  return (
    <div className="container mx-auto py-4 px-4">
     

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatedMetricCard
          title="Total Products"
          value={analytics.totalProducts}
          icon={Package}
          subtitle="Across all categories"
          trend={{ value: 12, isPositive: true }}
        />
        <AnimatedMetricCard
          title="Total Inventory Value"
          value={analytics.totalValue}
          icon={DollarSign}
          subtitle="Current stock value"
          trend={{ value: 8, isPositive: true }}
          color="text-green-600"
        />
        <AnimatedMetricCard
          title="Average Rating"
          value={analytics.averageRating * 100}
          icon={Star}
          subtitle="Overall product rating"
          trend={{ value: 3, isPositive: true }}
          color="text-blue-600"
        />
        <AnimatedMetricCard
          title="Average Discount"
          value={analytics.averageDiscount * 100}
          icon={Percent}
          subtitle="Average discount percentage"
          trend={{ value: 5, isPositive: true }}
          color="text-purple-600"
        />
      </div>

      {/* Price Distribution & Top Priced Products Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Price Distribution"
          description="Products by price range"
          icon={DollarSign}
          iconColor="text-green-600"
        >
          <BarChartComponent data={chartData.priceDistribution} color="#10B981" />
        </ChartCard>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Top Priced Products
            </CardTitle>
            <CardDescription>Products with the highest prices</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.topPricedProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.topPricedProducts.map((product) => (
                      <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.title}</td>
                        <td className="px-6 py-4 text-right">${product.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No highly priced products found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution & Top Rated Products Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Rating Distribution"
          description="Products by average customer rating"
          icon={Star}
          iconColor="text-yellow-600"
        >
          <BarChartComponent data={chartData.ratingDistribution} color="#F59E0B" />
        </ChartCard>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Top Rated Products
            </CardTitle>
            <CardDescription>Products with the highest average customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.topRatedProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.topRatedProducts.map((product) => (
                      <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.title}</td>
                        <td className="px-6 py-4 text-center text-blue-600 font-semibold">
                          {product.rating.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 text-right">${product.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No highly rated products found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overall Product Performance & Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Overall Product Performance"
          description="Multi-dimensional view of product health"
          icon={Target}
          iconColor="text-cyan-600"
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData.performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Key Insights
            </CardTitle>
            <CardDescription>Important highlights and actionable items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New: Brand Distribution & Products by Brand Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Brand Distribution"
          description="Products by brand with visual breakdown"
          icon={Building2}
          iconColor="text-indigo-600"
        >
          <PieChartComponent data={chartData.topBrands} />
        </ChartCard>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Products by Brand
            </CardTitle>
            <CardDescription>Top brands by product count</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.topBrands.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Brand Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Product Count
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.topBrands.map((brand) => (
                      <tr key={brand.name} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{brand.name}</td>
                        <td className="px-6 py-4 text-center text-blue-600 font-semibold">{brand.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No brands found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Trends (standalone) */}
      <div className="grid grid-cols-1 mb-8">
        <ChartCard
          title="Monthly Performance Trends"
          description="Product additions, revenue, and orders over time"
          icon={LineChart}
          iconColor="text-purple-600"
          className="lg:col-span-full"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={MONTHLY_TRENDS} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                yAxisId="left"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Actionable Product Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Low Stock Products Table */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Low Stock Products
            </CardTitle>
            <CardDescription>Products requiring immediate re-stocking (stock {"<"} 10)</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.lowStockProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.lowStockProducts.slice(0, 5).map((product /* Limited to 5 items */) => (
                      <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.title}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4 text-center text-red-600 font-semibold">{product.stock}</td>
                        <td className="px-6 py-4 text-right">${product.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No products are currently low on stock. Great job!</p>
            )}
          </CardContent>
        </Card>
        {/* Highly Discounted Products Table */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="h-5 w-5 text-orange-600" />
              Highly Discounted Products
            </CardTitle>
            <CardDescription>Products with the highest discount percentages</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.highlyDiscountedProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Discount
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Original Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.highlyDiscountedProducts.slice(0, 5).map((product /* Limited to 5 items */) => (
                      <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.title}</td>
                        <td className="px-6 py-4 text-center text-purple-600 font-semibold">
                          {product.discountPercentage}%
                        </td>
                        <td className="px-6 py-4 text-right">${product.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No highly discounted products found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
