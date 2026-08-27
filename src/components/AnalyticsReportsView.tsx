import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart3, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  Download, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Zap,
  Lock,
  Users,
  PieChart,
  Brain,
  Sliders,
  Check,
  ChevronRight,
  Target
} from 'lucide-react';
import { AssessmentResult, CompetencyDomain, OfficerProfile } from '../types';
import { DIVISION_METRICS, MASTERY_BADGES } from '../data/mockData';

interface AnalyticsReportsViewProps {
  competencies: CompetencyDomain[];
  assessmentHistory: AssessmentResult[];
  onOpenReport: (res: AssessmentResult) => void;
  user?: OfficerProfile;
}

export const AnalyticsReportsView: React.FC<AnalyticsReportsViewProps> = ({
  competencies,
  assessmentHistory,
  onOpenReport,
  user = {
    name: 'A. Sharma',
    role: 'Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    karmayogiId: 'KARM-MOSPI-88941',
    readinessScore: 78,
  },
}) => {
  const [viewMode, setViewMode] = useState<'learner' | 'admin'>('learner');

  // Compute dynamic score based on active officer profile
  const overallScore = user.readinessScore ?? Math.round(
    competencies.reduce((acc, c) => acc + c.scorePercentage, 0) / (competencies.length || 1)
  );

  const accuracy = Math.min(98.5, Math.max(52, Math.round(overallScore * 1.08 * 10) / 10));
  const percentile = overallScore >= 85 ? '92nd' : overallScore >= 75 ? '88th' : overallScore >= 60 ? '68th' : '45th';
  const bloomsLevel = overallScore >= 80 ? 'Level 4' : overallScore >= 65 ? 'Level 3' : 'Level 2';

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Assessment Title,Target Role,Difficulty,Score Percentage,Total Questions,Date\n";
    assessmentHistory.forEach((r) => {
      csvContent += `"${r.id}","${r.title.replace(/"/g, '""')}","${r.targetRole}","${r.difficulty}",${r.percentage},${r.totalQuestions},"${r.timestamp}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MoSPI_Competency_Telemetry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0f2942]">
              Officer Telemetry: {user.name} ({user.karmayogiId})
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Analytics &amp; Intelligence Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Real-time assessment telemetry, workforce capacity building, and predictive competency analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Learner vs Admin Mode Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200 shadow-xs">
            <button
              onClick={() => setViewMode('learner')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'learner' 
                  ? 'bg-[#0f2942] text-white shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Learner View</span>
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'admin' 
                  ? 'bg-[#0f2942] text-white shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Administrator View</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-[#0f2942] hover:bg-[#081a2b] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Learner Dashboard View */}
      {viewMode === 'learner' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Overall Competency</span>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">{overallScore}%</p>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12% since Q2 evaluation
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Assessment Accuracy</span>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">{accuracy}%</p>
              <span className="text-xs text-slate-500 font-medium">Across all manual evaluations</span>
            </div>

            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Division Percentile</span>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">{percentile}</p>
              <span className="text-xs text-slate-500 font-medium">{user.division}</span>
            </div>

            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Bloom's Mastery</span>
              <p className="text-3xl font-extrabold text-[#0f2942] leading-tight">{bloomsLevel}</p>
              <span className="text-xs text-slate-500 font-medium">Strong in Analyzing &amp; Applying</span>
            </div>
          </div>

          {/* Division Benchmarking & Bloom's Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Division Benchmarking (Span 7) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 space-y-4 border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Division Competency Comparison</h3>
                  <p className="text-xs text-slate-500">Officer standing vs. MoSPI Directorate averages</p>
                </div>
                <Building2 className="w-5 h-5 text-[#0f2942]" />
              </div>

              <div className="space-y-4 pt-2">
                {DIVISION_METRICS.map((div) => {
                  const divisionName = div.name || div.division || div.code;
                  const score = div.avgReadiness ?? div.averageScore ?? 75;
                  const target = 85;
                  return (
                    <div key={div.code || divisionName}>
                      <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                        <span>{divisionName} ({div.code})</span>
                        <span className="text-[#0f2942] font-bold">{score}% / {target}% Target</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                        <div 
                          className="bg-[#0f2942] h-full rounded-full transition-all duration-700 shadow-xs" 
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* iGOT Mastery Badges Grid (Span 5) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 space-y-4 border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">iGOT Karmayogi Badges</h3>
                  <p className="text-xs text-slate-500">Official Civil Services Competency Badges</p>
                </div>
                <Award className="w-5 h-5 text-[#0f2942]" />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {MASTERY_BADGES.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                      badge.unlocked 
                        ? 'bg-emerald-50/80 border-emerald-200 text-slate-900' 
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{badge.icon}</span>
                      {badge.unlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{badge.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Administrator Dashboard View */}
      {viewMode === 'admin' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Admin KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Total Active Cadre</span>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">4,820</p>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <Users className="w-3.5 h-3.5" /> 98.4% Enrolled in iGOT
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Cadre Readiness Rate</span>
              <p className="text-3xl font-extrabold text-[#0f2942] leading-tight">81.4%</p>
              <span className="text-xs text-emerald-700 font-semibold">+6.2% vs 2025 Annual Target</span>
            </div>

            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Training Completion</span>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">94.2%</p>
              <span className="text-xs text-slate-500 font-medium">18,420 Hours Completed</span>
            </div>

            <div className="bg-white rounded-2xl p-5 space-y-1 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Predictive Gap Reduction</span>
              <p className="text-3xl font-extrabold text-emerald-700 leading-tight">-14.8%</p>
              <span className="text-xs text-emerald-700 font-semibold">Forecasted Deficit Trimming</span>
            </div>
          </div>

          {/* Admin Section 1: Workforce Competency Distribution Across 4 Clusters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Organization-Wide Competencies (Span 7) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 space-y-4 border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Workforce Competency Cluster Distribution</h3>
                  <p className="text-xs text-slate-500">Mapping statistical, technical, governance &amp; managerial domains</p>
                </div>
                <PieChart className="w-5 h-5 text-[#0f2942]" />
              </div>

              <div className="space-y-4 pt-1">
                {[
                  { domain: 'Statistical Competencies (Sampling, CPI, SNA, PLFS, ASI)', score: 84, target: 90, status: 'Strong' },
                  { domain: 'Technical Competencies (Python, R, SQL, Stata, AI/ML)', score: 58, target: 80, status: 'High Deficit' },
                  { domain: 'Digital Governance (Cybersecurity, Privacy, DPI, Cloud)', score: 76, target: 85, status: 'Moderate' },
                  { domain: 'Managerial & Ethics (Leadership, Communication, Change)', score: 82, target: 85, status: 'Proficient' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>{item.domain}</span>
                      <span className="text-[#0f2942] font-bold">{item.score}% / {item.target}% Target</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                      <div 
                        className={`h-full rounded-full ${item.score < 60 ? 'bg-amber-600' : 'bg-[#0f2942]'}`} 
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Skill Capacity & Predictive Analytics (Span 5) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 space-y-4 border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Predictive Capacity Building</h3>
                  <p className="text-xs text-slate-500">AI-forecasted training requirements</p>
                </div>
                <Brain className="w-5 h-5 text-emerald-700" />
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span>High Priority: Python &amp; R Microdata</span>
                    <span>Demand: +420 Officers</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Recommended Action: Enroll 420 Field Officers in NSSTA TPAC Python &amp; Microdata Workshop.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>SDG Indicators &amp; Metadata Standards</span>
                    <span>Demand: +180 Officers</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Recommended Action: Deploy iGOT Module STAT-SDG-2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
