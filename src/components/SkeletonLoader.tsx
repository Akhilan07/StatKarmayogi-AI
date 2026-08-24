import React from 'react';

/**
 * Skeleton Loader Component Suite
 * Renders pulse shimmer skeletons while fetching AI assessments, telemetry, or documents.
 */

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse space-y-4">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      <div className="h-6 w-6 bg-slate-200 rounded-full"></div>
    </div>
    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
    <div className="space-y-2 pt-2">
      <div className="h-3 bg-slate-200 rounded w-full"></div>
      <div className="h-3 bg-slate-200 rounded w-4/5"></div>
    </div>
  </div>
);

export const QuizSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg animate-pulse space-y-6 max-w-4xl mx-auto">
    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
      <div className="h-5 bg-slate-200 rounded w-1/4"></div>
      <div className="h-5 bg-slate-200 rounded w-1/6"></div>
    </div>
    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
    <div className="space-y-3 pt-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-slate-100 rounded-xl border border-slate-200 w-full"></div>
      ))}
    </div>
    <div className="flex justify-between pt-6">
      <div className="h-10 bg-slate-200 rounded-xl w-28"></div>
      <div className="h-10 bg-slate-200 rounded-xl w-32"></div>
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
    <div className="bg-slate-50 p-4 border-b border-slate-200 flex gap-4">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
    </div>
    <div className="divide-y divide-slate-100 p-4 space-y-4">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex gap-4 items-center">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/5"></div>
          <div className="h-6 bg-slate-200 rounded-full w-16 ml-auto"></div>
        </div>
      ))}
    </div>
  </div>
);
