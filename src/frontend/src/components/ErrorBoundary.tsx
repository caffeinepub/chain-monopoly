import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-sm w-full text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-lg text-foreground">
                Something went wrong
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1">
                An unexpected error occurred. Try reloading the page.
              </p>
            </div>
            {this.state.error && (
              <pre className="text-left text-xs text-muted-foreground bg-muted/40 border border-border rounded-md p-3 overflow-auto max-h-32 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleReset}
                data-ocid="error-boundary-retry"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.location.href = "/";
                }}
                data-ocid="error-boundary-home"
              >
                Go to lobby
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
