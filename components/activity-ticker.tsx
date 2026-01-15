"use client"

import { useEffect, useState } from "react"
import { mockActivities, type Activity } from "@/lib/mock-data"
import { useLanguage } from "@/contexts/language-context"

export function ActivityTicker() {
  const { t } = useLanguage()
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActivities((prev) => {
        const newActivities = [...prev]
        const first = newActivities.shift()
        if (first) newActivities.push(first)
        return newActivities
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div className="rounded-lg border border-primary/20 bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-primary">{t.globalActivity}</h3>
      <div
        className="space-y-2 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {activities.slice(0, 3).map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-2 rounded-md bg-secondary/50 p-2 text-xs transition-all hover:bg-secondary"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{activity.user}</p>
              <p className="text-muted-foreground">{activity.action}</p>
              <p className="text-primary">{activity.property}</p>
            </div>
            <span className="text-muted-foreground">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
