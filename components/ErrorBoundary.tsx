import React from "react";

type ErrorBoundaryProps = {
  errorCallback?: (error: any) => void;
  fallbackComponent?: React.ReactNode;
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
  state = {
    hasError: false,
  };

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    !!this.props.errorCallback && this.props.errorCallback(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent || null;
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);
