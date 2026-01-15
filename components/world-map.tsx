"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { MapPin, X, Eye, CreditCard, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockProperties, type Property } from "@/lib/mock-data"
import { useLanguage } from "@/contexts/language-context"

export function WorldMap() {
  const { t } = useLanguage()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const getMarkerPosition = (coords: [number, number]) => {
    const [lat, lng] = coords
    const x = ((lng + 180) / 360) * 100
    const y = ((90 - lat) / 180) * 100
    return { x, y }
  }

  const visibleProperties = useMemo(() => {
    if (zoomLevel < 1.5) {
      // Show fewer markers when zoomed out
      return mockProperties.filter((_, idx) => idx % 3 === 0)
    }
    return mockProperties
  }, [zoomLevel])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-card via-secondary/30 to-card">
      <div
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        <svg viewBox="0 0 1200 600" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.16 0.01 270)" />
              <stop offset="100%" stopColor="oklch(0.12 0.01 270)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ocean background with gradient */}
          <rect width="1200" height="600" fill="url(#oceanGradient)" />

          {/* Premium grid lines */}
          {[...Array(24)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="600"
              stroke="oklch(0.78 0.18 80)"
              strokeWidth="0.5"
              opacity="0.15"
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2="1200"
              y2={i * 50}
              stroke="oklch(0.78 0.18 80)"
              strokeWidth="0.5"
              opacity="0.15"
            />
          ))}

          {/* North America */}
          <path
            d="M 150 150 L 200 120 L 280 130 L 320 180 L 300 250 L 250 280 L 180 260 L 150 200 Z"
            fill="oklch(0.18 0.01 270)"
            stroke="oklch(0.78 0.18 80)"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* South America */}
          <path
            d="M 280 320 L 300 350 L 290 420 L 270 450 L 250 430 L 240 380 L 260 330 Z"
            fill="oklch(0.18 0.01 270)"
            stroke="oklch(0.78 0.18 80)"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Europe */}
          <path
            d="M 500 120 L 550 110 L 580 140 L 570 180 L 530 200 L 490 170 Z"
            fill="oklch(0.18 0.01 270)"
            stroke="oklch(0.78 0.18 80)"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Africa */}
          <path
            d="M 520 220 L 580 210 L 620 280 L 600 380 L 550 420 L 500 400 L 490 300 Z"
            fill="oklch(0.18 0.01 270)"
            stroke="oklch(0.78 0.18 80)"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Asia */}
          <path
            d="M 620 100 L 750 90 L 850 120 L 900 180 L 880 250 L 820 280 L 700 270 L 640 220 L 600 150 Z"
            fill="oklch(0.18 0.01 270)"
            stroke="oklch(0.78 0.18 80)"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Australia */}
          <path
            d="M 850 400 L 920 390 L 950 430 L 930 470 L 880 480 L 840 450 Z"
            fill="oklch(0.18 0.01 270)"
            stroke="oklch(0.78 0.18 80)"
            strokeWidth="2"
            opacity="0.8"
          />
        </svg>

        {/* Property Markers */}
        {visibleProperties.map((property) => {
          const pos = getMarkerPosition(property.coordinates)
          const isHovered = hoveredProperty === property.id
          const isSelected = selectedProperty?.id === property.id

          return (
            <div
              key={property.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                onClick={() => setSelectedProperty(property)}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                className="relative group"
              >
                {/* Pulse animation */}
                <div
                  className={`absolute inset-0 rounded-full bg-primary/30 ${
                    isSelected || isHovered ? "animate-ping" : ""
                  }`}
                />
                {/* Marker icon with glow */}
                <MapPin
                  className={`relative h-6 w-6 transition-all ${
                    isSelected || isHovered
                      ? "scale-150 text-primary drop-shadow-[0_0_12px_oklch(0.78_0.18_80)]"
                      : "text-primary/70"
                  }`}
                  fill="currentColor"
                />
                {/* Hover tooltip */}
                {isHovered && !isSelected && (
                  <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card/95 border border-primary/30 px-3 py-2 text-xs backdrop-blur shadow-lg">
                    <p className="font-semibold text-foreground">{property.title}</p>
                    <p className="text-primary">{property.price}</p>
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          className="bg-background/90 backdrop-blur border-primary/30"
          onClick={() => setZoomLevel(Math.min(zoomLevel + 0.5, 3))}
        >
          <ZoomIn className="h-4 w-4 text-primary" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-background/90 backdrop-blur border-primary/30"
          onClick={() => setZoomLevel(Math.max(zoomLevel - 0.5, 0.5))}
        >
          <ZoomOut className="h-4 w-4 text-primary" />
        </Button>
      </div>

      {/* Property Detail Popup */}
      {selectedProperty && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 z-50">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-primary/40 bg-card shadow-2xl shadow-primary/30">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-background/95 p-2 hover:bg-primary/20 transition-colors"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>
            <div className="relative aspect-video overflow-hidden">
              <img
                src={selectedProperty.image || "/placeholder.svg"}
                alt={selectedProperty.title}
                className="h-full w-full object-cover"
              />
              {selectedProperty.has360Tour && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-background/95 px-3 py-2 text-sm border border-primary/30">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-foreground font-medium">{t.virtualTour}</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="mb-3 inline-block rounded-md bg-primary/20 px-3 py-1.5 text-xs font-bold text-primary border border-primary/30">
                {selectedProperty.type}
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground text-balance">{selectedProperty.title}</h3>
              <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {selectedProperty.location}
              </p>
              <div className="mb-4 flex items-center justify-between border-t border-b border-primary/20 py-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.price}</p>
                  <p className="text-2xl font-bold text-primary">{selectedProperty.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">{t.size}</p>
                  <p className="font-semibold text-foreground">{selectedProperty.size}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t.smartInvoice}
                </Button>
                <Button variant="outline" className="flex-1 border-primary/30 bg-transparent hover:bg-primary/10">
                  <Eye className="mr-2 h-4 w-4" />
                  {t.viewDetails}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 rounded-lg bg-background/95 backdrop-blur border border-primary/30 px-4 py-3 shadow-lg">
        <p className="mb-2 text-sm font-bold text-primary">{t.interactiveMap}</p>
        <p className="text-xs text-muted-foreground mb-3">{t.clickMarkers}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" fill="currentColor" />
            <span className="text-xs font-semibold text-foreground">
              {mockProperties.length.toLocaleString()} {t.properties}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
