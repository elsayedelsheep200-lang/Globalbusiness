"use client"

import { Building2, Globe2, Users, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function StatsBar() {
  const { t } = useLanguage()

  const stats = [
    { icon: Globe2, label: t.countries, value: "195", color: "text-primary" },
    { icon: Building2, label: t.properties, value: "1M+", color: "text-primary" },
    { icon: Users, label: t.activeUsers, value: "500K+", color: "text-primary" },
    { icon: Shield, label: t.secureTransactions, value: "24/7", color: "text-primary" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center gap-2 rounded-lg bg-card p-4 border border-primary/20">
          <stat.icon className={`h-6 w-6 ${stat.color}`} />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
