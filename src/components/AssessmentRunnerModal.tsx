import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Send,
  HelpCircle
} from 'lucide-react';
import { Question, DifficultyLevel, BloomsLevel, AssessmentResult } from '../types';
import confetti from 'canvas-confetti';

interface AssessmentRunnerModalProps {
  questions: Question[];
  title: string;
  targetRole: string;
  difficulty: DifficultyLevel;
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

export const AssessmentRunnerModal: React.FC<AssessmentRunnerModalProps> = ({
  questions,
  title,
  targetRole,
  difficulty,
  onComplete,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(questions.length * 90); // 90 sec per question
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAssessment();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    const qId = questions[currentIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    const qId = questions[currentIndex].id;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleClearAnswer = () => {
    const qId = questions[currentIndex].id;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleSubmitAssessment = () => {
    let correctCount = 0;
    const bloomsBreakdown: Record<BloomsLevel, { correct: number; total: number }> = {
      Remembering: { correct: 0, total: 0 },
      Understanding: { correct: 0, total: 0 },
      Applying: { correct: 0, total: 0 },
      Analyzing: { correct: 0, total: 0 },
      Evaluating: { correct: 0, total: 0 },
    };
    const competencyBreakdown: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correctCount++;

      // Blooms tracking
      const level = q.bloomsLevel || 'Understanding';
      if (!bloomsBreakdown[level]) {
        bloomsBreakdown[level] = { correct: 0, total: 0 };
      }
      bloomsBreakdown[level].total++;
      if (isCorrect) bloomsBreakdown[level].correct++;

      // Competency tracking
      const tag = q.competencyTag || 'General Methodology';
      if (!competencyBreakdown[tag]) {
        competencyBreakdown[tag] = { correct: 0, total: 0 };
      }
      competencyBreakdown[tag].total++;
      if (isCorrect) competencyBreakdown[tag].correct++;
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }

    const recommendations: string[] = [];
    if (percentage < 70) {
      recommendations.push('Review NSS 78th Round Chapter 3 on Hamlet-Group selection protocols.');
      recommendations.push('Enroll in iGOT Data Validation Standards 2026 for automated boundary checks.');
    } else {
      recommendations.push('Demonstrated strong mastery in core MoSPI sampling criteria.');
      recommendations.push('Recommended next step: Advanced Python for Microdata Processing.');
    }

    const result: AssessmentResult = {
      id: `res-${Date.now()}`,
      title,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      manualTitle: questions[0]?.manualSource || title,
      targetRole,
      difficulty,
      totalQuestions: questions.length,
      score: correctCount,
      percentage,
      timeSpentSeconds: questions.length * 90 - timeLeft,
      userAnswers,
      questions,
      bloomsBreakdown,
      competencyBreakdown,
      recommendations,
    };

    onComplete(result);
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in">
      {/* Top Bar */}
      <div className="bg-[#131b2e] text-white px-6 py-3.5 border-b border-slate-700 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/40">
            MoSPI
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
              {title}
            </h3>
            <p className="text-[11px] text-slate-300">
              Role: <strong className="text-emerald-300">{targetRole}</strong> | Standard: iGOT Karmayogi
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border ${
            timeLeft < 120 
              ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse' 
              : 'bg-white/10 border-white/20 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setIsConfirmSubmitOpen(true)}
            className="px-4 py-2 bg-[#006c4a] hover:bg-[#005137] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish Assessment</span>
          </button>
        </div>
      </div>

      {/* Main Body: Question Left (8 cols) & Palette Right (4 cols) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Question Area (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between min-h-[500px]">
          <div>
            {/* Meta Tags */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-[#006c4a] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {currentQ.bloomsLevel}
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {currentQ.competencyTag}
                </span>
              </div>

              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                  flaggedQuestions[currentQ.id]
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Stem */}
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#006c4a] text-emerald-950 font-bold ring-2 ring-[#006c4a]/30 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/90 text-slate-800'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-[#006c4a] text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="flex-1 leading-normal pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-8">
            <button
              onClick={handleClearAnswer}
              disabled={!userAnswers[currentQ.id]}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30"
            >
              Clear Choice
            </button>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 bg-[#131b2e] text-white rounded-xl text-xs font-bold hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Question Palette & Progress (Span 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Assessment Progress</h4>
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Answered: <strong className="text-[#006c4a]">{answeredCount}</strong>/{questions.length}</span>
              <span>Flagged: <strong className="text-amber-600">{flaggedCount}</strong></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#006c4a] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Grid Palette */}
          <div>
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Question Palette
            </h5>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];
                const isCurrent = idx === currentIndex;

                let btnClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isCurrent) {
                  btnClass = 'bg-[#131b2e] text-white ring-2 ring-emerald-400 font-bold';
                } else if (isFlagged) {
                  btnClass = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-emerald-100 text-[#006c4a] border-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border text-xs font-bold transition-all relative ${btnClass}`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-100 border border-amber-300 rounded" />
              <span>Flagged for Review ({flaggedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-100 border border-slate-200 rounded" />
              <span>Unattempted ({questions.length - answeredCount})</span>
            </div>
          </div>

          <button
            onClick={() => setIsConfirmSubmitOpen(true)}
            className="w-full py-3 bg-[#006c4a] hover:bg-[#005137] text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Assessment</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {isConfirmSubmitOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006c4a] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold">Submit Final Assessment?</h4>
                <p className="text-xs text-slate-500">
                  {questions.length - answeredCount > 0 
                    ? `You have ${questions.length - answeredCount} unattempted questions.` 
                    : 'All questions have been answered.'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Once submitted, your responses will be evaluated against MoSPI benchmark standards and your iGOT competency profile will be updated immediately.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Return to Exam
              </button>
              <button
                onClick={handleSubmitAssessment}
                className="flex-1 py-2.5 bg-[#006c4a] text-white text-xs font-bold rounded-xl hover:bg-[#005137] transition-colors shadow-sm"
              >
                Confirm &amp; Evaluate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
