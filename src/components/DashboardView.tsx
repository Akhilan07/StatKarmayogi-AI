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
  Zap,
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
  language = 'en',
}) => {
  const isHindi = language === 'hi';
  const isTamil = language === 'ta';
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // Compute aggregate readiness score
  const totalScore = Math.round(
    competencies.reduce((acc, c) => acc + c.scorePercentage, 0) / competencies.length
  );
  const targetScore = 85;
  const gapScore = targetScore - totalScore;

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

  // Compute initials monogram (e.g., "A. Sharma" -> "AS", "Balaji Baratheon" -> "BB")
  const officerInitials = user.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'MO';

  // SVG Radial Progress Ring math
  const radialRadius = 46;
  const circumference = 2 * Math.PI * radialRadius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* 1. Header Bar with Enterprise Micro-Details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#006c4a]">
              {isTamil ? 'iGOT கர்மயோகி தொலைநிலை அளவீடு • நேரலை இணைப்பு' : isHindi ? 'iGOT कर्मयोगी टेलीमेट्री • लाइव सिंक' : 'iGOT Karmayogi Telemetry • Live Sync'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTamil ? 'அதிகாரி திறன் பணிப்பகுதி' : isHindi ? 'अधिकारी दक्षता कार्यक्षेत्र' : 'Officer Competency Workspace'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isTamil 
              ? 'புள்ளிவிவர முறைமை தயார்நிலை, குறைபாடுகள் மற்றும் தானியங்கி கற்றல் பாதைகள்.' 
              : isHindi 
              ? 'सांख्यिकी कार्यप्रणाली तत्परता, अंतर जांच, और स्वचालित शिक्षण पथ।' 
              : 'Statistical methodology readiness, gap scrutiny, and automated learning pathways for MoSPI cadre.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <RefreshCw className="w-3.5 h-3.5 text-[#006c4a]" />
            <span>{isTamil ? '2 நிமிடங்களுக்கு முன் புதுப்பிக்கப்பட்டது' : isHindi ? 'अद्यतन 2 मिनट पहले' : 'Updated 2m ago'}</span>
          </div>
          <button
            onClick={() => setActiveTab('generator')}
            className="px-4 py-2 bg-[#006c4a] hover:bg-[#005137] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-300" />
            <span>{isTamil ? 'மதிப்பீட்டைத் தொடங்கு' : isHindi ? 'मूल्यांकन आरंभ करें' : 'Start Assessment'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Section: Prominent Radial Gauge Hero Metric + Officer Credential Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* HERO METRIC CARD (Col 5) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border border-[#e4ded2]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Overall Cadre Readiness Score
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006c4a] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" /> +4.8% vs Q2
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
                  className="stroke-slate-200/80"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radialRadius}
                  className="stroke-[#006c4a] transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">{totalScore}%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Readiness</span>
              </div>
            </div>

            {/* Metric Details & Sparkline */}
            <div className="space-y-2 flex-1">
              <div>
                <p className="text-xs text-slate-500 font-medium">Target Benchmark: <strong className="text-slate-900">{targetScore}%</strong></p>
                <p className="text-xs text-slate-500 font-medium">Cadre Deficit Gap: <strong className="text-[#006c4a]">+{gapScore}%</strong></p>
              </div>

              {/* Mini Sparkline SVG */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                  <span>6-Month Trajectory</span>
                  <span className="text-emerald-700">72% ➔ {totalScore}%</span>
                </div>
                <svg className="w-full h-7 stroke-[#006c4a] fill-emerald-500/10" viewBox="0 0 120 30">
                  <path
                    d="M 0,22 Q 20,18 40,24 T 80,12 T 120,6 L 120,30 L 0,30 Z"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0,22 Q 20,18 40,24 T 80,12 T 120,6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
            <span className="text-slate-500">6 Competencies Assessed</span>
            <button
              onClick={() => setActiveTab('competency')}
              className="font-bold text-[#006c4a] hover:text-[#005137] flex items-center gap-1"
            >
              <span>View Full Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* OFFICER CREDENTIAL & DIVISION CARD (Col 7) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#e4ded2] relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200/70">
            <div className="flex items-center gap-4">
              {/* Monogram Badge instead of stock photo */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f172a] via-slate-800 to-[#006c4a] text-white flex items-center justify-center font-extrabold text-xl tracking-wider uppercase shadow-md ring-2 ring-emerald-600/20 shrink-0">
                {officerInitials}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{user.name}</h3>
                  <span className="p-0.5 bg-emerald-100 text-[#006c4a] rounded-full" title="Verified MoSPI Officer">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">{user.role}</p>
                <p className="text-xs text-slate-400 font-medium">{user.division}</p>
              </div>
            </div>

            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#006c4a]" />
                <span>Switch Officer</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            <div className="p-3.5 bg-white/80 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Karmayogi ID</span>
              <p className="text-xs font-mono font-bold text-slate-900 truncate">{user.karmayogiId || 'KARM-MOSPI-88941'}</p>
            </div>

            <div className="p-3.5 bg-white/80 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Division Percentile</span>
              <p className="text-xs font-bold text-slate-900">88th Percentile (FOD)</p>
            </div>

            <div className="p-3.5 bg-white/80 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Active Certification</span>
              <p className="text-xs font-bold text-[#006c4a]">Level 4 Specialist</p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#006c4a] shrink-0" />
              <span><strong>Mission Karmayogi Compliance:</strong> 100% Verified Civil Services Standard</span>
            </div>
            <span className="text-[11px] font-bold text-[#006c4a]">Ref: MoSPI 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Section 3: Interactive Diagnostic Polygon & Key Gap Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RADAR DIAGNOSTIC MATRIX (Col 7) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 space-y-4 border border-[#e4ded2]">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/70">
            <div>
              <h3 className="text-base font-bold text-slate-900">Competency Mapping &amp; NSS Standard</h3>
              <p className="text-xs text-slate-500">6 Core Statistical Operation Domains vs. NSSO Standard (85%)</p>
            </div>
            <Radar className="w-5 h-5 text-slate-400" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
            {/* SVG Radar Chart */}
            <div className="w-64 h-64 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="-150 -150 300 300">
                {/* Background Concentric Circles */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                  <circle
                    key={i}
                    r={110 * scale}
                    fill="none"
                    stroke="#e4ded2"
                    strokeWidth="1"
                    strokeDasharray={scale === 1 ? 'none' : '3 3'}
                  />
                ))}

                {/* Axes Lines */}
                {axes.map((axis, i) => {
                  const pt = getPoint(110, axis.angleDeg);
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="0"
                      x2={pt.x}
                      y2={pt.y}
                      stroke="#e4ded2"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Target Benchmark Standard Polygon (85%) */}
                <polygon
                  points={targetPointsString}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Current Officer Score Polygon */}
                <polygon
                  points={currentPointsString}
                  fill="rgba(0, 108, 74, 0.18)"
                  stroke="#006c4a"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                {axes.map((axis, i) => {
                  const r = (axis.score / 100) * 110;
                  const pt = getPoint(r, axis.angleDeg);
                  return (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      className={axis.score < 50 ? 'fill-amber-500 stroke-white stroke-2' : 'fill-[#006c4a] stroke-white stroke-2'}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Competency Heatmap Dots Breakdown */}
            <div className="space-y-2.5 flex-1 w-full">
              {axes.map((axis) => (
                <div
                  key={axis.key}
                  onClick={() => onStartAssessmentForDomain && onStartAssessmentForDomain(axis.label)}
                  className="p-2.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      axis.score >= 75 ? 'bg-emerald-500' : axis.score >= 50 ? 'bg-amber-500' : 'bg-red-500 animate-pulse'
                    }`} />
                    <span className="text-xs font-semibold text-slate-800">{axis.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{axis.score}%</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      axis.score >= 75 ? 'bg-emerald-100 text-[#006c4a]' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {axis.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRIORITY SKILL DEFICITS & ACTION TRAPS (Col 5) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 space-y-4 border border-[#e4ded2] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/70">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Critical Skill Deficits</h3>
              </div>
              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                2 Action Items
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white/90 rounded-2xl border border-amber-200/80 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Data Validation &amp; Scrutiny
                  </span>
                  <span className="text-slate-500 font-semibold">42% (Deficit: -38%)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deficits in NSS 78th Round outlier detection and household schedule scrutiny rules.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold">Rec: iGOT-STAT-302</span>
                  <button
                    onClick={() => setActiveTab('igot')}
                    className="font-bold text-[#006c4a] hover:underline flex items-center gap-1"
                  >
                    <span>Enroll Course</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white/90 rounded-2xl border border-amber-200/80 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-amber-800 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Python / R Analytics
                  </span>
                  <span className="text-slate-500 font-semibold">38% (Deficit: -42%)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Microdata parsing and automated ETL scripts for ASI industrial survey schedules.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold">Rec: iGOT-STAT-410</span>
                  <button
                    onClick={() => setActiveTab('igot')}
                    className="font-bold text-[#006c4a] hover:underline flex items-center gap-1"
                  >
                    <span>Enroll Course</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70">
            <button
              onClick={() => setActiveTab('generator')}
              className="w-full py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Generate AI Assessment for Deficit Areas</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Section 4: Active iGOT Learning Objectives & Recent Telemetry Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ACTIVE LEARNING OBJECTIVES (Col 7) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 space-y-4 border border-[#e4ded2]">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/70">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#006c4a]" />
              <h3 className="text-base font-bold text-slate-900">Current Learning Objectives</h3>
            </div>
            <button
              onClick={() => setActiveTab('igot')}
              className="text-xs font-bold text-[#006c4a] hover:underline flex items-center gap-1"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">Advanced Python for Large Datasets</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-[#006c4a] rounded">In Progress</span>
                </div>
                <p className="text-[11px] text-slate-500">Focus: Microdata Parsing &amp; Anomaly Cleaning (12 / 24 hrs)</p>
                <div className="w-48 bg-slate-200 rounded-full h-1.5 overflow-hidden mt-2">
                  <div className="bg-[#006c4a] h-1.5 rounded-full w-1/2" />
                </div>
              </div>

              <button
                onClick={() => setActiveTab('igot')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg shrink-0"
              >
                Resume
              </button>
            </div>

            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">NSSO Data Quality Assurance Manual V3</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">Assigned</span>
                </div>
                <p className="text-[11px] text-slate-500">Focus: Core Protocols &amp; Anomaly Traps (0 / 8 hrs)</p>
              </div>

              <button
                onClick={() => setActiveTab('igot')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg shrink-0"
              >
                Start
              </button>
            </div>
          </div>
        </div>

        {/* RECENT TELEMETRY STREAM (Col 5) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 space-y-4 border border-[#e4ded2]">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/70">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#006c4a]" />
              <h3 className="text-base font-bold text-slate-900">Recent Telemetry Activity</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">Real-time Stream</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-white/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">NSS 78th Round Manual Assessment</p>
                <p className="text-[11px] text-slate-500">Yesterday, 04:30 PM • 5 Questions</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-[#006c4a] font-extrabold rounded-lg">
                80% Pass
              </span>
            </div>

            <div className="p-3.5 bg-white/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">AI Viva Voice Defense (CPI Elementary)</p>
                <p className="text-[11px] text-slate-500">Aug 20, 2026 • 3 Board Turns</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-[#006c4a] font-extrabold rounded-lg">
                82% Distinction
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
