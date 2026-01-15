"use client"

import { useState } from "react"
import { Menu, Building2, Package, Factory, ArrowRight, TrendingUp, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { LanguageSelector } from "@/components/language-selector"
import { StatsBar } from "@/components/stats-bar"
import { ActivityTicker } from "@/components/activity-ticker"
import { PropertyCard } from "@/components/property-card"
import { WorldMap } from "@/components/world-map"
import { SmartSearch } from "@/components/smart-search"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { mockProperties } from "@/lib/mock-data"

export default function HomePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const featuredProperties = mockProperties.slice(0, 6)

  const markets = [
    {
      icon: Building2,
      title: "Luxury Real Estate",
      description: "Premium properties, penthouses, and estates across 195 countries with 360° virtual tours",
      theme: "from-amber-600 to-yellow-600",
      bgGradient: "from-amber-50 to-yellow-50",
      borderColor: "border-amber-600",
      iconColor: "text-amber-600",
      textColor: "text-amber-900",
      href: "/real-estate",
      listings: "100+",
      badge: "Gold/Black Theme",
    },
    {
      icon: Package,
      title: "Global Trade Market",
      description: "Electronics, fashion, industrial equipment, and food from factories and suppliers worldwide",
      theme: "from-purple-600 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-600",
      iconColor: "text-purple-600",
      textColor: "text-purple-900",
      href: "/products",
      listings: "20+",
      badge: "White/Purple Theme",
    },
    {
      icon: Factory,
      title: "Industrial Factories",
      description: "Direct access to manufacturing facilities, production lines, and bulk industrial supply",
      theme: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-600",
      iconColor: "text-blue-600",
      textColor: "text-blue-900",
      href: "/factories",
      listings: "Coming Soon",
      badge: "Enterprise Portal",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
            <div className="flex h-16 items-center gap-3 px-4 md:px-6">
              <SidebarTrigger className="lg:hidden">
                <Button variant="outline" size="icon" className="border-primary/30 bg-card">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SidebarTrigger>
              <div className="flex flex-1 items-center gap-3">
                <SmartSearch />
              </div>
              <LanguageSelector />
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
            <section className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-br from-card via-secondary/40 to-card p-6 md:p-10 shadow-lg shadow-primary/10">
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-10 w-10 text-primary" />
                  <h1 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
                    <span className="text-primary">{t.appName}</span>
                  </h1>
                </div>
                <p className="mb-2 text-lg text-foreground text-pretty md:text-xl font-semibold">{t.tagline}</p>
                <p className="mb-6 text-muted-foreground text-pretty leading-relaxed">{t.subtitle}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Pi Blockchain Secured</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Zero Intermediaries</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/50 to-transparent" />
              </div>
            </section>

            <StatsBar />

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary mb-2">Choose Your Market</h2>
                <p className="text-muted-foreground">
                  Select from our three specialized portals, each designed for specific business needs
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                  <Card
                    key={market.title}
                    className={`overflow-hidden border-2 ${market.borderColor} hover:shadow-xl transition-all bg-gradient-to-br ${market.bgGradient}`}
                  >
                    <CardHeader>
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${market.theme} shadow-lg mb-4`}
                      >
                        <market.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className={`text-xl ${market.textColor}`}>{market.title}</CardTitle>
                      <CardDescription className="text-gray-700">{market.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge className={`${market.iconColor} border-current`} variant="outline">
                          {market.badge}
                        </Badge>
                        <span className={`text-sm font-bold ${market.iconColor}`}>{market.listings} items</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={market.href} className="w-full">
                        <Button
                          className={`w-full bg-gradient-to-r ${market.theme} text-white hover:opacity-90 shadow-md font-bold`}
                        >
                          Enter Market
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <WorldMap />
              </div>
              <div className="lg:col-span-1">
                <ActivityTicker />
              </div>
            </div>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">{t.featuredListings}</h2>
                <Button
                  variant="outline"
                  className="border-primary/30 bg-transparent hover:bg-primary/10 font-semibold"
                >
                  {t.viewAll}
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
