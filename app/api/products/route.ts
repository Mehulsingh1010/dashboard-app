import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

// Product type definition matching your JSON structure
export interface Product {
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

// GET handler for the API route
export async function GET(request: Request) {
  try {
    // Read the JSON file from public folder
    const jsonFilePath = path.join(process.cwd(), 'public', 'example.json')
    const jsonData = await readFile(jsonFilePath, 'utf8')
    const data = JSON.parse(jsonData)
    
    // Extract query parameters for potential filtering
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip') || '0'
    
    let products = data.products || []
    
    // Apply skip if provided
    if (skip) {
      products = products.slice(parseInt(skip))
    }
    
    // Apply limit if provided
    if (limit) {
      products = products.slice(0, parseInt(limit))
    }
    
    // Return the products data
    return NextResponse.json({
      products: products,
      total: data.products?.length || 0,
      skip: parseInt(skip),
      limit: limit ? parseInt(limit) : products.length
    })
    
  } catch (error) {
    console.error('Error reading example.json:', error)
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to load products from example.json' },
      { status: 500 }
    )
  }
}