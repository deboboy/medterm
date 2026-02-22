"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import type { LogEntry } from "@/lib/agent-data"

const levelStyles: Record<LogEntry["level"], string> = {
  info: "text-foreground",
  warn: "text-accent",
  error: "text-destructive",
  success: "text-primary",
}

const levelLabels: Record<LogEntry["level"], string> = {
  info: "INF",
  warn: "WRN",
  error: "ERR",
  success: "OK ",
}

export function LogViewer({ logs }: { logs: LogEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs font-bold text-foreground tracking-wider">
          SYSTEM LOG
        </span>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {logs.length} entries
        </span>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto terminal-scrollbar p-2"
        role="log"
        aria-label="System activity log"
        aria-live="polite"
      >
        {logs.map((entry) => (
          <div key={entry.id} className="py-1 flex gap-2 text-[11px] leading-relaxed">
            <span className="text-muted-foreground tabular-nums shrink-0">
              {entry.timestamp}
            </span>
            <span
              className={cn(
                "font-bold shrink-0 w-6",
                levelStyles[entry.level]
              )}
            >
              {levelLabels[entry.level]}
            </span>
            <span className="text-accent shrink-0">[{entry.agent}]</span>
            <span className="text-muted-foreground break-words min-w-0">
              {entry.message}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1 py-1 text-[11px]">
          <span className="text-primary animate-blink">_</span>
          <span className="text-muted-foreground">awaiting input...</span>
        </div>
      </div>
    </div>
  )
}
