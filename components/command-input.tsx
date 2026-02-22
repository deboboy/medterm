"use client"

import { useState, useRef, useEffect } from "react"
import { CornerDownLeft } from "lucide-react"
import { commandSuggestions } from "@/lib/agent-data"

export function CommandInput({
  onSubmit,
  commandHistory,
}: {
  onSubmit: (cmd: string) => void
  commandHistory: string[]
}) {
  const [value, setValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSuggestions = value.length > 0
    ? commandSuggestions.filter((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      )
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
      setValue("")
      setHistoryIndex(-1)
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      if (commandHistory[newIndex]) {
        setValue(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setValue(newIndex === -1 ? "" : commandHistory[newIndex])
    } else if (e.key === "Tab" && filteredSuggestions.length > 0) {
      e.preventDefault()
      setValue(filteredSuggestions[0])
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    setShowSuggestions(filteredSuggestions.length > 0 && value.length > 0)
  }, [filteredSuggestions.length, value])

  return (
    <div className="relative">
      {showSuggestions && (
        <div className="absolute bottom-full left-0 right-0 mb-1 border border-border rounded-md bg-card overflow-hidden z-10">
          {filteredSuggestions.slice(0, 4).map((suggestion) => (
            <button
              key={suggestion}
              className="w-full px-3 py-2 text-left text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              onMouseDown={(e) => {
                e.preventDefault()
                setValue(suggestion)
                setShowSuggestions(false)
                inputRef.current?.focus()
              }}
            >
              <span className="text-primary">{">"}</span> {suggestion}
            </button>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-card"
      >
        <span className="text-primary text-sm font-bold shrink-0">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command input"
        />
        <button
          type="submit"
          className="shrink-0 p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          aria-label="Execute command"
        >
          <CornerDownLeft className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  )
}
