"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Building2, Package, TrendingUp, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { smartSearch, categorizeResults, detectSearchIntent } from "@/lib/search-utils"
import type { SearchResult } from "@/lib/search-utils"
import { useRouter } from "next/navigation"

export function SmartSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [intent, setIntent] = useState<"property" | "product" | "mixed">("mixed")
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const searchResults = smartSearch(query)
      setResults(searchResults.slice(0, 10))
      setIntent(detectSearchIntent(query))
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const { properties, products } = categorizeResults(results)

  const handleClearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "property") {
      router.push("/real-estate")
    } else {
      router.push("/products")
    }
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
        <Input
          type="search"
          placeholder="Search properties, products, locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="pl-10 pr-10 bg-card border-primary/30 focus:border-primary focus:ring-primary/20"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 z-10"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full max-h-[600px] overflow-auto z-50 shadow-xl border-2 border-primary/30">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Found {results.length} results
                  {intent !== "mixed" && ` (${intent === "property" ? "Properties" : "Products"} prioritized)`}
                </span>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                {intent} search
              </Badge>
            </div>

            {properties.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-primary/20">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <h3 className="font-bold text-foreground">Properties ({properties.length})</h3>
                </div>
                {properties.slice(0, 5).map((property) => (
                  <button
                    key={property.id}
                    onClick={() => handleResultClick({ type: "property", item: property, score: 0 })}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{property.title}</h4>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-amber-600 text-amber-600">
                            {property.type}
                          </Badge>
                          <span className="text-sm font-bold text-primary">{property.price}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-primary/20">
                  <Package className="h-4 w-4 text-purple-600" />
                  <h3 className="font-bold text-foreground">Products ({products.length})</h3>
                </div>
                {products.slice(0, 5).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick({ type: "product", item: product, score: 0 })}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{product.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-purple-600 text-purple-600">
                            {product.category}
                          </Badge>
                          <span className="text-sm font-bold text-primary">
                            {product.price} {product.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
