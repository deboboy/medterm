"use client"

import {
  LayoutDashboard,
  Bot,
  ScrollText,
  BarChart3,
  ShieldCheck,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Bot, label: "Agents", id: "agents" },
  { icon: ScrollText, label: "Logs", id: "logs" },
  { icon: BarChart3, label: "Metrics", id: "metrics" },
  { icon: ShieldCheck, label: "Compliance", id: "compliance" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export function NavSidebar({
  active,
  onNavigate,
  open,
  onClose,
}: {
  active: string
  onNavigate: (id: string) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-background/80 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={cn(
          "fixed top-0 left-0 h-full w-56 bg-card border-r border-border z-50 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:w-48 lg:shrink-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Main navigation"
      >
        <div className="p-4 border-b border-border lg:hidden">
          <span className="text-xs font-bold text-primary tracking-wider">
            NAVIGATION
          </span>
        </div>
        <div className="p-2 flex flex-col gap-0.5 mt-2 lg:mt-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                onClose()
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                active === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              aria-current={active === item.id ? "page" : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="p-2 rounded bg-secondary/50 text-center">
            <p className="text-[10px] text-muted-foreground">Session active</p>
            <p className="text-[10px] text-foreground font-bold mt-0.5">
              Dr. Sarah Chen
            </p>
          </div>
        </div>
      </nav>
    </>
  )
}
