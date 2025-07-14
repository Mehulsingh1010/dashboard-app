"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Star, Search, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import Image from "next/image"

// Updated Product interface to match your JSON structure
interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}

interface ProductsTableProps {
  products: Product[]
  onRefresh?: () => void
}

export function ProductsTable({ products, onRefresh }: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [stockFilter, setStockFilter] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const itemsPerPage = 15

  const categories = [...new Set(products.map((p) => p.category))]

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

      // Stock filter
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.stock > 0 && product.availabilityStatus === "In Stock") ||
        (stockFilter === "out-of-stock" && product.availabilityStatus === "Out of Stock") ||
        (stockFilter === "low-stock" && product.availabilityStatus === "Low Stock")

      // Price range filter
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-50" && product.price < 50) ||
        (priceRange === "50-100" && product.price >= 50 && product.price <= 100) ||
        (priceRange === "100-500" && product.price > 100 && product.price <= 500) ||
        (priceRange === "over-500" && product.price > 500)

      return matchesSearch && matchesCategory && matchesStock && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating-high":
          return b.rating - a.rating
        case "rating-low":
          return a.rating - b.rating
        case "stock-high":
          return b.stock - a.stock
        case "stock-low":
          return a.stock - b.stock
        case "discount":
          return b.discountPercentage - a.discountPercentage
        case "newest":
          return new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
        case "weight":
          return b.weight - a.weight
        default:
          return a.title.localeCompare(b.title)
      }
    })

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
    setCurrentPage(1)
  }
  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }
  const handleStockChange = (value: string) => {
    setStockFilter(value)
    setCurrentPage(1)
  }
  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value)
    setCurrentPage(1)
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true)
      await onRefresh()
      setRefreshing(false)
    }
  }

  const getStockStatus = (stock: number, availabilityStatus: string) => {
    if (availabilityStatus === "Out of Stock") return { label: "Out of Stock", variant: "destructive" as const }
    if (availabilityStatus === "Low Stock") return { label: "Low Stock", variant: "secondary" as const }
    return { label: "In Stock", variant: "default" as const }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    )
  }

  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="flex flex-col mt-2 gap-4 mb-6">
            {/* Header with refresh button */}
            <div className="flex justify-between items-center">
              
             
            </div>
            
           
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, brands, or SKU..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

               <Button
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
   
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={stockFilter} onValueChange={handleStockChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Status</SelectItem>
                  <SelectItem value="in-stock">✓ In Stock</SelectItem>
                  <SelectItem value="low-stock">⚠ Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">✗ Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-500">$100 - $500</SelectItem>
                  <SelectItem value="over-500">Over $500</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating-high">Rating: High to Low</SelectItem>
                  <SelectItem value="rating-low">Rating: Low to High</SelectItem>
                  <SelectItem value="stock-high">Stock: High to Low</SelectItem>
                  <SelectItem value="stock-low">Stock: Low to High</SelectItem>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="weight">Weight: Heavy to Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead className="w-[120px]">Category</TableHead>
                  <TableHead className="w-[120px]">Price</TableHead>
                  <TableHead className="w-[140px]">Rating</TableHead>
                  <TableHead className="w-[80px]">Stock</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[100px]">Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.availabilityStatus)
                  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="w-[300px]">
                        <div className="flex items-center space-x-3">
                          <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={product.thumbnail || "/placeholder.svg"}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{product.title}</div>
                            <div className="text-sm text-gray-500 truncate">{product.brand}</div>
                            <div className="text-xs text-gray-400">{product.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <Badge variant="outline" className="truncate">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <div className="font-medium">
                          {product.discountPercentage > 0 ? (
                            <>
                              <span className="text-green-600">${discountedPrice.toFixed(2)}</span>
                              <div className="text-sm text-gray-500 line-through">${product.price}</div>
                            </>
                          ) : (
                            <span>${product.price}</span>
                          )}
                        </div>
                        {product.discountPercentage > 0 && (
                          <div className="text-xs text-green-600">{product.discountPercentage.toFixed(1)}% off</div>
                        )}
                      </TableCell>
                      <TableCell className="w-[140px]">{renderStars(product.rating)}</TableCell>
                      <TableCell className="w-[80px]">
                        <div className="font-medium">{product.stock}</div>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                      </TableCell>
                      <TableCell className="w-[100px]">
                        <div className="text-sm">{product.weight}g</div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {currentProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No products found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="text-gray-400">
                        ...
                      </span>
                    )
                  }
                  return null
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}