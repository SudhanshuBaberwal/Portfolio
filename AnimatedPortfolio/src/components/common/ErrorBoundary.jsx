import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary caught error]:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "48px 24px",
            color: "#fbece3",
            background: "#0b0b0b",
            textAlign: "center",
            fontFamily: "'Inter Tight', sans-serif",
            border: "1px dashed rgba(251, 236, 227, 0.2)",
            margin: "24px",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 500, margin: "0 0 8px 0" }}>
            Section currently unavailable.
          </p>
          <p style={{ fontSize: "14px", color: "rgba(251, 236, 227, 0.6)", margin: 0 }}>
            {this.props.fallbackMessage || "An unexpected issue occurred while rendering this section."}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
