"use client"

import { useState } from "react"
import {
  Power,
  RotateCcw,
  Settings,
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Agent } from "@/lib/agent-data"
import { StatusIndicator } from "./status-indicator"

export function AgentCard({
  agent,
  onCommand,
}: {
  agent: Agent
  onCommand: (cmd: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  const borderColor =
    agent.status === "online"
      ? "border-primary/30"
      : agent.status === "error"
        ? "border-destructive/30"
        : agent.status === "idle"
          ? "border-accent/30"
          : "border-border"

  return (
    <div
      className={cn(
        "border rounded-md bg-card transition-all duration-200",
        borderColor
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center justify-between text-left"
        aria-expanded={expanded}
        aria-label={`${agent.name} agent details`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <StatusIndicator status={agent.status} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground truncate">
                {agent.codename}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                {agent.type}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {agent.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:block text-xs text-muted-foreground tabular-nums">
            {agent.lastActive}
          </span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 border-t border-border">
          <p className="text-xs text-muted-foreground mt-3 mb-3 leading-relaxed">
            {agent.description}
          </p>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex flex-col items-center p-2 rounded bg-secondary/50">
              <Zap className="h-3 w-3 text-accent mb-1" />
              <span className="text-xs font-bold text-foreground tabular-nums">
                {agent.tasksToday}
              </span>
              <span className="text-[10px] text-muted-foreground">tasks</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded bg-secondary/50">
              <Target className="h-3 w-3 text-primary mb-1" />
              <span className="text-xs font-bold text-foreground tabular-nums">
                {agent.accuracy}%
              </span>
              <span className="text-[10px] text-muted-foreground">accuracy</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded bg-secondary/50">
              <Clock className="h-3 w-3 text-muted-foreground mb-1" />
              <span className="text-xs font-bold text-foreground tabular-nums">
                {agent.responseTime}
              </span>
              <span className="text-[10px] text-muted-foreground">resp</span>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground mb-3">
            <span className="text-foreground">MODEL:</span> {agent.model}
            <span className="mx-2 text-border">|</span>
            <span className="text-foreground">ID:</span> {agent.id}
          </div>

          <div className="flex gap-2">
            {agent.status === "online" || agent.status === "idle" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCommand(`pause ${agent.codename}`)
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-[11px] bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Power className="h-3 w-3" />
                Pause
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCommand(`resume ${agent.codename}`)
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-[11px] bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
              >
                <Power className="h-3 w-3" />
                Resume
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCommand(`restart ${agent.codename}`)
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-[11px] bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Restart
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCommand(`config ${agent.codename}`)
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-[11px] bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Settings className="h-3 w-3" />
              Config
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
