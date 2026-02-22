"use client"

import { useState, useCallback } from "react"
import { TerminalHeader } from "@/components/terminal-header"
import { NavSidebar } from "@/components/nav-sidebar"
import { MetricsBar } from "@/components/metrics-bar"
import { AgentCard } from "@/components/agent-card"
import { LogViewer } from "@/components/log-viewer"
import { CommandInput } from "@/components/command-input"
import { CommandOutput, type OutputLine } from "@/components/command-output"
import { agents as initialAgents, logEntries as initialLogs } from "@/lib/agent-data"
import type { Agent, LogEntry } from "@/lib/agent-data"

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

function processCommand(
  cmd: string,
  agents: Agent[]
): { output: OutputLine[]; updatedAgents?: Agent[]; newLog?: LogEntry } {
  const parts = cmd.toLowerCase().split(" ")
  const action = parts[0]
  const target = parts[1]?.toUpperCase()

  switch (action) {
    case "status": {
      if (target === "ALL" || !target) {
        const lines = agents.map(
          (a) =>
            ({
              id: generateId(),
              type: "output" as const,
              content: `${a.codename.padEnd(12)} ${a.status.toUpperCase().padEnd(8)} tasks:${a.tasksToday} acc:${a.accuracy}%`,
            })
        )
        return { output: lines }
      }
      const agent = agents.find((a) => a.codename === target)
      if (!agent) {
        return {
          output: [
            { id: generateId(), type: "error", content: `Agent "${target}" not found` },
          ],
        }
      }
      return {
        output: [
          {
            id: generateId(),
            type: "output",
            content: `${agent.codename} | ${agent.status.toUpperCase()} | Model: ${agent.model} | Tasks: ${agent.tasksToday} | Accuracy: ${agent.accuracy}%`,
          },
        ],
      }
    }

    case "restart": {
      const agent = agents.find((a) => a.codename === target)
      if (!agent) {
        return {
          output: [
            { id: generateId(), type: "error", content: `Agent "${target}" not found` },
          ],
        }
      }
      const updatedAgents = agents.map((a) =>
        a.codename === target ? { ...a, status: "online" as const, lastActive: "now" } : a
      )
      return {
        output: [
          {
            id: generateId(),
            type: "system",
            content: `Restarting ${target}... done. Agent is now ONLINE.`,
          },
        ],
        updatedAgents,
        newLog: {
          id: generateId(),
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          agent: target,
          level: "info",
          message: `Agent restarted by operator`,
        },
      }
    }

    case "pause": {
      const agent = agents.find((a) => a.codename === target)
      if (!agent) {
        return {
          output: [
            { id: generateId(), type: "error", content: `Agent "${target}" not found` },
          ],
        }
      }
      const updatedAgents = agents.map((a) =>
        a.codename === target ? { ...a, status: "idle" as const } : a
      )
      return {
        output: [
          {
            id: generateId(),
            type: "system",
            content: `${target} paused. Agent status set to IDLE.`,
          },
        ],
        updatedAgents,
        newLog: {
          id: generateId(),
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          agent: target,
          level: "warn",
          message: `Agent paused by operator`,
        },
      }
    }

    case "resume": {
      const agent = agents.find((a) => a.codename === target)
      if (!agent) {
        return {
          output: [
            { id: generateId(), type: "error", content: `Agent "${target}" not found` },
          ],
        }
      }
      const updatedAgents = agents.map((a) =>
        a.codename === target ? { ...a, status: "online" as const, lastActive: "now" } : a
      )
      return {
        output: [
          {
            id: generateId(),
            type: "system",
            content: `${target} resumed. Agent is now ONLINE.`,
          },
        ],
        updatedAgents,
        newLog: {
          id: generateId(),
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          agent: target,
          level: "success",
          message: `Agent resumed by operator`,
        },
      }
    }

    case "metrics": {
      const online = agents.filter((a) => a.status === "online").length
      const total = agents.reduce((sum, a) => sum + a.tasksToday, 0)
      const avg = (
        agents.filter((a) => a.status !== "offline").reduce((s, a) => s + a.accuracy, 0) /
        agents.filter((a) => a.status !== "offline").length
      ).toFixed(1)
      return {
        output: [
          { id: generateId(), type: "output", content: `--- Daily Metrics Report ---` },
          { id: generateId(), type: "output", content: `Active agents: ${online}/${agents.length}` },
          { id: generateId(), type: "output", content: `Total tasks processed: ${total}` },
          { id: generateId(), type: "output", content: `Average accuracy: ${avg}%` },
          { id: generateId(), type: "output", content: `System health: ${online === agents.length ? "NOMINAL" : "DEGRADED"}` },
        ],
      }
    }

    case "config": {
      const agent = agents.find((a) => a.codename === target)
      if (!agent) {
        return {
          output: [
            { id: generateId(), type: "error", content: `Agent "${target}" not found` },
          ],
        }
      }
      return {
        output: [
          { id: generateId(), type: "output", content: `--- Config: ${agent.codename} ---` },
          { id: generateId(), type: "output", content: `Name: ${agent.name}` },
          { id: generateId(), type: "output", content: `Model: ${agent.model}` },
          { id: generateId(), type: "output", content: `Type: ${agent.type}` },
          { id: generateId(), type: "output", content: `Status: ${agent.status.toUpperCase()}` },
          { id: generateId(), type: "output", content: `ID: ${agent.id}` },
        ],
      }
    }

    case "help": {
      return {
        output: [
          { id: generateId(), type: "system", content: "Available commands:" },
          { id: generateId(), type: "output", content: "  status [agent|all]    Show agent status" },
          { id: generateId(), type: "output", content: "  restart <agent>       Restart an agent" },
          { id: generateId(), type: "output", content: "  pause <agent>         Pause an agent" },
          { id: generateId(), type: "output", content: "  resume <agent>        Resume a paused agent" },
          { id: generateId(), type: "output", content: "  config <agent>        Show agent configuration" },
          { id: generateId(), type: "output", content: "  metrics               Show daily metrics" },
          { id: generateId(), type: "output", content: "  clear                 Clear command output" },
          { id: generateId(), type: "output", content: "  help                  Show this message" },
        ],
      }
    }

    case "clear": {
      return { output: [] }
    }

    default: {
      return {
        output: [
          {
            id: generateId(),
            type: "error",
            content: `Unknown command: "${cmd}". Type "help" for available commands.`,
          },
        ],
      }
    }
  }
}

