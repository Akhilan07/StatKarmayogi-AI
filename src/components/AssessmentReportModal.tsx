import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Download, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { AssessmentResult, BloomsLevel } from '../types';
import jsPDF from 'jspdf';

interface AssessmentReportModalProps {
  result: AssessmentResult;
  onClose: () => void;
  onRetake: () => void;
  onGoToLearningPath: () => void;
}

export const AssessmentReportModal: React.FC<AssessmentReportModalProps> = ({
  result,
  onClose,
  onRetake,
  onGoToLearningPath,
}) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const isPassed = result.percentage >= 70;

  const handleExportReportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(19, 27, 46);
    doc.rect(0, 0, 210, 36, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('GOVERNMENT OF INDIA', 14, 12);
    doc.setFontSize(11);
    doc.text('Ministry of Statistics and Programme Implementation (MoSPI)', 14, 19);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('iGOT Karmayogi Competency Diagnostic Evaluation Scorecard', 14, 26);
    doc.text(`Official Record: ${result.id}`, 14, 32);

    // Summary Box
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);
    doc.text(`Assessment: ${result.title.substring(0, 70)}`, 14, 46);
    doc.text(`Role Assessed: ${result.targetRole} | Date: ${result.timestamp}`, 14, 52);
    doc.text(`Overall Score: ${result.score} / ${result.totalQuestions} (${result.percentage}%) - ${isPassed ? 'COMPETENCY VERIFIED' : 'NEEDS SKILL BRIDGING'}`, 14, 58);
    doc.line(14, 62, 196, 62);

    // Bloom's breakdown
    doc.setFont('helvetica', 'bold');
    doc.text("Bloom's Taxonomy Cognitive Dimensions:", 14, 70);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    let by = 76;
    Object.entries(result.bloomsBreakdown).forEach(([level, val]) => {
      const breakdown = val as { correct: number; total: number };
      const pct = breakdown.total > 0 ? Math.round((breakdown.correct / breakdown.total) * 100) : 0;
      doc.text(`• ${level}: ${breakdown.correct}/${breakdown.total} (${pct}%)`, 20, by);
      by += 6;
    });

    // Recommendations
    by += 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended iGOT Learning Actions:', 14, by);
    doc.setFont('helvetica', 'normal');
    by += 6;
    result.recommendations.forEach((rec) => {
      doc.text(`- ${rec}`, 20, by);
      by += 6;
    });

    doc.save(`MoSPI-Scorecard-${result.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#131b2e] text-white p-6 flex justify-between items-center shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Competency Assessment Scorecard</h3>
              <p className="text-xs text-slate-300">
                Grounded in MoSPI Manuals • {result.timestamp}
              </p>
            </div>
          </div>

          <button
            onClick={handleExportReportPDF}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Scorecard PDF</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Score Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row justify-between items-center gap-6 ${
            isPassed 
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
              : 'bg-amber-50/80 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md ${
                isPassed ? 'bg-[#006c4a]' : 'bg-amber-600'
              }`}>
                {isPassed ? <Award className="w-9 h-9" /> : <Sparkles className="w-9 h-9" />}
              </div>
              <div>
                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isPassed ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  {isPassed ? 'Competency Standard Achieved' : 'Needs Development'}
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-1">
                  {result.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Target Role: <strong>{result.targetRole}</strong> • Time Spent: {Math.round(result.timeSpentSeconds / 60)} mins
                </p>
              </div>
            </div>

            {/* Score circle / metric */}
            <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm text-center min-w-[140px]">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall Score</p>
              <div className="flex items-baseline justify-center gap-0.5 text-slate-900 font-black text-3xl mt-0.5">
                <span>{result.percentage}</span>
                <span className="text-sm font-bold text-slate-500">%</span>
              </div>
              <p className="text-[11px] font-bold text-[#006c4a] mt-0.5">
                {result.score} of {result.totalQuestions} Correct
              </p>
            </div>
          </div>

          {/* Bloom's Cognitive Mastery & Competency Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloom's Breakdown */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#006c4a]" />
                <span>Bloom's Taxonomy Performance</span>
              </h4>

              <div className="space-y-2.5">
                {(Object.keys(result.bloomsBreakdown) as BloomsLevel[]).map((level) => {
                  const data = result.bloomsBreakdown[level];
                  if (!data || data.total === 0) return null;
                  const pct = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={level}>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{level}</span>
                        <span className="font-bold text-slate-900">
                          {data.correct}/{data.total} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#006c4a] h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Competency Tags Breakdown */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#006c4a]" />
                <span>Competency Tags Breakdown</span>
              </h4>

              <div className="space-y-2.5">
                {Object.entries(result.competencyBreakdown).map(([tag, data]) => {
                  const compData = data as { correct: number; total: number };
                  const pct = Math.round((compData.correct / compData.total) * 100);
                  return (
                    <div key={tag}>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span className="truncate max-w-[200px]">{tag}</span>
                        <span className="font-bold text-slate-900">
                          {compData.correct}/{compData.total} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${pct < 60 ? 'bg-red-500' : 'bg-[#006c4a]'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Question Review with Manual Citations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#006c4a]" />
              <span>Question-by-Question Scrutiny &amp; Manual Grounding</span>
            </h4>

            <div className="space-y-3">
              {result.questions.map((q, idx) => {
                const userAns = result.userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const isExpanded = expandedQuestionId === q.id;

                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border transition-all ${
                      isCorrect 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : 'bg-red-50/40 border-red-200'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-[#006c4a] shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-snug">
                            Q{idx + 1}. {q.question}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] font-semibold text-slate-500">
                            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                              Your: <strong className={isCorrect ? 'text-[#006c4a]' : 'text-red-600'}>{userAns || 'None'}</strong>
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                              Key: <strong className="text-[#006c4a]">{q.correctAnswer}</strong>
                            </span>
                            <span className="text-[#006c4a]">{q.bloomsLevel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 text-xs text-slate-700 space-y-3 animate-in fade-in">
                        <div className="space-y-1.5 pt-2">
                          {q.options.map((opt) => {
                            const isOptCorrect = opt.id === q.correctAnswer;
                            const isOptUser = opt.id === userAns;
                            return (
                              <div
                                key={opt.id}
                                className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                                  isOptCorrect
                                    ? 'bg-emerald-100/70 text-emerald-950 font-semibold border border-emerald-300'
                                    : isOptUser
                                    ? 'bg-red-100 text-red-900 font-semibold border border-red-300'
                                    : 'bg-white/70 text-slate-600'
                                }`}
                              >
                                <span>({opt.id}) {opt.text}</span>
                                {isOptCorrect && <span className="text-[10px] text-[#006c4a] font-bold">CORRECT KEY</span>}
                                {!isOptCorrect && isOptUser && <span className="text-[10px] text-red-600 font-bold">YOUR CHOICE</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-800 space-y-1.5">
                          <p className="font-semibold text-slate-900">Academic Explanation:</p>
                          <p className="leading-relaxed">{q.explanation}</p>
                          <p className="text-[11px] font-bold text-[#006c4a] pt-1 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {q.citation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <button
            onClick={onRetake}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onGoToLearningPath}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#131b2e] hover:bg-[#0b1c30] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bridge Gaps on iGOT</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#006c4a] hover:bg-[#005137] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Update Profile &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
