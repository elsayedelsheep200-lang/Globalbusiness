export interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  location: {
    country: string
    city: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  images: string[]
  panorama360?: string
  type: "residential" | "commercial" | "industrial" | "land"
  features: string[]
  area: number
  bedrooms?: number
  bathrooms?: number
  yearBuilt?: number
  status: "available" | "pending" | "sold"
  agent: {
    name: string
    avatar: string
    contact: string
  }
  market: "real-estate"
  ownershipType?: "freehold" | "leasehold" | "shared"
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  currency: string
  category: "electronics" | "fashion" | "industrial" | "food"
  images: string[]
  specifications: Record<string, string>
  stock: number
  rating: number
  reviews: number
  seller: {
    name: string
    avatar: string
    rating: number
    country: string
  }
  market: "products"
  status: "in-stock" | "low-stock" | "out-of-stock"
  shipsFrom: string
  deliveryTime: string
}

export type MarketItem = Property | Product

export type MarketType = "real-estate" | "products"

export interface Activity {
  id: string
  type: "listing" | "sale" | "inquiry" | "tour"
  property: string
  location: string
  timestamp: Date
  amount?: number
  market: MarketType
}

export interface Invoice {
  id: string
  propertyId: string
  amount: number
  currency: string
  status: "pending" | "paid" | "cancelled"
  piTransactionId?: string
  createdAt: Date
  paidAt?: Date
}

export type Language = "en" | "ar" | "fr" | "zh" | "hi"

export interface Translations {
  [key: string]: string
}
