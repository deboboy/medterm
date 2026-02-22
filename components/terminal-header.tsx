"use client"

import { useState, useEffect } from "react"
import { Activity, Wifi, Shield, Menu, X } from "lucide-react"

export function TerminalHeader({
  onMenuToggle,
  menuOpen,
}: {
  onMenuToggle: () => void
  menuOpen: boolean
}) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-md bg-secondary text-foreground"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary tracking-wider">
            MEDTERM
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground">
            {"// AI AGENT CONTROL v2.4.1"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="hidden sm:flex items-center gap-1.5">
          <Shield className="h-3 w-3 text-primary" />
          <span>HIPAA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="h-3 w-3 text-primary" />
          <span className="hidden sm:inline">SECURE</span>
        </div>
        <span className="font-mono tabular-nums text-foreground">{time}</span>
      </div>
    </header>
  )
}
