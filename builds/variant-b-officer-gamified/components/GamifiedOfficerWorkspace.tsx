import React, { useState } from 'react';
import { 
  Zap, 
  Award, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Medal, 
  Ribbon
} from 'lucide-react';
import { OFFICER_STREAK, DAILY_MICRO_QUIZZES, GAMIFIED_BADGES, MicroQuizQuestion } from '../data/gamifiedData';
import confetti from 'canvas-confetti';

export const GamifiedOfficerWorkspace: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [scoreXp, setScoreXp] = useState<number>(OFFICER_STREAK.totalXp);
  const [streakDays, setStreakDays] = useState<number>(OFFICER_STREAK.currentStreakDays);
  const [badgeUnlocked, setBadgeUnlocked] = useState<boolean>(false);

  const q: MicroQuizQuestion = DAILY_MICRO_QUIZZES[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      setScoreXp((prev) => prev + q.xpReward);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < DAILY_MICRO_QUIZZES.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setBadgeUnlocked(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10 font-sans">
      {/* Restrained Navy/Gold Header & Streak Banner */}
      <div className="bg-[#0b1329] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-slate-800 text-emerald-400 border border-slate-700 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Variant B: Gamified Officer Experience
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Officer Competency Quest &amp; Streak
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Level up your official statistical skills through quick diagnostic micro-quizzes, daily streaks, and instant Karma Points!
            </p>
          </div>

          {/* Gamified Streak & Karma XP Pill in Navy/Gold */}
          <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 flex items-center gap-5 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-xs">
                <Flame className="w-5 h-5 fill-amber-500/20" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-amber-400">{streakDays} Days</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Streak</p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-amber-400">{scoreXp} XP</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Karma Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Micro-Quiz Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              Daily Diagnostic Micro-Quiz ({currentQuestionIdx + 1}/{DAILY_MICRO_QUIZZES.length})
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            +{q.xpReward} XP Reward
          </span>
        </div>

        {/* Question Text */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {q.question}
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.correctIndex;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-[#006c4a] font-bold shadow-xs';
                } else if (isSelected) {
                  btnStyle = 'bg-red-100 border-red-400 text-red-800 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#006c4a]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {isAnswered && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 border border-slate-800"
            >
              <span>{currentQuestionIdx < DAILY_MICRO_QUIZZES.length - 1 ? 'Next Micro-Quiz Question' : 'Complete Quest & Claim Badge'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        )}
      </div>

      {/* Restrained Medal/Ribbon Badges Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#0f2942]" />
          <span>My iGOT Competency Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {GAMIFIED_BADGES.map((badge) => {
            const isGold = badge.tier === 'Gold';
            const isPlatinum = badge.tier === 'Platinum';
            const badgeColor = isGold 
              ? 'text-amber-600 bg-amber-50 border-amber-200' 
              : isPlatinum 
              ? 'text-slate-700 bg-slate-100 border-slate-300' 
              : 'text-amber-800 bg-amber-100/60 border-amber-200';

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  badge.unlocked
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                      {badge.tier} Tier
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700">+{badge.karmaXp} XP</span>
                  </div>

                  {/* Restrained Ribbon/Medal Motif */}
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-xs my-1">
                    <Award className={`w-6 h-6 ${isGold ? 'text-amber-500' : isPlatinum ? 'text-slate-600' : 'text-amber-700'}`} />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                  {badge.unlocked ? `Unlocked ${badge.unlockedAt}` : 'Locked (Complete Quiz)'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
