import { mockProperties } from "./mock-data"
import { mockProducts } from "./product-data"
import type { Property } from "./mock-data"
import type { Product } from "./types"

export interface SearchResult {
  type: "property" | "product"
  item: Property | Product
  score: number
}

const propertyKeywords = [
  "house",
  "home",
  "apartment",
  "penthouse",
  "villa",
  "estate",
  "property",
  "real estate",
  "building",
  "land",
  "office",
  "residential",
  "commercial",
  "condo",
  "flat",
  "mansion",
  "duplex",
]

const productKeywords = [
  "product",
  "buy",
  "purchase",
  "machine",
  "equipment",
  "tool",
  "device",
  "electronics",
  "fashion",
  "clothing",
  "food",
  "industrial",
  "supply",
  "wholesale",
  "retail",
]

export function detectSearchIntent(query: string): "property" | "product" | "mixed" {
  const lowerQuery = query.toLowerCase()

  const propertyMatches = propertyKeywords.filter((keyword) => lowerQuery.includes(keyword)).length
  const productMatches = productKeywords.filter((keyword) => lowerQuery.includes(keyword)).length

  if (propertyMatches > productMatches) return "property"
  if (productMatches > propertyMatches) return "product"
  return "mixed"
}

export function smartSearch(query: string): SearchResult[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase()
  const results: SearchResult[] = []

  // Search properties
  mockProperties.forEach((property) => {
    const titleMatch = property.title.toLowerCase().includes(lowerQuery)
    const locationMatch = property.location.toLowerCase().includes(lowerQuery)
    const typeMatch = property.type.toLowerCase().includes(lowerQuery)
    const countryMatch = property.country.toLowerCase().includes(lowerQuery)

    if (titleMatch || locationMatch || typeMatch || countryMatch) {
      let score = 0
      if (titleMatch) score += 3
      if (locationMatch) score += 2
      if (typeMatch) score += 2
      if (countryMatch) score += 1

      results.push({
        type: "property",
        item: property,
        score,
      })
    }
  })

  // Search products
  mockProducts.forEach((product) => {
    const titleMatch = product.title.toLowerCase().includes(lowerQuery)
    const descMatch = product.description.toLowerCase().includes(lowerQuery)
    const categoryMatch = product.category.toLowerCase().includes(lowerQuery)

    if (titleMatch || descMatch || categoryMatch) {
      let score = 0
      if (titleMatch) score += 3
      if (categoryMatch) score += 2
      if (descMatch) score += 1

      results.push({
        type: "product",
        item: product,
        score,
      })
    }
  })

  // Sort by intent and score
  const intent = detectSearchIntent(query)

  return results.sort((a, b) => {
    // Prioritize based on intent
    if (intent === "property") {
      if (a.type === "property" && b.type === "product") return -1
      if (a.type === "product" && b.type === "property") return 1
    } else if (intent === "product") {
      if (a.type === "product" && b.type === "property") return -1
      if (a.type === "property" && b.type === "product") return 1
    }

    // Then sort by score
    return b.score - a.score
  })
}

export function categorizeResults(results: SearchResult[]): {
  properties: Property[]
  products: Product[]
} {
  const properties: Property[] = []
  const products: Product[] = []

  results.forEach((result) => {
    if (result.type === "property") {
      properties.push(result.item as Property)
    } else {
      products.push(result.item as Product)
    }
  })

  return { properties, products }
}
