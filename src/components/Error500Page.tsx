import React from 'react';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';

interface Error500PageProps {
  onRetry?: () => void;
  onReturnHome?: () => void;
}

export const Error500Page: React.FC<Error500PageProps> = ({ onRetry, onReturnHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-5 bg-rose-100 text-rose-700 rounded-3xl mb-6 shadow-inner border border-rose-200">
        <ServerCrash className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">500 - Server Exception</h1>
      <p className="text-lg text-slate-600 max-w-md mb-8 leading-relaxed">
        The MoSPI StatKarmayogi Engine encountered an unexpected internal exception. Technical telemetry has been recorded.
      </p>
      <div className="flex items-center gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#006c4a] hover:bg-[#00553a] text-white font-semibold rounded-xl shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Retry Request</span>
          </button>
        )}
        {onReturnHome && (
          <button
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl border border-slate-300 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        )}
      </div>
    </div>
  );
};
