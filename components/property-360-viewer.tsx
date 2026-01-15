"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Move, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface Property360ViewerProps {
  propertyTitle: string
  onClose: () => void
}

export function Property360Viewer({ propertyTitle, onClose }: Property360ViewerProps) {
  const { t } = useLanguage()
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    setRotation((prev) => (prev + deltaX * 0.5) % 360)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setRotation(0)
    setZoom(1)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative h-full w-full max-w-7xl p-4">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between rounded-lg bg-card/90 px-4 py-3 backdrop-blur border border-primary/30">
          <div>
            <h2 className="text-lg font-bold text-primary">{t.virtualTour}</h2>
            <p className="text-sm text-muted-foreground">{propertyTitle}</p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose} className="border-primary/30 bg-transparent">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* 360° Panorama Viewer */}
        <div
          ref={containerRef}
          className="mt-20 h-[calc(100%-8rem)] overflow-hidden rounded-lg border-2 border-primary/30 bg-gradient-to-br from-card via-secondary/30 to-card cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="relative h-full w-full transition-transform"
            style={{
              transform: `scale(${zoom}) rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Panoramic content simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full">
                <img
                  src="/placeholder.svg?height=800&width=1600"
                  alt="360° panorama"
                  className="h-full w-full object-cover"
                  draggable="false"
                />
                {/* Hotspots */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
                  <button className="group relative">
                    <div className="h-6 w-6 rounded-full bg-primary/80 backdrop-blur animate-pulse" />
                    <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-background/95 px-3 py-2 text-xs backdrop-blur group-hover:block">
                      <p className="font-semibold text-foreground">Living Room</p>
                      <p className="text-muted-foreground">Click to explore</p>
                    </div>
                  </button>
                </div>
                <div className="absolute top-1/3 right-1/3 -translate-x-1/2 -translate-y-1/2">
                  <button className="group relative">
                    <div className="h-6 w-6 rounded-full bg-primary/80 backdrop-blur animate-pulse" />
                    <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-background/95 px-3 py-2 text-xs backdrop-blur group-hover:block">
                      <p className="font-semibold text-foreground">Master Bedroom</p>
                      <p className="text-muted-foreground">Click to explore</p>
                    </div>
                  </button>
                </div>
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button className="group relative">
                    <div className="h-6 w-6 rounded-full bg-primary/80 backdrop-blur animate-pulse" />
                    <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-background/95 px-3 py-2 text-xs backdrop-blur group-hover:block">
                      <p className="font-semibold text-foreground">Kitchen</p>
                      <p className="text-muted-foreground">Click to explore</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-card/90 px-4 py-3 backdrop-blur border border-primary/30">
          <Button variant="outline" size="icon" onClick={handleZoomOut} className="border-primary/30 bg-transparent">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn} className="border-primary/30 bg-transparent">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border mx-2" />
          <Button variant="outline" size="icon" onClick={handleReset} className="border-primary/30 bg-transparent">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-2 px-2">
            <Move className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Drag to rotate</span>
          </div>
        </div>

        {/* Instructions */}
        {!isDragging && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="rounded-lg bg-background/90 px-6 py-4 backdrop-blur border border-primary/30 text-center">
              <Maximize2 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-foreground mb-1">Drag to Explore</p>
              <p className="text-xs text-muted-foreground">Click and drag to view 360° panorama</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
