"use client"

import { Star, MapPin, TrendingUp, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg bg-white">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          <Badge className="absolute top-3 right-3 bg-purple-600 text-white border-none font-bold shadow-lg">
            {product.category}
          </Badge>
          {product.status === "in-stock" && (
            <Badge className="absolute top-3 left-3 bg-green-500 text-white border-none font-semibold">In Stock</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{product.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-purple-600" />
          <span className="font-medium">{product.seller.country}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span>Ships in {product.deliveryTime}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-purple-100">
          <div>
            <span className="text-2xl font-bold text-purple-600">{product.price}</span>
            <span className="text-sm text-gray-600 ml-1">{product.currency}</span>
          </div>
          <Badge variant="outline" className="border-purple-300 text-purple-700 font-semibold">
            {product.stock} in stock
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Buy Now
        </Button>
        <Button
          variant="outline"
          className="border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold bg-transparent"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}
