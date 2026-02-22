export interface Agent {
  id: string
  name: string
  codename: string
  status: "online" | "idle" | "offline" | "error"
  type: string
  model: string
  lastActive: string
  tasksToday: number
  accuracy: number
  responseTime: string
  description: string
}

export interface LogEntry {
  id: string
  timestamp: string
  agent: string
  level: "info" | "warn" | "error" | "success"
  message: string
}

export const agents: Agent[] = [
  {
    id: "ag-001",
    name: "Diagnostic Assist",
    codename: "DX-ALPHA",
    status: "online",
    type: "Diagnostic",
    model: "MedLLM-4",
    lastActive: "now",
    tasksToday: 142,
    accuracy: 97.3,
    responseTime: "1.2s",
    description: "Differential diagnosis generation from patient symptoms and lab results",
  },
  {
    id: "ag-002",
    name: "Radiology Reader",
    codename: "RAD-SCAN",
    status: "online",
    type: "Imaging",
    model: "VisionMed-2",
    lastActive: "2m ago",
    tasksToday: 89,
    accuracy: 94.8,
    responseTime: "3.4s",
    description: "Automated radiology image analysis and preliminary reporting",
  },
  {
    id: "ag-003",
    name: "Rx Validator",
    codename: "RX-CHECK",
    status: "idle",
    type: "Pharmacy",
    model: "PharmAI-3",
    lastActive: "15m ago",
    tasksToday: 234,
    accuracy: 99.1,
    responseTime: "0.8s",
    description: "Drug interaction checking and dosage validation",
  },
  {
    id: "ag-004",
    name: "Triage Engine",
    codename: "TRI-SORT",
    status: "online",
    type: "Emergency",
    model: "MedLLM-4",
    lastActive: "now",
    tasksToday: 67,
    accuracy: 95.6,
    responseTime: "0.5s",
    description: "Emergency department patient triage and priority scoring",
  },
  {
    id: "ag-005",
    name: "Notes Scribe",
    codename: "DOC-WRITE",
    status: "error",
    type: "Documentation",
    model: "ScribeMed-1",
    lastActive: "1h ago",
    tasksToday: 12,
    accuracy: 91.2,
    responseTime: "—",
    description: "Automated clinical documentation from voice transcripts",
  },
  {
    id: "ag-006",
    name: "Lab Interpreter",
    codename: "LAB-READ",
    status: "offline",
    type: "Pathology",
    model: "LabAI-2",
    lastActive: "3h ago",
    tasksToday: 0,
    accuracy: 96.7,
    responseTime: "—",
    description: "Lab result interpretation and abnormal value flagging",
  },
]

export const logEntries: LogEntry[] = [
  {
    id: "l-001",
    timestamp: "14:32:07",
    agent: "DX-ALPHA",
    level: "success",
    message: "Differential diagnosis completed for patient #4821 — 3 candidates generated",
  },
  {
    id: "l-002",
    timestamp: "14:31:54",
    agent: "RAD-SCAN",
    level: "info",
    message: "Processing chest X-ray batch (12 images) from radiology dept",
  },
  {
    id: "l-003",
    timestamp: "14:31:22",
    agent: "RX-CHECK",
    level: "warn",
    message: "Flagged potential interaction: Warfarin + Amiodarone for patient #3392",
  },
  {
    id: "l-004",
    timestamp: "14:30:58",
    agent: "TRI-SORT",
    level: "info",
    message: "Triage assessment: Priority 2 assigned to incoming case ER-0892",
  },
  {
    id: "l-005",
    timestamp: "14:30:11",
    agent: "DOC-WRITE",
    level: "error",
    message: "Voice transcription service unavailable — retrying in 30s",
  },
  {
    id: "l-006",
    timestamp: "14:29:44",
    agent: "DX-ALPHA",
    level: "success",
    message: "Lab correlation analysis complete for patient #4817",
  },
  {
    id: "l-007",
    timestamp: "14:29:02",
    agent: "RAD-SCAN",
    level: "success",
    message: "CT scan analysis delivered for case #RAD-2241",
  },
  {
    id: "l-008",
    timestamp: "14:28:33",
    agent: "RX-CHECK",
    level: "info",
    message: "Prescription validated: Metformin 500mg BID for patient #3401",
  },
]

export const commandSuggestions = [
  "status all",
  "restart DOC-WRITE",
  "logs DX-ALPHA --tail 50",
  "config RAD-SCAN --model VisionMed-3",
  "pause TRI-SORT",
  "resume LAB-READ",
  "metrics --today",
  "audit RX-CHECK --last 24h",
]
