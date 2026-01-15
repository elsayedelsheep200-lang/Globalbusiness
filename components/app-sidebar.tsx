"use client"

import {
  Globe2,
  Home,
  Building2,
  Settings,
  User,
  MessageSquare,
  BookOpen,
  CreditCard,
  Shield,
  Package,
  Factory,
} from "lucide-react"
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

export function AppSidebar() {
  const { t } = useLanguage()

  const mainMarkets = [
    { icon: Building2, label: "Luxury Real Estate", href: "/real-estate", badge: "100+", color: "text-amber-600" },
    { icon: Package, label: "Global Trade Market", href: "/products", badge: "20+", color: "text-purple-600" },
    { icon: Factory, label: "Industrial Factories", href: "/factories", badge: "Coming", color: "text-blue-600" },
  ]

  const menuItems = [
    { icon: Home, label: t.dashboard, href: "/", badge: null },
    { icon: Globe2, label: t.worldMap, href: "#map", badge: null },
    { icon: CreditCard, label: t.smartInvoice, href: "#invoice", badge: null },
    { icon: MessageSquare, label: t.messages, href: "#messages", badge: "3" },
    { icon: BookOpen, label: t.resources, href: "#resources", badge: null },
  ]

  return (
    <Sidebar className="border-r border-primary/20">
      <SidebarHeader className="border-b border-primary/20 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30">
            <Globe2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">{t.appName}</h2>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-primary" />
              <p className="text-xs text-muted-foreground">{t.globalPlatform}</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        {/* New Control Center section with market entry points */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold uppercase tracking-wide">
            Control Center
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMarkets.map((market) => (
                <SidebarMenuItem key={market.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    <a href={market.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <market.icon className={`h-5 w-5 ${market.color}`} />
                        <span className="text-foreground font-semibold">{market.label}</span>
                      </div>
                      {market.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/20 text-primary text-xs border-primary/30 font-bold"
                        >
                          {market.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-primary font-semibold">{t.navigation}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className="hover:bg-primary/10 transition-colors">
                    <a href={item.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary text-xs border-primary/30">
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
          <SidebarGroupLabel className="text-primary font-semibold">Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-3 py-2">
              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 border border-primary/10">
                <span className="text-sm text-muted-foreground">Active Listings</span>
                <span className="text-lg font-bold text-primary">120+</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 border border-primary/10">
                <span className="text-sm text-muted-foreground">Markets</span>
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 border border-primary/10">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="text-sm font-bold text-primary">5M+ Pi</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-primary/20 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-primary/10 transition-colors">
              <a href="#profile">
                <User className="h-4 w-4 text-primary" />
                <span className="text-foreground">{t.profile}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-primary/10 transition-colors">
              <a href="#settings">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-foreground">{t.settings}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-3 rounded-lg bg-primary/10 border border-primary/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Pi Blockchain</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">Secured by military-grade encryption</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
