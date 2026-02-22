import { Bot, Zap, AlertTriangle, TrendingUp } from "lucide-react"
import type { Agent } from "@/lib/agent-data"

export function MetricsBar({ agents }: { agents: Agent[] }) {
  const online = agents.filter((a) => a.status === "online").length
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksToday, 0)
  const errors = agents.filter((a) => a.status === "error").length
  const avgAccuracy =
    agents.filter((a) => a.status !== "offline").reduce((sum, a) => sum + a.accuracy, 0) /
    agents.filter((a) => a.status !== "offline").length

  const metrics = [
    {
      icon: Bot,
      label: "Active",
      value: `${online}/${agents.length}`,
      color: "text-primary",
    },
    {
      icon: Zap,
      label: "Tasks",
      value: totalTasks.toString(),
      color: "text-accent",
    },
    {
      icon: AlertTriangle,
      label: "Errors",
      value: errors.toString(),
      color: errors > 0 ? "text-destructive" : "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Avg Acc",
      value: `${avgAccuracy.toFixed(1)}%`,
      color: "text-primary",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 p-3 border-b border-border" role="region" aria-label="Agent metrics summary">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col items-center p-2 rounded bg-secondary/30"
        >
          <metric.icon className={`h-3.5 w-3.5 ${metric.color} mb-1`} />
          <span className="text-xs font-bold text-foreground tabular-nums">
            {metric.value}
          </span>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  )
}
