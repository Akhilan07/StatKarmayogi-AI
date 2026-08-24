import React from 'react';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

interface Error404PageProps {
  onReturnHome?: () => void;
}

export const Error404Page: React.FC<Error404PageProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-5 bg-amber-100 text-amber-700 rounded-3xl mb-6 shadow-inner border border-amber-200">
        <FileQuestion className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-slate-600 max-w-md mb-8 leading-relaxed">
        The requested MoSPI Karmayogi portal resource or module could not be found. It may have been moved or updated.
      </p>
      <button
        onClick={onReturnHome}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#006c4a] hover:bg-[#00553a] text-white font-semibold rounded-xl shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <Home className="w-5 h-5" />
        <span>Return to Officer Dashboard</span>
      </button>
    </div>
  );
};
