import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "30" 
    const skip = searchParams.get("skip") || "0"

    const dummyJsonUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    const response = await fetch(dummyJsonUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch products from dummyjson.com: ${response.statusText}`)
    }
    const data = await response.json()

    return NextResponse.json({
      products: data.products || [],
      total: data.total || 0,
      skip: data.skip || 0,
      limit: data.limit || (data.products ? data.products.length : 0),
    })
  } catch (error: any) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
