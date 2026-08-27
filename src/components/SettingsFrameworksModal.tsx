import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  ShieldCheck, 
  Sliders, 
  Brain, 
  BookOpen, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Monitor, 
  Bell, 
  Palette,
  Volume2,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface SettingsFrameworksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsFrameworksModal: React.FC<SettingsFrameworksModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'karmayogi' | 'ai_engine' | 'manuals' | 'appearance'>('karmayogi');

  // State settings
  const [syncWithIGOT, setSyncWithIGOT] = useState<boolean>(true);
  const [bloomsWeights, setBloomsWeights] = useState({
    Remembering: 15,
    Understanding: 30,
    Applying: 30,
    Analyzing: 15,
    Evaluating: 10,
  });
  const [aiModel, setAiModel] = useState<string>('gemini-3.7-flash');
  const [defaultQuestions, setDefaultQuestions] = useState<number>(5);
  const [showCitations, setShowCitations] = useState<boolean>(true);
  const [highContrastSidebar, setHighContrastSidebar] = useState<boolean>(true);
  const [enableSound, setEnableSound] = useState<boolean>(true);
  const [enableNotifications, setEnableNotifications] = useState<boolean>(true);
  const [enabledManuals, setEnabledManuals] = useState<Record<string, boolean>>({
    'nss-78': true,
    'plfs-2024': true,
    'cpi-2012': true,
    'asi-vol1': true,
  });

  if (!isOpen) return null;

  const handleSave = () => {
    showToast('success', 'Settings & Framework preferences saved successfully!');
    onClose();
  };

  const handleReset = () => {
    setSyncWithIGOT(true);
    setAiModel('gemini-3.7-flash');
    setDefaultQuestions(5);
    setShowCitations(true);
    setHighContrastSidebar(true);
    setEnableSound(true);
    setEnableNotifications(true);
    showToast('info', 'Settings reset to official MoSPI defaults.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#0f172a] text-white flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Settings &amp; Frameworks Configuration
              </h2>
              <p className="text-xs text-emerald-400 font-medium">
                Mission Karmayogi FRAC Competency &amp; MoSPI Assessment Settings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body with Sidebar Tabs */}
        <div className="flex flex-1 overflow-hidden">
          {/* Settings Tabs Sidebar */}
          <div className="w-56 bg-slate-50 border-r border-slate-200 p-4 space-y-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('karmayogi')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'karmayogi'
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${activeTab === 'karmayogi' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Mission Karmayogi</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_engine')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'ai_engine'
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Brain className={`w-4 h-4 ${activeTab === 'ai_engine' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>AI Engine &amp; Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('manuals')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'manuals'
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'manuals' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Statistical Manuals</span>
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'appearance'
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Palette className={`w-4 h-4 ${activeTab === 'appearance' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Interface &amp; Theme</span>
            </button>
          </div>

          {/* Settings Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* 1. Mission Karmayogi Settings */}
            {activeTab === 'karmayogi' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                    iGOT Karmayogi 2.0 Integration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sync officer assessment outcomes with the National Programme for Civil Services Capacity Building (CBC).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-slate-900 block">
                      Auto-sync Competency Scores to iGOT Portal
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Transmits completed viva scores and manual assessments to KarmaPoints ledger.
                    </span>
                  </div>

                  <button
                    onClick={() => setSyncWithIGOT(!syncWithIGOT)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      syncWithIGOT ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        syncWithIGOT ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Bloom's Taxonomy Cognitive Distribution Weightings
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(bloomsWeights).map(([level, weight]) => (
                      <div key={level} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800">{level}</span>
                        <span className="text-xs font-mono font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                          {weight}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. AI Engine & Assessment Settings */}
            {activeTab === 'ai_engine' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                    AI Assessment Engine Configuration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize the underlying LLM model and item generation parameters.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">AI Reasoning Engine Model</label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="gemini-3.7-flash">Gemini 3.7 Flash (Recommended - MoSPI Tuned)</option>
                    <option value="gemini-3.6-flash">Gemini 3.6 Flash (Standard Speed)</option>
                    <option value="gemini-pro-rag">Gemini Pro RAG (Deep Manual Grounding)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">Default Questions Per Assessment</label>
                    <div className="flex gap-2">
                      {[5, 10, 20].map((num) => (
                        <button
                          key={num}
                          onClick={() => setDefaultQuestions(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                            defaultQuestions === num
                              ? 'bg-[#0f172a] text-white border-[#0f172a]'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {num} Questions
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">Explanations &amp; Citations</label>
                    <button
                      onClick={() => setShowCitations(!showCitations)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        showCitations
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <span>Show Official Clause Citations</span>
                      {showCitations ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Statistical Manual Presets */}
            {activeTab === 'manuals' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                    Active MoSPI Statistical Manual Presets
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select which statistical survey guidelines are indexed for question generation.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'nss-78', title: 'NSS 78th Round Instruction Manual', dept: 'NSSO (FOD/SDRD)' },
                    { id: 'plfs-2024', title: 'Periodic Labour Force Survey (PLFS)', dept: 'NSSO (Survey Division)' },
                    { id: 'cpi-2012', title: 'Consumer Price Index (CPI Base 2012=100)', dept: 'Price Statistics Division' },
                    { id: 'asi-vol1', title: 'Annual Survey of Industries (ASI Vol I)', dept: 'Industrial Statistics Wing' },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() =>
                        setEnabledManuals((prev) => ({ ...prev, [m.id]: !prev[m.id] }))
                      }
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <FileCheck className={`w-5 h-5 ${enabledManuals[m.id] ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{m.title}</p>
                          <p className="text-[10px] text-slate-500">{m.dept}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          enabledManuals[m.id]
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {enabledManuals[m.id] ? 'Indexed' : 'Disabled'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Interface & Sidebar Aesthetics */}
            {activeTab === 'appearance' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                    Interface Theme &amp; Accessibility
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize the portal aesthetics and sound preferences.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">
                      Executive Dark Navy Sidebar (High Contrast)
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Recommended for maximum legibility and professional portal appearance.
                    </span>
                  </div>

                  <button
                    onClick={() => setHighContrastSidebar(!highContrastSidebar)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      highContrastSidebar ? 'bg-[#0f172a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        highContrastSidebar ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Sound FX &amp; Audio</span>
                      <span className="text-[10px] text-slate-500">Interactive viva feedback sound</span>
                    </div>
                    <button
                      onClick={() => setEnableSound(!enableSound)}
                      className={`p-2 rounded-xl transition-colors ${
                        enableSound ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Notifications</span>
                      <span className="text-[10px] text-slate-500">Manual release alerts</span>
                    </div>
                    <button
                      onClick={() => setEnableNotifications(!enableNotifications)}
                      className={`p-2 rounded-xl transition-colors ${
                        enableNotifications ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Save &amp; Apply Preferences</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
