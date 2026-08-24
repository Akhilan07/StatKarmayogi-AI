import React from 'react';
import { Globe, Check, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../data/translations';

const LANGUAGE_LABELS: Record<LanguageCode, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  hi: { native: 'हिंदी', english: 'Hindi' },
  ta: { native: 'தமிழ்', english: 'Tamil' },
};

export const LanguageConfirmModal: React.FC = () => {
  const { 
    isConfirmModalOpen, 
    pendingLanguage, 
    confirmLanguageChange, 
    cancelLanguageChange,
    t 
  } = useLanguage();

  if (!isConfirmModalOpen || !pendingLanguage) return null;

  const targetLabel = LANGUAGE_LABELS[pendingLanguage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006c4a] flex items-center justify-center border border-emerald-200/80 shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Switch Language / भाषा बदलें / மொழி மாற்றம்
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">iGOT Karmayogi Multilingual Localization</p>
            </div>
          </div>
          <button
            onClick={cancelLanguageChange}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Text */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Are you sure you want to change the interface language to{' '}
            <strong className="text-[#006c4a] font-bold text-base">
              {targetLabel.native} ({targetLabel.english})
            </strong>?
          </p>
          <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-200/60">
            <p className="italic">हिंदी: क्या आप इंटरफ़ेस भाषा को {targetLabel.native} में बदलना चाहते हैं?</p>
            <p className="italic">தமிழ்: இணைப்பு மொழியை {targetLabel.native} ஆக மாற்ற விரும்புகிறீர்களா?</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={cancelLanguageChange}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={confirmLanguageChange}
            className="px-5 py-2.5 bg-[#006c4a] hover:bg-[#005137] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 border border-emerald-400/20"
          >
            <Check className="w-4 h-4 text-[#82f5c1]" />
            <span>{t('confirm')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
