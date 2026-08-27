import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Check, 
  Radar, 
  FileText,
  AlertCircle,
  Play,
  UserCheck,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
  ShieldCheck,
  Building2,
  Activity,
  ArrowUpRight,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { CompetencyDomain, OfficerProfile, TabType, AppLanguage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DashboardViewProps {
  competencies: CompetencyDomain[];
  setActiveTab: (tab: TabType) => void;
  onStartAssessmentForDomain?: (domainName: string) => void;
  user?: OfficerProfile;
  onOpenLogin?: () => void;
  language?: AppLanguage;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  competencies,
  setActiveTab,
  onStartAssessmentForDomain,
  user = {
    name: 'A. Sharma',
    role: 'Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    karmayogiId: 'KARM-MOSPI-88941',
    avatarUrl: '',
  },
  onOpenLogin,
}) => {
  const { t, language } = useLanguage();
  const isHindi = language === 'hi';
  const isTamil = language === 'ta';
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // Memoized aggregate readiness score calculations
  const { totalScore, targetScore, gapScore } = React.useMemo(() => {
    const avg = Math.round(
      competencies.reduce((acc, c) => acc + c.scorePercentage, 0) / (competencies.length || 1)
    );
    const target = 85;
    return { totalScore: avg, targetScore: target, gapScore: target - avg };
  }, [competencies]);

  // Radar chart mathematical points for a 6-axis polygon (radius 110)
  const axes = [
    { label: 'Survey Sampling', key: 'survey-sampling', score: 74, target: 100, status: 'Proficient', angleDeg: 270 },
    { label: 'CPI/IIP Calc.', key: 'cpi-iip', score: 80, target: 100, status: 'Proficient', angleDeg: 330 },
    { label: 'Data Validation*', key: 'data-val', score: 42, target: 100, status: 'Developing', angleDeg: 30 },
    { label: 'National Accounts', key: 'national-acc', score: 78, target: 100, status: 'Proficient', angleDeg: 90 },
    { label: 'Field Data Collect.', key: 'field-ops', score: 82, target: 100, status: 'Proficient', angleDeg: 150 },
    { label: 'Python/R Analytics*', key: 'analytics-prog', score: 38, target: 100, status: 'Critical Gap', angleDeg: 210 },
  ];

  const getPoint = (radius: number, angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.round(radius * Math.cos(angleRad));
    const y = Math.round(radius * Math.sin(angleRad));
    return { x, y };
  };

  const currentPointsString = axes
    .map((axis) => {
      const r = (axis.score / 100) * 110;
      const pt = getPoint(r, axis.angleDeg);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  const targetPointsString = axes
    .map((axis) => {
      const r = 0.85 * 110; // 85% target standard
      const pt = getPoint(r, axis.angleDeg);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  // Compute initials monogram
  const officerInitials = user.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const radialRadius = 45;
  const circumference = 2 * Math.PI * radialRadius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* 1. Header Bar with Enterprise Micro-Details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {isTamil ? 'iGOT கர்மயோகி தொலைநிலை அளவீடு • நேரலை இணைப்பு' : isHindi ? 'iGOT कर्मयोगी टेलीमेट्री • लाइव सिंक' : 'iGOT Karmayogi Telemetry • Live Sync'}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTamil ? 'அதிகாரி திறன் பணிப்பகுதி' : isHindi ? 'अधिकारी दक्षता कार्यक्षेत्र' : 'Officer Competency Workspace'}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 font-normal">
            {isTamil 
              ? 'புள்ளிவிவர முறைமை தயார்நிலை, குறைபாடுகள் மற்றும் தானியங்கி கற்றல் பாதைகள்.' 
              : isHindi 
              ? 'सांख्यिकी कार्यप्रणाली तत्परता, अंतर जांच, और स्वचालित शिक्षण पथ।' 
              : 'Statistical methodology readiness, gap scrutiny, and automated learning pathways for MoSPI cadre.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <RefreshCw className="w-3.5 h-3.5 text-[#0f2942]" />
            <span>{isTamil ? '2 நிமிடங்களுக்கு முன் புதுப்பிக்கப்பட்டது' : isHindi ? 'अद्यतन 2 मिनट पहले' : 'Updated 2m ago'}</span>
          </div>
          <button
            onClick={() => setActiveTab('generator')}
            className="px-4 py-2 bg-[#0f2942] hover:bg-[#081a2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white" />
            <span>{isTamil ? 'மதிப்பீட்டைத் தொடங்கு' : isHindi ? 'मूल्यांकन आरंभ करें' : 'Start Assessment'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Section: Overall Readiness Hero Card + Signature Karmayogi Officer Passport Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* HERO METRIC CARD (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Overall Cadre Readiness Score
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" /> +4.8% vs Q2
            </span>
          </div>

          <div className="my-6 flex items-center gap-6">
            {/* SVG Radial Progress Indicator */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r={radialRadius}
                  className="stroke-slate-100"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radialRadius}
                  className="stroke-emerald-600 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-slate-900 leading-none tracking-tight">{totalScore}%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Readiness</span>
              </div>
            </div>

            {/* Metric Details & Sparkline */}
            <div className="space-y-2 flex-1">
              <div>
                <p className="text-xs text-slate-600 font-medium">Target Benchmark: <strong className="text-slate-900">{targetScore}%</strong></p>
                <p className="text-xs text-slate-600 font-medium">Cadre Deficit Gap: <strong className="text-emerald-700">+{gapScore}%</strong></p>
              </div>

              {/* Mini Sparkline SVG */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold mb-1">
                  <span>6-Month Trajectory</span>
                  <span className="text-emerald-700 font-bold">+12% YTD</span>
                </div>
                <svg className="w-full h-7 overflow-visible" viewBox="0 0 120 20">
                  <path
                    d="M 0,16 L 24,14 L 48,11 L 72,13 L 96,7 L 120,3"
                    stroke="#059669"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0,16 L 24,14 L 48,11 L 72,13 L 96,7 L 120,3 V 20 H 0 Z"
                    fill="url(#sparkline-grad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">6 Competencies Assessed</span>
            <button
              onClick={() => setActiveTab('competency')}
              className="font-bold text-[#0f2942] hover:underline flex items-center gap-1"
            >
              <span>View Full Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SIGNATURE ELEMENT: MISSION KARMAYOGI OFFICER PASSPORT CARD (Col 7) */}
        <div className="lg:col-span-7 karmayogi-passport-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-white shadow-lg relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/15">
            <div className="flex items-center gap-4">
              {/* Monogram Officer Emblem */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center font-extrabold text-xl tracking-wider uppercase border border-white/20 shadow-inner shrink-0">
                {officerInitials}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">{user.name}</h3>
                  <span className="p-0.5 bg-emerald-500 text-white rounded-full" title="Verified MoSPI Civil Servant">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-semibold mt-0.5">{user.role}</p>
                <p className="text-xs text-slate-300 font-normal">{user.division}</p>
              </div>
            </div>

            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 backdrop-blur-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Switch Officer</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs space-y-1">
              <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">Karmayogi ID</span>
              <p className="text-xs font-mono font-bold text-white truncate">{user.karmayogiId || 'KARM-MOSPI-88941'}</p>
            </div>

            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs space-y-1">
              <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">Division Percentile</span>
              <p className="text-xs font-bold text-white">88th Percentile (FOD)</p>
            </div>

            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs space-y-1">
              <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">Active Certification</span>
              <p className="text-xs font-bold text-emerald-300">Level 4 Specialist</p>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-between text-xs text-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Mission Karmayogi Compliance:</strong> Verified Civil Services Standard</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-300">Ref: MoSPI 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Section 3: Interactive Diagnostic Radar Matrix & Key Gap Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RADAR DIAGNOSTIC MATRIX (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 space-y-4 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Competency Radar Diagnostic</h3>
              <p className="text-xs text-slate-500 font-normal">6 Core Statistical Operation Domains vs. NSSO Standard (85%)</p>
            </div>
            <Radar className="w-5 h-5 text-slate-400" />
          </div>

          <div className="relative flex items-center justify-center py-2">
            <svg className="w-full max-w-[380px] h-[290px] overflow-visible" viewBox="-150 -150 300 300">
              {/* Concentric Reference Rings */}
              {[0.25, 0.5, 0.75, 1.0].map((level) => (
                <circle
                  key={level}
                  cx="0"
                  cy="0"
                  r={level * 110}
                  className="stroke-slate-200"
                  strokeWidth="1"
                  strokeDasharray={level === 1 ? 'none' : '3,3'}
                  fill="none"
                />
              ))}

              {/* Radial Axis Lines */}
              {axes.map((axis) => {
                const pt = getPoint(110, axis.angleDeg);
                return (
                  <line
                    key={axis.key}
                    x1="0"
                    y1="0"
                    x2={pt.x}
                    y2={pt.y}
                    className="stroke-slate-200"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Benchmark Target Polygon (85% Standard) */}
              <polygon
                points={targetPointsString}
                className="stroke-slate-400"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                fill="none"
              />

              {/* Officer Actual Score Polygon */}
              <polygon
                points={currentPointsString}
                className="stroke-[#0f2942]"
                strokeWidth="2.5"
                fill="#0f2942"
                fillOpacity="0.12"
              />

              {/* Data Point Nodes on Axis */}
              {axes.map((axis) => {
                const r = (axis.score / 100) * 110;
                const pt = getPoint(r, axis.angleDeg);
                const labelPt = getPoint(135, axis.angleDeg);
                const isHovered = hoveredAxis === axis.key;
                const isCritical = axis.status === 'Critical Gap';

                return (
                  <g
                    key={axis.key}
                    onMouseEnter={() => setHoveredAxis(axis.key)}
                    onMouseLeave={() => setHoveredAxis(null)}
                    className="cursor-pointer transition-all"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? '7' : '5'}
                      className={
                        isCritical
                          ? 'fill-rose-600 stroke-white'
                          : 'fill-[#0f2942] stroke-white'
                      }
                      strokeWidth="2"
                    />
                    <text
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[10px] font-bold ${
                        isHovered ? 'fill-[#0f2942]' : 'fill-slate-600'
                      }`}
                    >
                      {axis.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-wrap justify-between items-center pt-2 text-xs text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#0f2942] rounded-xs" />
                <span>Officer Score</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border border-dashed border-slate-500 rounded-xs" />
                <span>NSSO Benchmark (85%)</span>
              </span>
            </div>
            <button
              onClick={() => setActiveTab('competency')}
              className="font-bold text-[#0f2942] hover:underline flex items-center gap-1"
            >
              <span>Explore Detailed Scrutiny</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* PRIORITY ACTION ROADMAP (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 space-y-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Priority Skill Actions</h3>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-full border border-amber-200">
                2 Scrutiny Items
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Python &amp; R Microdata Analytics</span>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-800 text-[10px] font-bold rounded-md border border-rose-200">
                    Critical Gap (38%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  Automated parsing routines for NSS 78th Round household schedules require Stata/Python script validation.
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-500">iGOT Course: PY-MOSPI-301</span>
                  <button
                    onClick={() => onStartAssessmentForDomain?.('Python & R Microdata Analytics')}
                    className="text-xs font-bold text-[#0f2942] hover:underline flex items-center gap-1"
                  >
                    <span>Launch Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">NSSO Data Quality Scrutiny</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-md border border-amber-200">
                    Moderate Gap (42%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  Cross-tabulation check algorithms and supervisory re-interview protocols under QA Manual V3.
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-500">Manual: NSSO-QA-V3</span>
                  <button
                    onClick={() => onStartAssessmentForDomain?.('Data Validation')}
                    className="text-xs font-bold text-[#0f2942] hover:underline flex items-center gap-1"
                  >
                    <span>Launch Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('igot')}
            className="w-full mt-4 py-3 bg-[#0f2942] hover:bg-[#081a2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Full iGOT Learning Pathway</span>
          </button>
        </div>
      </div>
    </div>
  );
};
