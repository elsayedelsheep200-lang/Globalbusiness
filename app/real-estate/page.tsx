"use client"

import { useState } from "react"
import { Search, Menu, Building2, MapPin, Key, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { RealEstateSidebar } from "@/components/real-estate-sidebar"
import { LanguageSelector } from "@/components/language-selector"
import { PropertyCard } from "@/components/property-card"
import { WorldMap } from "@/components/world-map"
import { mockProperties } from "@/lib/mock-data"
import { useLanguage } from "@/contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RealEstatePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [ownershipFilter, setOwnershipFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const countries = Array.from(new Set(mockProperties.map((p) => p.country)))

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === "all" || property.country === locationFilter
    const matchesOwnership = ownershipFilter === "all" || property.ownershipType === ownershipFilter
    const matchesType = typeFilter === "all" || property.type.toLowerCase() === typeFilter

    return matchesSearch && matchesLocation && matchesOwnership && matchesType
  })

  const featuredProperties = filteredProperties.slice(0, 6)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <RealEstateSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b-2 border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-primary/20">
            <div className="flex h-16 items-center gap-3 px-4 md:px-6">
              <SidebarTrigger className="lg:hidden">
                <Button variant="outline" size="icon" className="border-primary bg-card">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SidebarTrigger>
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    type="search"
                    placeholder="Search luxury properties, penthouses, estates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-2 border-primary/40 focus:border-primary focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <LanguageSelector />
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
            <section className="relative overflow-hidden rounded-xl border-2 border-primary bg-gradient-to-br from-card via-background to-card p-6 md:p-10 shadow-xl shadow-primary/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-10 w-10 text-primary" />
                  <h1 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl text-primary">
                    Luxury Real Estate
                  </h1>
                </div>
                <p className="mb-2 text-lg text-foreground text-pretty md:text-xl font-semibold">
                  Premium Properties Across 195 Countries
                </p>
                <p className="mb-6 text-muted-foreground text-pretty leading-relaxed">
                  Eliminating intermediaries through Pi Blockchain. Discover penthouses, estates, and commercial
                  properties with military-grade secure transactions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/40 font-bold"
                  >
                    Explore Properties
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary bg-transparent hover:bg-primary/20 font-bold text-primary"
                  >
                    360° Virtual Tours
                  </Button>
                </div>
              </div>
            </section>

            <section className="bg-card border-2 border-primary/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-primary">Filter Properties</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Location
                  </label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="bg-background border-primary/40 text-foreground">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    Ownership Type
                  </label>
                  <Select value={ownershipFilter} onValueChange={setOwnershipFilter}>
                    <SelectTrigger className="bg-background border-primary/40 text-foreground">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="shared">Shared Ownership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Property Type
                  </label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-background border-primary/40 text-foreground">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full border-primary/40 hover:bg-primary/20 text-primary font-semibold bg-transparent"
                    onClick={() => {
                      setLocationFilter("all")
                      setOwnershipFilter("all")
                      setTypeFilter("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </section>

            <div className="bg-card border-2 border-primary/30 rounded-xl p-4 shadow-lg">
              <WorldMap />
            </div>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Luxury Listings</h2>
                  <p className="text-sm text-muted-foreground mt-1">{filteredProperties.length} properties found</p>
                </div>
                <Button
                  variant="outline"
                  className="border-2 border-primary bg-transparent hover:bg-primary/20 font-bold text-primary"
                >
                  View All
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
