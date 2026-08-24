import React, { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Download, 
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { DEPARTMENT_HEATMAPS, DIID_LEADERSHIP_STATS } from '../data/adminData';

export const AdminLeadershipDashboard: React.FC = () => {
  const [selectedRisk, setSelectedRisk] = useState<string>('All');

  const filteredDepts = DEPARTMENT_HEATMAPS.filter((d) => {
    if (selectedRisk !== 'All' && d.riskLevel !== selectedRisk) return false;
    return true;
  });

  const handleExportReport = () => {
    alert('Exported MoSPI Ministry Leadership Telemetry Report (PDF/Excel)');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-[#0b1329] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Variant A: Ministry / DIID Leadership View
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Live Feed
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            MoSPI Division &amp; Cadre Readiness Heatmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Executive oversight tracking competency deficits across FOD, SDRD, DPD, NAD, PSD, and State Directorates of Economics &amp; Statistics.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 border border-indigo-400/30"
        >
          <Download className="w-4 h-4" />
          <span>Export DIID Executive Summary</span>
        </button>
      </div>

      {/* Top Leadership Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>National Readiness Index</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{DIID_LEADERSHIP_STATS.nationalReadinessIndex}%</p>
          <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded inline-block">
            Target 85% by Q4
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Officers Tracked</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{DIID_LEADERSHIP_STATS.totalOfficersTracked}</p>
          <p className="text-[11px] text-slate-500 font-medium">ISS &amp; SSS Cadres</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Active TPAC Batches</span>
            <Calendar className="w-4 h-4 text-[#006c4a]" />
          </div>
          <p className="text-3xl font-black text-slate-900">{DIID_LEADERSHIP_STATS.activeTpacProgrammes}</p>
          <p className="text-[11px] text-[#006c4a] font-semibold bg-emerald-50 px-2 py-0.5 rounded inline-block">
            NSSTA Greater Noida
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Critical Deficit Area</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-sm font-bold text-red-700 leading-snug">{DIID_LEADERSHIP_STATS.criticalDeficitCadres}</p>
          <p className="text-[11px] text-red-800 bg-red-50 px-2 py-0.5 rounded font-semibold inline-block">
            Requires Intervention
          </p>
        </div>
      </div>

      {/* Departmental Heatmap Table / Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Departmental Competency Deficit Matrix</span>
            </h3>
            <p className="text-xs text-slate-500">Breakdown across the 4 Core Competency Pillars</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Risk:</span>
            {['All', 'Critical', 'Moderate', 'Low'].map((risk) => (
              <button
                key={risk}
                onClick={() => setSelectedRisk(risk)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedRisk === risk
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDepts.map((dept) => (
            <div
              key={dept.id}
              className={`p-5 rounded-2xl border transition-all ${
                dept.riskLevel === 'Critical'
                  ? 'bg-red-50/40 border-red-200 hover:border-red-300'
                  : dept.riskLevel === 'Moderate'
                  ? 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                  : 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {dept.code}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{dept.name}</h4>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  dept.riskLevel === 'Critical'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : dept.riskLevel === 'Moderate'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-[#006c4a] border border-emerald-200'
                }`}>
                  {dept.riskLevel} Deficit
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-4">
                Top Deficit Area: <strong className="text-slate-900 font-semibold">{dept.gapDeficit}</strong>
              </p>

              {/* Pillars Score Bars */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-600">Statistical Competencies</span>
                  <span className="text-slate-900 font-bold">{dept.pillars.statistical}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${dept.pillars.statistical}%` }} />
                </div>

                <div className="flex justify-between text-[11px] font-semibold pt-1">
                  <span className="text-slate-600">Technical (Python/GIS/SQL)</span>
                  <span className="text-slate-900 font-bold">{dept.pillars.technical}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: `${dept.pillars.technical}%` }} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">{dept.officerCount} Officers Tracked</span>
                <span className="text-[#006c4a] font-bold bg-white px-2.5 py-0.5 rounded border border-emerald-200">
                  {dept.tpacBatchesScheduled} TPAC Batches Scheduled
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
