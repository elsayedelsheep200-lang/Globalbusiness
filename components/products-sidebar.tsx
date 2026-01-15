"use client"

import { Home, Package, Settings, User, MessageSquare, BookOpen, CreditCard, Shield, ShoppingBag } from "lucide-react"
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

export function ProductsSidebar() {
  const { t } = useLanguage()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/", badge: null },
    { icon: ShoppingBag, label: "Global Trade Market", href: "/products", badge: "Hot" },
    { icon: Package, label: "All Products", href: "/products", badge: "20+" },
    { icon: CreditCard, label: "Smart Invoice", href: "/products#invoice", badge: null },
    { icon: MessageSquare, label: t.messages, href: "#messages", badge: "3" },
    { icon: BookOpen, label: t.resources, href: "#resources", badge: null },
  ]

  return (
    <Sidebar className="border-r border-purple-200 bg-white">
      <SidebarHeader className="border-b border-purple-200 px-6 py-5 bg-gradient-to-br from-purple-50 to-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 shadow-lg shadow-purple-500/40">
            <Package className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-purple-900">Trade Market</h2>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-purple-600" />
              <p className="text-xs text-gray-600">Fast Commerce</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-900 font-bold uppercase tracking-wide">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-purple-100 transition-colors border-l-2 border-transparent hover:border-purple-600"
                  >
                    <a href={item.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-purple-600" />
                        <span className="text-gray-900 font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-900 text-xs border border-purple-300 font-bold"
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
          <SidebarGroupLabel className="text-purple-900 font-bold uppercase tracking-wide">
            Quick Stats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-3 py-2">
              <div className="flex items-center justify-between rounded-lg bg-purple-50 border border-purple-200 p-3 shadow-sm">
                <span className="text-sm text-gray-700 font-medium">Products</span>
                <span className="text-lg font-bold text-purple-600">20+</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-purple-50 border border-purple-200 p-3 shadow-sm">
                <span className="text-sm text-gray-700 font-medium">Categories</span>
                <span className="text-lg font-bold text-purple-600">4</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-purple-50 border border-purple-200 p-3 shadow-sm">
                <span className="text-sm text-gray-700 font-medium">Orders Today</span>
                <span className="text-sm font-bold text-purple-600">156</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-purple-200 p-4 bg-gradient-to-br from-purple-50 to-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-purple-100 transition-colors">
              <a href="#profile">
                <User className="h-4 w-4 text-purple-600" />
                <span className="text-gray-900 font-medium">{t.profile}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-purple-100 transition-colors">
              <a href="#settings">
                <Settings className="h-4 w-4 text-purple-600" />
                <span className="text-gray-900 font-medium">{t.settings}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-3 rounded-lg bg-purple-100 border border-purple-300 p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wide">Pi Blockchain</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">Secure fast transactions</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
