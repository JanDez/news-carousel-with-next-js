type LogLevel = "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
}

/** Simple logging service - replace with Sentry/DataDog in production */
class Logger {
  private logs: LogEntry[] = []

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    }

    this.logs.push(entry)

    if (process.env.NODE_ENV === "development") {
      const prefix = { info: "ℹ️", warn: "⚠️", error: "❌" }[level]
      console[level](`${prefix} [${entry.timestamp}] ${message}`, context || "")
    }

    // In production, send to external service
    if (process.env.NODE_ENV === "production" && level === "error") {
      this.sendToExternalService(entry)
    }
  }

  private async sendToExternalService(entry: LogEntry) {
    // Replace with actual service (Sentry, DataDog, LogRocket, etc.)
    // Example: Sentry.captureException(new Error(entry.message), { extra: entry.context })
    
    // For now, log to console in production as fallback
    console.error("[PRODUCTION ERROR]", entry)
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", message, context)
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log("warn", message, context)
  }

  error(message: string, context?: Record<string, unknown>) {
    this.log("error", message, context)
  }

  /** Get recent logs for debugging */
  getRecentLogs(count = 10): LogEntry[] {
    return this.logs.slice(-count)
  }
}

export const logger = new Logger()
