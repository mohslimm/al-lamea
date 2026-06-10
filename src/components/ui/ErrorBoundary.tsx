import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Dans une vraie app, on envoie ceci à Sentry/Datadog
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-[var(--bg-void)]">
          <div className="w-16 h-16 rounded-full bg-[rgba(239,68,68,0.1)] flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-display text-[var(--text-primary)] mb-4">Une erreur inattendue est survenue</h2>
          <p className="text-[var(--text-muted)] max-w-md mb-8">
            Notre système a rencontré un problème technique. L'équipe a été notifiée. Veuillez rafraîchir la page ou réessayer plus tard.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--gold)] text-[#1A1200] font-medium rounded-xl hover:bg-[var(--gold-light)] transition-colors"
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
