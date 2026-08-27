import React, { useState, useEffect } from 'react';
import { Layers, ShieldCheck, Zap, BookOpen, ChevronUp, ChevronDown, Check, Trophy } from 'lucide-react';

export type AppVariant = 'primary' | 'admin' | 'gamified' | 'rag' | 'sih';

interface DevVariantSwitcherProps {
  currentVariant: AppVariant;
  onSelectVariant: (variant: AppVariant) => void;
}

export const DevVariantSwitcher: React.FC<DevVariantSwitcherProps> = ({
  currentVariant,
  onSelectVariant,
}) => {
  const flag = (import.meta as any).env?.VITE_SHOW_VARIANT_SWITCHER;
  const isDev = (import.meta as any).env?.DEV;
  const showSwitcher = flag === 'true' || (isDev && flag !== 'false');
  if (!showSwitcher) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);

  const variants = [
    {
      id: 'primary' as AppVariant,
      name: 'Primary Build',
      tag: 'Baseline',
      desc: 'Base MoSPI StatKarmayogi enterprise portal',
      icon: ShieldCheck,
      color: 'bg-emerald-500',
    },
    {
      id: 'admin' as AppVariant,
      name: 'Variant A: Admin Heavy',
      tag: 'Leadership & Heatmaps',
      desc: 'Ministry/DIID view with expanded heatmaps & division deficit tracking',
      icon: Layers,
      color: 'bg-[#0f2942]',
    },
    {
      id: 'gamified' as AppVariant,
      name: 'Variant B: Officer Gamified',
      tag: 'Quizzes & Badges',
      desc: 'Interactive officer experience with streaks, micro-quizzes & XP',
      icon: Zap,
      color: 'bg-amber-600',
    },
    {
      id: 'rag' as AppVariant,
      name: 'Variant C: Live RAG Focus',
      tag: 'Split-screen RAG',
      desc: 'Split-screen PDF manual viewer & real-time live MCQ generator',
      icon: BookOpen,
      color: 'bg-teal-600',
    },
    {
      id: 'sih' as AppVariant,
      name: 'Variant D: SIH Jury Edition',
      tag: 'Grand Finale & Telemetry',
      desc: 'Smart India Hackathon 2026 presentation deck, telemetry & evaluation modal',
      icon: Trophy,
      color: 'bg-amber-500',
    },
  ];

  const active = variants.find((v) => v.id === currentVariant) || variants[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900 text-white rounded-2xl p-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Dev Variant Switcher
            </span>
            <span className="text-[10px] text-slate-400 font-mono">v2.4 Variant Sandbox</span>
          </div>

          <div className="space-y-1.5">
            {variants.map((v) => {
              const Icon = v.icon;
              const isSelected = currentVariant === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    onSelectVariant(v.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/80 shadow-inner'
                      : 'border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${v.color} text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{v.name}</h4>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug mt-0.5 line-clamp-1">{v.desc}</p>
                    <span className="inline-block text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.2 rounded mt-1">
                      {v.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 text-white border border-slate-700 shadow-xl hover:bg-slate-800 transition-all group"
      >
        <div className={`w-3 h-3 rounded-full ${active.color} ring-2 ring-white/20`} />
        <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
          {active.name}
        </span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
      </button>
    </div>
  );
};
