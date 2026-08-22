import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  GraduationCap, 
  FileQuestion, 
  LineChart, 
  Play, 
  Settings, 
  LogOut,
  Sparkles,
  Award,
  Mic
} from 'lucide-react';
import { AppLanguage, OfficerProfile, TabType } from '../types';

interface SideNavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onStartTraining: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  language?: AppLanguage;
  user?: OfficerProfile;
  onOpenLogin?: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  setActiveTab,
  onStartTraining,
  isMobileOpen = false,
  setIsMobileOpen,
  language = 'en',
  user,
  onOpenLogin,
}) => {
  const isHindi = language === 'hi';
  const isTamil = language === 'ta';

  const navSections = [
    {
      title: isTamil ? 'முக்கிய பணிப்பகுதி' : isHindi ? 'मुख्य कार्यक्षेत्र' : 'CORE WORKSPACE',
      items: [
        { id: 'dashboard' as TabType, label: isTamil ? 'டாஷ்போர்டு மேலோட்டம்' : isHindi ? 'अधिकारी अवलोकन' : 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'competency' as TabType, label: isTamil ? 'திறன் பகுப்பாய்வு' : isHindi ? 'दक्षता विश्लेषण' : 'Competency Matrix', icon: BarChart3 },
      ],
    },
    {
      title: isTamil ? 'AI மதிப்பீடு' : isHindi ? 'AI मूल्यांकन' : 'EVALUATION & VIVA',
      items: [
        { id: 'viva' as TabType, label: isTamil ? 'AI வாய்மொழித் தேர்வு' : isHindi ? 'AI मौखिक साक्षात्कार' : 'AI Viva Examiner', icon: Mic, badge: isTamil ? 'புதியது' : isHindi ? 'नया' : 'New' },
        { id: 'generator' as TabType, label: isTamil ? 'கையேடுகள் & வினாடி வினா' : isHindi ? 'मैनुअल प्रश्नोत्तरी' : 'Manuals & Quiz AI', icon: FileQuestion },
      ],
    },
    {
      title: isTamil ? 'கற்றல் & அளவீடு' : isHindi ? 'अधिगम एवं रिपोर्ट' : 'GROWTH & TELEMETRY',
      items: [
        { id: 'igot' as TabType, label: isTamil ? 'iGOT கற்றல் பாதை' : isHindi ? 'iGOT अधिगम मार्ग' : 'iGOT Learning Path', icon: GraduationCap },
        { id: 'analytics' as TabType, label: isTamil ? 'பகுப்பாய்வு & அறிக்கைகள்' : isHindi ? 'विश्लेषण एवं रिपोर्ट' : 'Analytics & Telemetry', icon: LineChart },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          id="mobile-nav-backdrop"
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-[280px] bg-[#f0ede6]/95 backdrop-blur-xl border-r border-[#e4ded2] 
        shadow-[0_4px_20px_rgba(28,27,24,0.04)] z-50 flex flex-col py-7 px-5 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand & Logo */}
        <div className="flex flex-col items-start gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
                StatKarmayogi <span className="text-emerald-800 font-extrabold text-[10px] px-1.5 py-0.5 bg-emerald-100 rounded border border-emerald-200">AI</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {isTamil ? 'MoSPI போர்டல்' : isHindi ? 'मोस्पी पोर्टल' : 'MoSPI Enterprise Portal'}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-slate-200/70 my-1" />
        </div>

        {/* CTA Button */}
        <div className="mb-5">
          <button 
            id="start-training-sidebar-btn"
            onClick={onStartTraining}
            className="w-full py-2.5 px-4 bg-[#0f172a] text-white rounded-xl font-bold text-xs hover:bg-[#1e293b] transition-all duration-200 shadow-xs hover:shadow flex items-center justify-center gap-2 group border border-slate-800"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>{isTamil ? 'விரைவு நோயறிதலைத் தொடங்கு' : isHindi ? 'त्वरित निदान आरंभ करें' : 'Launch Quick Diagnostic'}</span>
          </button>
        </div>

        {/* Grouped Navigation Sections */}
        <nav className="flex-1 space-y-5 overflow-y-auto pr-1 custom-scrollbar">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-1.5">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen?.(false);
                    }}
                    className={`
                      w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left
                      ${isActive 
                        ? 'text-[#006c4a] font-bold bg-[#006c4a]/10 border-l-3 border-[#006c4a] shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#006c4a]' : 'text-slate-400'}`} />
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-[#006c4a] text-white rounded shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom / Mission Karmayogi Badge & Footer */}
        <div className="border-t border-slate-200/80 pt-4 mt-auto space-y-2">
          <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200/60 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#006c4a] shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                {isTamil ? 'மிஷன் கர்மயோகி' : isHindi ? 'मिशन कर्मयोगी' : 'Mission Karmayogi'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {isTamil ? 'திறன் கட்டமைப்பு சீரமைக்கப்பட்டது' : isHindi ? 'दक्षता ढांचा संरेखित' : 'Competency Framework Aligned'}
              </p>
            </div>
          </div>

          <div className="space-y-0.5 pt-1">
            <button 
              id="sidebar-settings-btn"
              onClick={() => setActiveTab('analytics')}
              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>{isTamil ? 'அமைப்புகள் & கட்டமைப்புகள்' : isHindi ? 'सेटिंग्स एवं ढांचा' : 'Settings & Frameworks'}</span>
            </button>
            <button 
              id="sidebar-logout-btn"
              onClick={onOpenLogin || (() => alert("Officer session synced with Mission Karmayogi SSO."))}
              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>{isTamil ? 'அதிகாரியை மாற்று / உள்நுழைவு' : isHindi ? 'अधिकारी बदलें / लॉगिन' : 'Switch Officer / Login'}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
