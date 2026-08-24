import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

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
      className="p-6 bg-rose-50 border border-rose-200 rounded-2xl max-w-lg mx-auto my-6 text-center shadow-sm"
    >
      <div className="p-3 bg-rose-100 text-rose-700 rounded-xl inline-block mb-3">
        <AlertOctagon className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-bold text-rose-950 mb-1">{title}</h4>
      <p className="text-sm text-rose-700 mb-5 leading-relaxed">{errorMessage}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-medium text-sm rounded-xl shadow transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Retry Operation</span>
      </button>
    </div>
  );
};
