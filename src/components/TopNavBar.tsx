import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ShieldCheck, 
  Menu, 
  CheckCircle2, 
  BookOpen, 
  Globe, 
  Award, 
  Sparkles, 
  UserCheck, 
  FileText, 
  BarChart3, 
  GraduationCap, 
  Mic, 
  X, 
  Check, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { AppLanguage, OfficerProfile, TabType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../data/translations';

interface TopNavBarProps {
  onSearch?: (query: string) => void;
  onOpenHelp?: () => void;
  onToggleMobileNav?: () => void;
  setActiveTab: (tab: TabType) => void;
  targetScore: number;
  currentScore: number;
  language?: AppLanguage;
  onChangeLanguage?: (lang: AppLanguage) => void;
  karmaPoints?: number;
  user?: OfficerProfile;
  onOpenLogin?: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: 'Manual' | 'Competency' | 'Course' | 'Viva Topic';
  description: string;
  tab: TabType;
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: 's-1',
    title: 'NSS 78th Round Instruction Manual (Multiple Indicators)',
    category: 'Manual',
    description: 'Sampling design, FSU selection, hamlet-group formation, household listing',
    tab: 'generator',
  },
  {
    id: 's-2',
    title: 'Periodic Labour Force Survey (PLFS) Manual',
    category: 'Manual',
    description: 'Current Weekly Status (CWS), UPSS activity status, employment metrics',
    tab: 'generator',
  },
  {
    id: 's-3',
    title: 'Consumer Price Index (CPI Base 2012=100) Manual',
    category: 'Manual',
    description: 'Elementary aggregate formulation, Jevons geometric mean index formula',
    tab: 'generator',
  },
  {
    id: 's-4',
    title: 'Annual Survey of Industries (ASI Vol I) Operational Manual',
    category: 'Manual',
    description: 'Census vs Sample sector demarcation, factory audit and schedule scrutinization',
    tab: 'generator',
  },
  {
    id: 's-5',
    title: 'Survey Sampling & Multi-Stage Stratification',
    category: 'Competency',
    description: 'Primary Sampling Units (PSU), multipliers, SRSWOR, and PPSWR selection',
    tab: 'competency',
  },
  {
    id: 's-6',
    title: 'Automated Data Validation & Outlier Detection',
    category: 'Competency',
    description: 'Field data scrutiny, logical validation rules, and error imputation',
    tab: 'competency',
  },
  {
    id: 's-7',
    title: 'Automated Data Validation in Official Surveys',
    category: 'Course',
    description: 'iGOT Karmayogi module STAT-302 (4 Hours)',
    tab: 'igot',
  },
  {
    id: 's-8',
    title: 'AI Oral Viva Examiner - Survey Sampling Defense',
    category: 'Viva Topic',
    description: 'Interactive oral viva voce defense with Gemini 3.7 Flash board examiner',
    tab: 'viva',
  },
];

