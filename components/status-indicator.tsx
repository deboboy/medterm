import { cn } from "@/lib/utils"

type Status = "online" | "idle" | "offline" | "error"

const statusConfig: Record<Status, { color: string; label: string }> = {
  online: { color: "bg-primary", label: "ONLINE" },
  idle: { color: "bg-accent", label: "IDLE" },
  offline: { color: "bg-muted-foreground", label: "OFFLINE" },
  error: { color: "bg-destructive", label: "ERROR" },
}

export function StatusIndicator({ status }: { status: Status }) {
  const config = statusConfig[status]
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("h-2 w-2 rounded-full", config.color, status === "online" && "animate-pulse-glow")} />
      <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
        {config.label}
      </span>
    </div>
  )
}
