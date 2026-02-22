"use client"

import { cn } from "@/lib/utils"

export interface OutputLine {
  id: string
  type: "input" | "output" | "error" | "system"
  content: string
}

const typeStyles: Record<OutputLine["type"], string> = {
  input: "text-primary",
  output: "text-foreground",
  error: "text-destructive",
  system: "text-accent",
}

export function CommandOutput({ lines }: { lines: OutputLine[] }) {
  if (lines.length === 0) return null

  return (
    <div className="px-3 py-2 border-t border-border bg-secondary/20 max-h-40 overflow-y-auto terminal-scrollbar">
      {lines.map((line) => (
        <div key={line.id} className="flex gap-2 text-[11px] leading-relaxed py-0.5">
          <span className="shrink-0 text-muted-foreground">
            {line.type === "input" ? ">" : line.type === "error" ? "!" : "#"}
          </span>
          <span className={cn("break-words min-w-0", typeStyles[line.type])}>
            {line.content}
          </span>
        </div>
      ))}
    </div>
  )
}
