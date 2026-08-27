import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  UserCheck, 
  BrainCircuit, 
  Layers, 
  Lock, 
  Building2,
  BookOpen
} from 'lucide-react';
import { StatKarmayogiLogo } from './StatKarmayogiLogo';
import { OfficerProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageConfirmModal } from './LanguageConfirmModal';

interface LandingLoginPageProps {
  onLoginSuccess: (profile: OfficerProfile) => void;
}

const DEMO_OFFICERS: OfficerProfile[] = [
  {
    name: 'A. Sharma',
    role: 'Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    karmayogiId: 'KARM-MOSPI-88941',
    readinessScore: 68,
    karmaPoints: 750,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Senior Statistical Officer',
    division: 'Survey Design & Research Division (SDRD)',
    karmayogiId: 'KARM-MOSPI-99210',
    readinessScore: 82,
    karmaPoints: 1200,
  },
  {
    name: 'Priya Patel',
    role: 'Data Processing Assistant',
    division: 'Data Processing Division (DPD)',
    karmayogiId: 'KARM-MOSPI-44102',
    readinessScore: 54,
    karmaPoints: 420,
  },
  {
    name: 'Dr. Vikram Verma',
    role: 'Director / Joint Director',
    division: 'National Accounts Division (NAD)',
    karmayogiId: 'KARM-MOSPI-10001',
    readinessScore: 91,
    karmaPoints: 2100,
  },
];

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({ onLoginSuccess }) => {
  const { t, language, selectLanguage } = useLanguage();
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerProfile>(DEMO_OFFICERS[0]);
  const [activeTab, setActiveTab] = useState<'demo' | 'custom'>('demo');
  const [customId, setCustomId] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDemoLogin = (officer: OfficerProfile) => {
    onLoginSuccess(officer);
  };

  const handleCustomLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customId || !customPassword) {
      setErrorMsg('Please enter both Karmayogi ID and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ karmayogiId: customId, password: customPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        onLoginSuccess({
          name: data.user.name || customId,
          role: data.user.role || 'Statistical Officer',
          division: data.user.division || 'Field Operations Division (NSSO)',
          karmayogiId: data.user.karmayogiId || customId,
          readinessScore: 72,
          karmaPoints: 850,
        });
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setErrorMsg('Server connection failed. Logging in as custom officer.');
      onLoginSuccess({
        name: customId,
        role: 'Statistical Officer',
        division: 'MoSPI Enterprise Cadre',
        karmayogiId: customId.toUpperCase(),
        readinessScore: 70,
        karmaPoints: 500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-[#0f2942] selection:text-white font-sans">
      {/* Top Government Header & Language Switcher */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatKarmayogiLogo size="lg" variant="light" />
          </div>

          {/* Language Switcher Dropdown Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300 rounded-xl p-1 shadow-xs">
              <Globe className="w-4 h-4 text-[#0f2942] ml-2" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => selectLanguage(l.code as any)}
                  aria-label={`Switch to ${l.label}`}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    language === l.code
                      ? 'bg-[#0f2942] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero & Login Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Branding & Mission */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f2942]/10 border border-[#0f2942]/20 rounded-full text-[#0f2942] text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>National Statistical Systems Capacity Building Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f2942] tracking-tight leading-tight">
              {t('landing_hero_title')}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              {t('landing_hero_subtitle')}
            </p>

            {/* Core Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-xs hover:border-slate-300 transition-all">
                <div className="p-2 bg-emerald-50/40 text-emerald-700 rounded-lg shrink-0 border border-emerald-100/60">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t('feature_ai_gap_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1">{t('feature_ai_gap_desc')}</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-xs hover:border-slate-300 transition-all">
                <div className="p-2 bg-emerald-50/80 text-emerald-700 rounded-lg shrink-0 border border-emerald-100/90">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t('feature_igot_sync_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1">{t('feature_igot_sync_desc')}</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-xs hover:border-slate-300 transition-all">
                <div className="p-2 bg-emerald-100/50 text-emerald-700 rounded-lg shrink-0 border border-emerald-200/60">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t('feature_blooms_quiz_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1">{t('feature_blooms_quiz_desc')}</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-xs hover:border-slate-300 transition-all">
                <div className="p-2 bg-emerald-100/90 text-emerald-700 rounded-lg shrink-0 border border-emerald-200">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t('feature_viva_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1">{t('feature_viva_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated SSO Login Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-6 h-6 text-[#0f2942]" />
                  <h3 className="text-xl font-extrabold text-[#0f2942] tracking-tight">{t('landing_sso_title')}</h3>
                </div>
                <p className="text-xs text-slate-500">{t('landing_sso_subtitle')}</p>
              </div>

              {/* Login Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6 border border-slate-200">
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'demo'
                      ? 'bg-[#0f2942] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('landing_select_officer')}
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'custom'
                      ? 'bg-[#0f2942] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('landing_enter_custom')}
                </button>
              </div>

              {/* Tab 1: Demo Officer Profiles */}
              {activeTab === 'demo' && (
                <div className="space-y-3">
                  {DEMO_OFFICERS.map((officer) => (
                    <div
                      key={officer.karmayogiId}
                      onClick={() => setSelectedOfficer(officer)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedOfficer.karmayogiId === officer.karmayogiId
                          ? 'bg-[#0f2942]/5 border-[#0f2942] shadow-xs ring-1 ring-[#0f2942]'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0f2942] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                          {officer.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{officer.name}</h4>
                          <p className="text-xs text-slate-600">{officer.role}</p>
                          <p className="text-[11px] text-slate-500">{officer.division}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700">{officer.readinessScore}%</span>
                        <p className="text-[10px] text-slate-500">Readiness</p>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleDemoLogin(selectedOfficer)}
                    className="w-full mt-6 py-3.5 px-6 bg-[#0f2942] hover:bg-[#081a2b] text-white font-bold text-sm rounded-xl shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Enter Portal as {selectedOfficer.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tab 2: Custom Credentials Authentication */}
              {activeTab === 'custom' && (
                <form onSubmit={handleCustomLoginSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Karmayogi ID / Employee Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KARM-MOSPI-88941"
                      value={customId}
                      onChange={(e) => setCustomId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0f2942]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password / Session Secret
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={customPassword}
                      onChange={(e) => setCustomPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0f2942]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#0f2942] hover:bg-[#081a2b] text-white font-bold text-sm rounded-xl shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Authenticating...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>{t('landing_sign_in_btn')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 MoSPI StatKarmayogi Engine — Ministry of Statistics and Programme Implementation</p>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>DPDP Act 2023 Compliant</span>
            <span>•</span>
            <span>iGOT Karmayogi Single Sign-On</span>
          </div>
        </div>
      </footer>
      <LanguageConfirmModal />
    </div>
  );
};
