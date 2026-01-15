"use client"

import { Home, Building2, Settings, User, MessageSquare, BookOpen, CreditCard, Shield, MapPin } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

export function RealEstateSidebar() {
  const { t } = useLanguage()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/", badge: null },
    { icon: Building2, label: "Luxury Real Estate", href: "/real-estate", badge: "100+" },
    { icon: MapPin, label: "World Map", href: "/real-estate#map", badge: null },
    { icon: CreditCard, label: "Smart Invoice", href: "/real-estate#invoice", badge: null },
    { icon: MessageSquare, label: t.messages, href: "#messages", badge: "3" },
    { icon: BookOpen, label: t.resources, href: "#resources", badge: null },
  ]

  return (
    <Sidebar className="border-r-2 border-primary/40 bg-card">
      <SidebarHeader className="border-b-2 border-primary/40 px-6 py-5 bg-background">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/50">
            <Building2 className="h-7 w-7 text-background" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">Real Estate</h2>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-primary" />
              <p className="text-xs text-muted-foreground">Luxury Portal</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold uppercase tracking-wide">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/20 transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    <a href={item.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-primary" />
                        <span className="text-foreground font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/30 text-primary text-xs border border-primary/50 font-bold"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-primary font-bold uppercase tracking-wide">Market Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-3 py-2">
              <div className="flex items-center justify-between rounded-lg bg-background border-2 border-primary/30 p-3 shadow-md">
                <span className="text-sm text-muted-foreground font-medium">Properties</span>
                <span className="text-lg font-bold text-primary">100</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-background border-2 border-primary/30 p-3 shadow-md">
                <span className="text-sm text-muted-foreground font-medium">Countries</span>
                <span className="text-lg font-bold text-primary">195</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-background border-2 border-primary/30 p-3 shadow-md">
                <span className="text-sm text-muted-foreground font-medium">Total Value</span>
                <span className="text-sm font-bold text-primary">5M+ Pi</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-primary/40 p-4 bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-primary/20 transition-colors">
              <a href="#profile">
                <User className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{t.profile}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-primary/20 transition-colors">
              <a href="#settings">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{t.settings}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-3 rounded-lg bg-primary/20 border-2 border-primary p-3 shadow-lg shadow-primary/30">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wide">Pi Blockchain</span>
          </div>
          <p className="text-xs text-foreground/80 leading-relaxed font-medium">Military-grade encryption</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
