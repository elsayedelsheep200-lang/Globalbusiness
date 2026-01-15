import type { Product } from "./types"

export const generateGlobalProducts = (): Product[] => {
  const products: Product[] = []

  // Electronics
  const electronics = [
    { name: "Industrial Robotics Arm", price: 25000, specs: { Power: "5kW", Reach: "2.5m" } },
    { name: "Smart Factory Sensors", price: 1200, specs: { Range: "100m", Battery: "2 years" } },
    { name: "LED Display Panels", price: 3500, specs: { Size: "4x2m", Resolution: "4K" } },
    { name: "Professional Drones", price: 8000, specs: { "Flight Time": "45min", Camera: "8K" } },
    { name: "Solar Panel Arrays", price: 15000, specs: { Output: "10kW", Warranty: "25 years" } },
  ]

  electronics.forEach((item, idx) => {
    products.push({
      id: `elec-${idx + 1}`,
      title: item.name,
      description: `High-quality ${item.name.toLowerCase()} for industrial and commercial use`,
      price: item.price,
      currency: "Pi",
      category: "electronics",
      images: [`/placeholder.svg?height=400&width=600&query=${item.name}`],
      specifications: item.specs,
      stock: Math.floor(Math.random() * 500) + 50,
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 500) + 50,
      seller: {
        name: "TechFactory Direct",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        country: "China",
      },
      market: "products",
      status: "in-stock",
      shipsFrom: "Shenzhen, China",
      deliveryTime: "7-14 days",
    })
  })

  // Fashion
  const fashion = [
    { name: "Corporate Uniform Sets", price: 45, specs: { Material: "Premium Cotton", Sizes: "XS-XXL" } },
    { name: "Safety Workwear", price: 85, specs: { Protection: "EN 20471", Colors: "High-vis" } },
    { name: "Luxury Business Suits", price: 650, specs: { Fabric: "Italian Wool", Custom: "Yes" } },
    { name: "Athletic Performance Gear", price: 120, specs: { Technology: "Moisture-wicking", Fit: "Ergonomic" } },
  ]

  fashion.forEach((item, idx) => {
    products.push({
      id: `fash-${idx + 1}`,
      title: item.name,
      description: `Premium ${item.name.toLowerCase()} for businesses and individuals`,
      price: item.price,
      currency: "Pi",
      category: "fashion",
      images: [`/placeholder.svg?height=400&width=600&query=${item.name}`],
      specifications: item.specs,
      stock: Math.floor(Math.random() * 1000) + 100,
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 300) + 20,
      seller: {
        name: "Global Fashion Hub",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.7,
        country: "Italy",
      },
      market: "products",
      status: "in-stock",
      shipsFrom: "Milan, Italy",
      deliveryTime: "5-10 days",
    })
  })

  // Industrial
  const industrial = [
    { name: "CNC Machining Centers", price: 85000, specs: { Axes: "5-axis", Precision: "0.001mm" } },
    { name: "Industrial Conveyor Systems", price: 35000, specs: { Length: "50m", Load: "500kg/m" } },
    { name: "Hydraulic Press Machines", price: 45000, specs: { Force: "500 tons", Speed: "10mm/s" } },
    { name: "Packaging Automation Line", price: 120000, specs: { Speed: "100 units/min", Integration: "Full" } },
  ]

  industrial.forEach((item, idx) => {
    products.push({
      id: `ind-${idx + 1}`,
      title: item.name,
      description: `Industrial-grade ${item.name.toLowerCase()} for factories and manufacturing`,
      price: item.price,
      currency: "Pi",
      category: "industrial",
      images: [`/placeholder.svg?height=400&width=600&query=${item.name}`],
      specifications: item.specs,
      stock: Math.floor(Math.random() * 50) + 5,
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 100) + 10,
      seller: {
        name: "IndustrialDirect GmbH",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        country: "Germany",
      },
      market: "products",
      status: "in-stock",
      shipsFrom: "Stuttgart, Germany",
      deliveryTime: "14-30 days",
    })
  })

  // Food
  const food = [
    { name: "Organic Coffee Beans (Bulk)", price: 1200, specs: { Origin: "Colombia", Grade: "Premium" } },
    { name: "Spice Collection (500kg)", price: 8500, specs: { Varieties: "25 types", Quality: "Export" } },
    { name: "Frozen Seafood (Container)", price: 45000, specs: { Volume: "20ft", Certification: "MSC" } },
    { name: "Premium Olive Oil (Wholesale)", price: 15000, specs: { Volume: "1000L", Type: "Extra Virgin" } },
  ]

  food.forEach((item, idx) => {
    products.push({
      id: `food-${idx + 1}`,
      title: item.name,
      description: `Wholesale ${item.name.toLowerCase()} for restaurants and distributors`,
      price: item.price,
      currency: "Pi",
      category: "food",
      images: [`/placeholder.svg?height=400&width=600&query=${item.name}`],
      specifications: item.specs,
      stock: Math.floor(Math.random() * 200) + 20,
      rating: 4.3 + Math.random() * 0.7,
      reviews: Math.floor(Math.random() * 200) + 30,
      seller: {
        name: "Global Food Traders",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.6,
        country: "Spain",
      },
      market: "products",
      status: "in-stock",
      shipsFrom: "Barcelona, Spain",
      deliveryTime: "3-7 days",
    })
  })

  return products
}

export const mockProducts: Product[] = generateGlobalProducts()
