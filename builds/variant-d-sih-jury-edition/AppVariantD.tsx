import React, { useState } from 'react';
import { SihJuryOverviewModal } from '../../src/components/SihJuryOverviewModal';
import { DashboardView } from '../../src/components/DashboardView';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { ToastProvider } from '../../src/context/ToastContext';
import { INITIAL_COMPETENCIES } from '../../src/data/mockData';
import { Award, ShieldCheck } from 'lucide-react';

/**
 * Variant D: Smart India Hackathon (SIH 2026) Jury Presentation & Live Evaluation Build
 * Standalone build isolated from circular dependencies for instant evaluation.
 */
export default function AppVariantD() {
  const [isJuryModalOpen, setIsJuryModalOpen] = useState<boolean>(true);

  return (
    <LanguageProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[#f5f3ee] text-slate-900 font-sans relative pb-12">
          {/* Top Banner Header */}
          <header className="bg-[#0b1329] text-white px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                SIH 2026 Jury Edition
              </span>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                MoSPI StatKarmayogi — Grand Finale Evaluation Sandbox
              </h1>
            </div>

            <button
              onClick={() => setIsJuryModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-extrabold text-xs rounded-xl shadow-md border border-amber-300 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-slate-950 fill-amber-300" />
              <span>Open SIH Jury Telemetry Deck</span>
            </button>
          </header>

          <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
            <DashboardView
              competencies={INITIAL_COMPETENCIES}
              setActiveTab={() => {}}
            />
          </main>

          {/* SIH Jury Overview & Evaluation Modal */}
          <SihJuryOverviewModal
            isOpen={isJuryModalOpen}
            onClose={() => setIsJuryModalOpen(false)}
          />
        </div>
      </ToastProvider>
    </LanguageProvider>
  );
}
