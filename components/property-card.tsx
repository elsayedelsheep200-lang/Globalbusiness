"use client"

import { useState } from "react"
import { MapPin, Eye } from "lucide-react"
import type { Property } from "@/lib/mock-data"
import { useLanguage } from "@/contexts/language-context"
import { Property360Viewer } from "@/components/property-360-viewer"
import { SmartInvoiceDialog } from "@/components/smart-invoice-dialog"
import { Button } from "@/components/ui/button"

export function PropertyCard({ property }: { property: Property }) {
  const { t } = useLanguage()
  const [show360, setShow360] = useState(false)

  return (
    <>
      <div className="group overflow-hidden rounded-lg border border-primary/20 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
            {property.type}
          </div>
          {property.has360Tour && (
            <button
              onClick={() => setShow360(true)}
              className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs hover:bg-background transition-colors border border-primary/30"
            >
              <Eye className="h-3 w-3 text-primary" />
              <span className="text-foreground">{t.virtualTour}</span>
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-foreground text-balance">{property.title}</h3>
          <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xl font-bold text-primary">{property.price}</span>
            <span className="text-sm text-muted-foreground">{property.size}</span>
          </div>
          <SmartInvoiceDialog property={property}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              {t.smartInvoice}
            </Button>
          </SmartInvoiceDialog>
        </div>
      </div>

      {show360 && <Property360Viewer propertyTitle={property.title} onClose={() => setShow360(false)} />}
    </>
  )
}