export default function TerminalDashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState("dashboard")
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)
  const [outputLines, setOutputLines] = useState<OutputLine[]>([
    {
      id: "init-1",
      type: "system",
      content: "MedTerm v2.4.1 initialized. Type \"help\" for commands.",
    },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [activeView, setActiveView] = useState<"agents" | "logs">("agents")

  const handleCommand = useCallback(
    (cmd: string) => {
      setCommandHistory((prev) => [cmd, ...prev])

      if (cmd.toLowerCase() === "clear") {
        setOutputLines([])
        return
      }

      const inputLine: OutputLine = { id: generateId(), type: "input", content: cmd }
      const result = processCommand(cmd, agents)

      setOutputLines((prev) => [...prev, inputLine, ...result.output])

      if (result.updatedAgents) {
        setAgents(result.updatedAgents)
      }

      if (result.newLog) {
        setLogs((prev) => [...prev, result.newLog!])
      }
    },
    [agents]
  )

  const handleNavigate = (id: string) => {
    setActiveNav(id)
    if (id === "agents") setActiveView("agents")
    else if (id === "logs") setActiveView("logs")
    else setActiveNav(id)
  }

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <TerminalHeader
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        menuOpen={menuOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <NavSidebar
          active={activeNav}
          onNavigate={handleNavigate}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <MetricsBar agents={agents} />

          {/* Mobile view toggle */}
          <div className="flex lg:hidden border-b border-border">
            <button
              onClick={() => setActiveView("agents")}
              className={`flex-1 py-2.5 text-xs font-bold tracking-wider text-center transition-colors ${
                activeView === "agents"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              AGENTS
            </button>
            <button
              onClick={() => setActiveView("logs")}
              className={`flex-1 py-2.5 text-xs font-bold tracking-wider text-center transition-colors ${
                activeView === "logs"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              LOGS
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Agents panel */}
            <div
              className={`flex-1 flex flex-col overflow-hidden ${
                activeView !== "agents" ? "hidden lg:flex" : "flex"
              }`}
            >
              <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-bold text-foreground tracking-wider">
                  REGISTERED AGENTS
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {agents.filter((a) => a.status === "online").length} active
                </span>
              </div>
              <div className="flex-1 overflow-y-auto terminal-scrollbar p-2 flex flex-col gap-2">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onCommand={handleCommand}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-border" />

            {/* Logs panel */}
            <div
              className={`lg:w-[380px] xl:w-[440px] flex flex-col overflow-hidden ${
                activeView !== "logs" ? "hidden lg:flex" : "flex flex-1"
              }`}
            >
              <LogViewer logs={logs} />
            </div>
          </div>

          <CommandOutput lines={outputLines} />
          <CommandInput
            onSubmit={handleCommand}
            commandHistory={commandHistory}
          />
        </main>
      </div>
    </div>
  )
}
