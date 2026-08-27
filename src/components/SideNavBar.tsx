import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  GraduationCap, 
  FileQuestion, 
  LineChart, 
  Play, 
  Settings, 
  Award,
  Mic
} from 'lucide-react';
import { AppLanguage, OfficerProfile, TabType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { StatKarmayogiLogo } from './StatKarmayogiLogo';

interface SideNavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onStartTraining: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  language?: AppLanguage;
  user?: OfficerProfile;
  onOpenSettings?: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  setActiveTab,
  onStartTraining,
  isMobileOpen = false,
  setIsMobileOpen,
  onOpenSettings,
}) => {
  const { t } = useLanguage();

  const navSections = [
    {
      title: t('sidebar_core_workspace'),
      items: [
        { id: 'dashboard' as TabType, label: t('nav_dashboard'), icon: LayoutDashboard },
        { id: 'competency' as TabType, label: t('nav_competency'), icon: BarChart3 },
      ],
    },
    {
      title: t('sidebar_evaluation_viva'),
      items: [
        { id: 'viva' as TabType, label: t('nav_viva'), icon: Mic, badge: t('sidebar_badge_new') },
        { id: 'generator' as TabType, label: t('nav_generator'), icon: FileQuestion },
      ],
    },
    {
      title: t('sidebar_growth_telemetry'),
      items: [
        { id: 'igot' as TabType, label: t('nav_igot'), icon: GraduationCap },
        { id: 'analytics' as TabType, label: t('nav_analytics'), icon: LineChart },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          id="mobile-nav-backdrop"
          className="fixed inset-0 bg-slate-950/80 z-40 md:hidden backdrop-blur-md transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-[280px] bg-[#0f172a] text-slate-100 backdrop-blur-2xl border-r border-slate-800/80
        shadow-[4px_0_24px_rgba(0,0,0,0.3)] z-50 flex flex-col py-6 px-4 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand & Logo */}
        <div className="flex flex-col items-start gap-3 mb-5 px-1">
          <StatKarmayogiLogo size="md" variant="dark" />
          <div className="w-full h-px bg-slate-800/80 my-0.5" />
        </div>

        {/* CTA Button */}
        <div className="mb-5 px-1">
          <button 
            id="start-training-sidebar-btn"
            onClick={onStartTraining}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-bold text-xs transition-all duration-200 shadow-md hover:shadow-emerald-900/40 flex items-center justify-center gap-2 group border border-emerald-500/30"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white group-hover:scale-110 transition-transform" />
            <span>{t('sidebar_launch_diagnostic')}</span>
          </button>
        </div>

        {/* Grouped Navigation Sections */}
        <nav className="flex-1 space-y-5 overflow-y-auto pr-1 custom-scrollbar">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-1.5">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen?.(false);
                    }}
                    className={`
                      w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0f172a]
                      ${isActive 
                        ? 'text-white font-extrabold bg-gradient-to-r from-emerald-950/80 to-slate-900 border-l-4 border-emerald-400 shadow-sm ring-1 ring-emerald-500/20' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-500 text-slate-950 rounded shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom / Mission Karmayogi Badge & Settings */}
        <div className="border-t border-slate-800/80 pt-4 mt-auto space-y-2 px-1">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                {t('sidebar_mission_karmayogi')}
              </p>
              <p className="text-[10px] text-emerald-400/90 truncate font-medium">
                {t('sidebar_framework_aligned')}
              </p>
            </div>
          </div>

          <div className="pt-1">
            <button 
              id="sidebar-settings-btn"
              onClick={onOpenSettings}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 transition-all"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>{t('sidebar_settings_frameworks')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
