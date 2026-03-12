"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Calculator,
  Leaf,
  TrendingUp,
  FileText,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Tax Predictor", icon: Calculator, active: false },
  { name: "Carbon Credits", icon: Leaf, active: false },
  { name: "Trade Insights", icon: TrendingUp, active: false },
  { name: "Compliance Report", icon: FileText, active: false },
  { name: "Settings", icon: Settings, active: false },
]

export function Navigation() {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              CBAM-Bridge
            </h1>
            <p className="text-xs text-muted-foreground">
              Indo-German Export Navigator
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === item.name
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Sustainability Officer</p>
              <p className="text-xs text-muted-foreground">Export Compliance</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name)
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === item.name
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
