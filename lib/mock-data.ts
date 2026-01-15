export interface Property {
  id: string
  title: string
  location: string
  country: string
  price: string
  image: string
  coordinates: [number, number]
  type: string
  size: string
  bedrooms?: number
  has360Tour: boolean
  market: "real-estate"
  ownershipType: "freehold" | "leasehold" | "shared"
}

export const generateGlobalProperties = (): Property[] => {
  const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"]
  const ownershipTypes: Array<"freehold" | "leasehold" | "shared"> = ["freehold", "leasehold", "shared"]
  const countries = [
    {
      name: "United Arab Emirates",
      cities: ["Dubai", "Abu Dhabi", "Sharjah"],
      coords: [
        [25.2048, 55.2708],
        [24.4539, 54.3773],
        [25.3463, 55.4209],
      ],
    },
    {
      name: "United States",
      cities: ["New York", "Los Angeles", "Chicago"],
      coords: [
        [40.7128, -74.006],
        [34.0522, -118.2437],
        [41.8781, -87.6298],
      ],
    },
    {
      name: "United Kingdom",
      cities: ["London", "Manchester", "Edinburgh"],
      coords: [
        [51.5074, -0.1278],
        [53.4808, -2.2426],
        [55.9533, -3.1883],
      ],
    },
    {
      name: "France",
      cities: ["Paris", "Lyon", "Marseille"],
      coords: [
        [48.8566, 2.3522],
        [45.764, 4.8357],
        [43.2965, 5.3698],
      ],
    },
    {
      name: "China",
      cities: ["Shanghai", "Beijing", "Shenzhen"],
      coords: [
        [31.2304, 121.4737],
        [39.9042, 116.4074],
        [22.5431, 114.0579],
      ],
    },
    {
      name: "India",
      cities: ["Mumbai", "Delhi", "Bangalore"],
      coords: [
        [19.076, 72.8777],
        [28.7041, 77.1025],
        [12.9716, 77.5946],
      ],
    },
    {
      name: "Japan",
      cities: ["Tokyo", "Osaka", "Kyoto"],
      coords: [
        [35.6762, 139.6503],
        [34.6937, 135.5023],
        [35.0116, 135.7681],
      ],
    },
    {
      name: "Germany",
      cities: ["Berlin", "Munich", "Frankfurt"],
      coords: [
        [52.52, 13.405],
        [48.1351, 11.582],
        [50.1109, 8.6821],
      ],
    },
    {
      name: "Canada",
      cities: ["Toronto", "Vancouver", "Montreal"],
      coords: [
        [43.6532, -79.3832],
        [49.2827, -123.1207],
        [45.5017, -73.5673],
      ],
    },
    {
      name: "Australia",
      cities: ["Sydney", "Melbourne", "Brisbane"],
      coords: [
        [-33.8688, 151.2093],
        [-37.8136, 144.9631],
        [-27.4698, 153.0251],
      ],
    },
  ]

  const properties: Property[] = []
  const baseProperties = 100 // Generate 100 properties for demo

  for (let i = 0; i < baseProperties; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)]
    const cityIndex = Math.floor(Math.random() * country.cities.length)
    const city = country.cities[cityIndex]
    const coords = country.coords[cityIndex]
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]

    const basePrice = type === "Industrial" ? 50000 : type === "Commercial" ? 30000 : type === "Land" ? 15000 : 5000
    const price = basePrice + Math.floor(Math.random() * basePrice * 2)

    const size =
      type === "Industrial"
        ? Math.floor(50000 + Math.random() * 150000)
        : type === "Commercial"
          ? Math.floor(10000 + Math.random() * 50000)
          : type === "Land"
            ? Math.floor(5000 + Math.random() * 50000)
            : Math.floor(1500 + Math.random() * 8000)

    properties.push({
      id: `prop-${i + 1}`,
      title: `${type} Property ${city}`,
      location: `${city}, ${country.name}`,
      country: country.name,
      price: `${price.toLocaleString()} Pi`,
      image: `/placeholder.svg?height=400&width=600&query=${type} property in ${city}`,
      coordinates: [coords[0] + (Math.random() - 0.5) * 0.5, coords[1] + (Math.random() - 0.5) * 0.5] as [
        number,
        number,
      ],
      type,
      size: `${size.toLocaleString()} sq ft`,
      bedrooms: type === "Residential" ? Math.floor(2 + Math.random() * 5) : undefined,
      has360Tour: true,
      market: "real-estate",
      ownershipType: ownershipTypes[Math.floor(Math.random() * ownershipTypes.length)],
    })
  }

  return properties
}

export const mockProperties: Property[] = generateGlobalProperties()

export interface Activity {
  id: string
  user: string
  action: string
  property: string
  location: string
  timestamp: string
  market: "real-estate" | "products"
}

export const mockActivities: Activity[] = [
  {
    id: "1",
    user: "Pioneer_UAE_2847",
    action: "Initiated Smart Invoice",
    property: "Luxury Penthouse Dubai",
    location: "UAE",
    timestamp: "2 min ago",
    market: "real-estate",
  },
  {
    id: "2",
    user: "Pioneer_USA_1923",
    action: "Completed 360° Tour",
    property: "Manhattan Corporate Tower",
    location: "USA",
    timestamp: "5 min ago",
    market: "real-estate",
  },
  {
    id: "3",
    user: "Pioneer_FRA_5621",
    action: "Saved Property",
    property: "Paris Luxury Apartment",
    location: "France",
    timestamp: "8 min ago",
    market: "real-estate",
  },
  {
    id: "4",
    user: "Pioneer_CHN_8834",
    action: "Transaction Confirmed",
    property: "Shanghai Industrial Complex",
    location: "China",
    timestamp: "12 min ago",
    market: "real-estate",
  },
  {
    id: "5",
    user: "Pioneer_IND_4429",
    action: "Purchased",
    property: "CNC Machining Center",
    location: "India",
    timestamp: "15 min ago",
    market: "products",
  },
]
