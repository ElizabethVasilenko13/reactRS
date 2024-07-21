import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children?: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error">
            <h1>Sorry.. there was an error</h1>
            <p>Please reload the page</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
