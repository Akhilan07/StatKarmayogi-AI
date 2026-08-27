import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global React Error Boundary
 * Catches unhandled component runtime exceptions and presents a graceful recovery UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[React Error Boundary Caught Exception]:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="p-8 bg-white border border-slate-200 rounded-3xl max-w-xl mx-auto my-12 text-center shadow-xl space-y-4 font-sans"
        >
          <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {this.props.fallbackTitle || 'Component Rendering Error'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering exception occurred in this view module.'}
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Retry Rendering</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface RetryCardProps {
  title?: string;
  errorMessage: string;
  onRetry: () => void;
}

export const RetryCard: React.FC<RetryCardProps> = ({
  title = 'Service Communication Issue',
  errorMessage,
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className="p-6 bg-rose-50 border border-rose-200 rounded-2xl max-w-lg mx-auto my-6 text-center shadow-sm space-y-3 font-sans"
    >
      <div className="p-3 bg-rose-100 text-rose-700 rounded-xl inline-block">
        <AlertOctagon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-rose-950">{title}</h4>
      <p className="text-xs text-rose-700 leading-relaxed">{errorMessage}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl shadow transition-all active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Retry Operation</span>
      </button>
    </div>
  );
};