export const TopNavBar: React.FC<TopNavBarProps> = ({
  onSearch,
  onOpenHelp,
  onToggleMobileNav,
  setActiveTab,
  targetScore,
  currentScore,
  onChangeLanguage,
  karmaPoints = 750,
  user = {
    name: 'A. Sharma',
    role: 'Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    karmayogiId: 'KARM-MOSPI-88941',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
  },
  onOpenLogin,
}) => {
  const { language, selectLanguage } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const languageOptions = [
    { code: 'en' as AppLanguage, label: 'English', badge: 'EN' },
    { code: 'hi' as AppLanguage, label: 'हिंदी', badge: 'HI' },
    { code: 'ta' as AppLanguage, label: 'தமிழ்', badge: 'TA' },
  ];

  const currentOption = languageOptions.find((l) => l.code === language) || languageOptions[0];

  const notifications = [
    {
      id: 'n-1',
      title: 'New Manual Available',
      text: 'NSS 78th Round Instruction Manual Vol-I uploaded with 348 scrutinized sections.',
      time: '10m ago',
      unread: true,
      action: 'generator' as TabType,
    },
    {
      id: 'n-2',
      title: 'Competency Milestone',
      text: 'Your Survey Sampling score is at Level 3/5. Target score is 85%.',
      time: '1h ago',
      unread: true,
      action: 'competency' as TabType,
    },
    {
      id: 'n-3',
      title: 'iGOT Course Recommendation',
      text: 'Data Validation Standards 2026 course has been refreshed with new anomaly traps.',
      time: '1d ago',
      unread: false,
      action: 'igot' as TabType,
    }
  ];

  // Filter search results
  const filteredSearchResults = searchQuery.trim().length > 0
    ? SEARCH_DATABASE.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectSearchResult = (item: SearchItem) => {
    setActiveTab(item.tab);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredSearchResults.length > 0) {
      handleSelectSearchResult(filteredSearchResults[0]);
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] z-40 bg-[#f5f3ee]/95 backdrop-blur-xl border-b border-[#e4ded2] shadow-xs flex justify-between items-center h-16 px-4 md:px-8 transition-all">
      {/* Left: Mobile Menu Toggle & Global Search Bar */}
      <div className="flex items-center gap-3 relative">
        <button
          id="mobile-nav-toggle-btn"
          onClick={onToggleMobileNav}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-200/70 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 font-bold text-slate-800 text-sm">
          <span className="text-slate-400 font-normal">Ministry of Statistics & Programme Implementation</span>
        </div>

        {/* Global Search Input & Dropdown Overlay */}
        <div className="relative hidden lg:block ml-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder={
                language === 'hi' 
                  ? 'दक्षता, नियम और मैनुअल खोजें...' 
                  : language === 'ta'
                  ? 'தேடல் கையேடுகள் மற்றும் திறன்கள்...'
                  : 'Search competencies, manuals, NSS rules...'
              }
              className="pl-9 pr-8 py-1.5 rounded-full border border-slate-200 bg-white/90 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#006c4a] focus:border-[#006c4a] w-72 transition-all shadow-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Search Dropdown Results Overlay */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-100 px-2">
                <span className="font-bold text-xs text-slate-800">
                  Search Results ({filteredSearchResults.length})
                </span>
                <span className="text-[10px] text-slate-400">Click item to open</span>
              </div>

              <div className="space-y-1.5 max-h-80 overflow-y-auto">
                {filteredSearchResults.length > 0 ? (
                  filteredSearchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSearchResult(item)}
                      className="p-2.5 rounded-xl cursor-pointer hover:bg-emerald-50/80 transition-colors border border-transparent hover:border-emerald-200 flex items-start gap-2.5"
                    >
                      <span className="p-1.5 bg-slate-100 text-[#006c4a] rounded-lg shrink-0 mt-0.5">
                        {item.category === 'Manual' && <FileText className="w-4 h-4" />}
                        {item.category === 'Competency' && <BarChart3 className="w-4 h-4" />}
                        {item.category === 'Course' && <GraduationCap className="w-4 h-4" />}
                        {item.category === 'Viva Topic' && <Mic className="w-4 h-4" />}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{item.title}</h5>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No results found for "{searchQuery}". Try searching "NSS", "CPI", or "Sampling".
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Language Switcher Dropdown, KarmaPoints, Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Language Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-all shadow-xs"
            title="Switch Language / भाषा बदलें / மொழி மாற்றம்"
          >
            <Globe className="w-3.5 h-3.5 text-[#006c4a]" />
            <span>{currentOption.label}</span>
            <span className="bg-[#006c4a] text-white text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
              {currentOption.badge}
            </span>
          </button>

          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-slate-100">
                Select Interface Language
              </div>
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setIsLangDropdownOpen(false);
                    selectLanguage(opt.code as LanguageCode);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                    language === opt.code
                      ? 'bg-emerald-50 text-[#006c4a] border border-emerald-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{opt.label}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {opt.badge}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* KarmaPoints Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-extrabold" title="iGOT KarmaPoints">
          <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{karmaPoints} KarmaPts</span>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#006c4a] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Mission Karmayogi</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            id="topbar-notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-[#006c4a] hover:bg-emerald-50 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-900">Official Notifications</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">2 New</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setActiveTab(n.action);
                      setShowNotifications(false);
                    }}
                    className={`p-2 rounded-lg cursor-pointer transition-colors text-left ${n.unread ? 'bg-emerald-50/60 hover:bg-emerald-50' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-slate-900">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Modal Trigger */}
        <button
          id="topbar-help-btn"
          onClick={() => setShowHelpModal(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-[#006c4a] hover:bg-emerald-50 transition-colors"
          title="MoSPI Competency Framework Guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />

        {/* Officer Profile Pill */}
        <div 
          onClick={onOpenLogin || (() => setActiveTab('dashboard'))}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity pl-1 group"
          title="Click to Switch Officer Profile"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-[#006c4a] transition-colors">{user.name}</p>
            <p className="text-[10px] text-slate-500 font-medium truncate max-w-[140px]">{user.role}</p>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-[#006c4a] text-white flex items-center justify-center font-bold text-xs tracking-wider uppercase ring-2 ring-emerald-600/30 group-hover:ring-emerald-600 transition-all shadow-xs">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'MO'}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Framework Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-[#006c4a]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">MoSPI Assessment &amp; Bloom's Taxonomy Guide</h3>
                  <p className="text-xs text-slate-500">Integrated with Mission Karmayogi Guidelines</p>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>StatKarmayogi AI</strong> evaluates MoSPI officers using official survey guidelines and Bloom's Taxonomy cognitive levels:
              </p>
              <ul className="list-disc list-inside space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <li><strong>1. Remembering:</strong> Recalling definitions, PSU concepts, and survey years.</li>
                <li><strong>2. Understanding:</strong> Explaining sampling procedures &amp; stratification rules.</li>
                <li><strong>3. Applying:</strong> Calculating CPI elementary weights &amp; sample multipliers.</li>
                <li><strong>4. Analyzing:</strong> Detecting field data anomalies &amp; scrutiny traps.</li>
                <li><strong>5. Evaluating:</strong> Formulating imputation &amp; quality control protocols.</li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
