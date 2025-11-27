"use client"

import { Component, type ReactNode } from "react"
import { logger } from "@/lib/logger"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/** React error boundary for graceful error handling */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error("Error caught by boundary", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#1a1a1a" }}>
            Something went wrong
          </h2>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            We encountered an error loading this content.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
