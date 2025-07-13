"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Plus, BarChart3, TrendingUp, Target, User, ShoppingCart, DollarSign, Eye, AlertTriangle, Star, Filter, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

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
  reviews: Array<{
    rating: number
    comment: string
    reviewerName: string
  }>
}

interface DashboardHomeProps {
  onNavigate?: (tab: string) => void
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [counters, setCounters] = useState({ products: 0, categories: 0, lowStock: 0, totalSales: 0, revenue: 0 })
  const [loading, setLoading] = useState(true)

  // Load data from JSON file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/example.json')
        const data = await response.json()
        setProducts(data.products || [])
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Calculate dashboard metrics from actual data
  useEffect(() => {
    if (products.length > 0) {
      const categories = [...new Set(products.map(p => p.category))]
      const lowStockItems = products.filter(p => p.stock < 20)
      const totalSales = products.reduce((sum, p) => sum + (100 - p.stock), 0)
      const revenue = products.reduce((sum, p) => sum + (p.price * (100 - p.stock)), 0)

      setCounters({
        products: products.length,
        categories: categories.length,
        lowStock: lowStockItems.length,
        totalSales,
        revenue: Math.round(revenue)
      })
    }
  }, [products])


  const salesData = products.length > 0 ? [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 4200 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 4300 },
  ] : []

  // Generate category data
  const categoryData = products.length > 0 ? (() => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    
    return Object.entries(categoryCount).map(([category, count], index) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: count,
      color: colors[index % colors.length]
    }))
  })() : []


  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$250.00', status: 'Completed' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$180.00', status: 'Pending' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: '$320.00', status: 'Processing' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: '$95.00', status: 'Completed' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
    

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Products</p>
                  <p className="text-2xl font-semibold text-gray-900">{counters.products}</p>
                  <p className="text-sm text-green-600 mt-1">+12% ↗</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">${counters.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+8% ↗</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-2xl font-semibold text-gray-900">{counters.totalSales}</p>
                  <p className="text-sm text-green-600 mt-1">+15% ↗</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Low Stock</p>
                  <p className="text-2xl font-semibold text-gray-900">{counters.lowStock}</p>
                  <p className="text-sm text-red-600 mt-1">-5% ↘</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Sales Analytics</CardTitle>
                    <CardDescription className="text-gray-600">Monthly performance overview</CardDescription>
                  </div>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white">
                    <option>Month</option>
                    <option>Week</option>
                    <option>Year</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <div>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Categories</CardTitle>
                <CardDescription className="text-gray-600">Product distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                        stroke="none"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="text-gray-500">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Orders */}
        <Card className="bg-white border border-gray-200 shadow-sm mt-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Orders</CardTitle>
              <Button variant="outline" size="sm" className="text-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}