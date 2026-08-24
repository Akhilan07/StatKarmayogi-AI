/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SideNavBar } from './components/SideNavBar';
import { TopNavBar } from './components/TopNavBar';
import { DashboardView } from './components/DashboardView';
import { CompetencyAnalyzerView } from './components/CompetencyAnalyzerView';
import { IGOTLearningPathView } from './components/IGOTLearningPathView';
import { QuizGeneratorView } from './components/QuizGeneratorView';
import { AnalyticsReportsView } from './components/AnalyticsReportsView';
import { VivaExaminerView } from './components/VivaExaminerView';
import { AssessmentRunnerModal } from './components/AssessmentRunnerModal';
import { AssessmentReportModal } from './components/AssessmentReportModal';
import { CertificateModal } from './components/CertificateModal';
import { LoginModal } from './components/LoginModal';
import { LanguageConfirmModal } from './components/LanguageConfirmModal';
import { LandingLoginPage } from './components/LandingLoginPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { OfflineBanner } from './components/OfflineBanner';
import { DevVariantSwitcher, AppVariant } from './components/DevVariantSwitcher';
import AppVariantA from '../builds/variant-a-admin-heavy/AppVariantA';
import AppVariantB from '../builds/variant-b-officer-gamified/AppVariantB';
import AppVariantC from '../builds/variant-c-live-rag-focus/AppVariantC';

import { 
  TabType, 
  AppLanguage,
  OfficerProfile,
  CompetencyDomain, 
  IGOTCourse, 
  LearningHistoryItem, 
  Question, 
  AssessmentResult, 
  DifficultyLevel 
} from './types';

import { 
  OFFICIAL_MANUALS, 
  INITIAL_COMPETENCIES, 
  IGOT_COURSES, 
  LEARNING_HISTORY,
  SAMPLE_GENERATED_MCQS 
} from './data/mockData';

function AppContent() {
  const { language } = useLanguage();
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [karmaPoints, setKarmaPoints] = useState<number>(750);

  // User Profile State
  const [currentUser, setCurrentUser] = useState<OfficerProfile>({
    name: 'A. Sharma',
    role: 'Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    karmayogiId: 'KARM-MOSPI-88941',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Application Data State
  const [competencies, setCompetencies] = useState<CompetencyDomain[]>(INITIAL_COMPETENCIES);
  const [courses, setCourses] = useState<IGOTCourse[]>(IGOT_COURSES);
  const [learningHistory, setLearningHistory] = useState<LearningHistoryItem[]>(LEARNING_HISTORY);
  
  // Historical assessment reports
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([
    {
      id: 'res-init-1',
      title: 'NSS 78th Round Instruction Manual (Vol I)',
      timestamp: 'Yesterday, 04:30 PM',
      manualTitle: 'NSS 78th Round Instruction Manual: Multiple Indicators',
      targetRole: 'Senior Statistical Officer',
      difficulty: 'Intermediate',
      totalQuestions: 5,
      score: 4,
      percentage: 80,
      timeSpentSeconds: 240,
      userAnswers: { 'q-1': 'B', 'q-2': 'B', 'q-3': 'B', 'q-4': 'B', 'q-5': 'A' },
      questions: SAMPLE_GENERATED_MCQS,
      bloomsBreakdown: {
        Remembering: { correct: 1, total: 1 },
        Understanding: { correct: 2, total: 2 },
        Applying: { correct: 1, total: 1 },
        Analyzing: { correct: 0, total: 1 },
        Evaluating: { correct: 0, total: 0 },
      },
      competencyBreakdown: {
        'Sampling Design': { correct: 2, total: 2 },
        'Labour Statistics': { correct: 1, total: 1 },
        'Price Index Calculation': { correct: 1, total: 1 },
        'Industrial Statistics': { correct: 0, total: 1 },
      },
      recommendations: [
        'Review ASI Vol-I section 2 on factory sector stratification.',
        'High proficiency demonstrated in multi-stage stratified sampling.'
      ],
    }
  ]);

  // Active Modals State
  const [activeExamData, setActiveExamData] = useState<{
    questions: Question[];
    title: string;
    targetRole: string;
    difficulty: DifficultyLevel;
  } | null>(null);

  const [activeScorecard, setActiveScorecard] = useState<AssessmentResult | null>(null);
  const [activeCertificateItem, setActiveCertificateItem] = useState<LearningHistoryItem | null>(null);

  // Compute overall score
  const totalScore = Math.round(
    competencies.reduce((acc, c) => acc + c.scorePercentage, 0) / competencies.length
  );

  // Handler: Start Exam
  const handleStartExam = (
    questions: Question[],
    title: string,
    targetRole: string,
    difficulty: DifficultyLevel
  ) => {
    setActiveExamData({ questions, title, targetRole, difficulty });
  };

  // Handler: Assessment Complete
  const handleExamComplete = (result: AssessmentResult) => {
    setActiveExamData(null);
    setActiveScorecard(result);
    setAssessmentHistory((prev) => [result, ...prev]);
    setKarmaPoints((prev) => prev + 100);

    // Dynamically improve competency profile based on assessment score
    if (result.percentage >= 60) {
      setCompetencies((prev) =>
        prev.map((c) => {
          const relatedCovered = Object.keys(result.competencyBreakdown).some((tag) =>
            c.name.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(c.shortName.toLowerCase())
          );
          if (relatedCovered && c.scorePercentage < 95) {
            const newScore = Math.min(95, c.scorePercentage + (result.percentage >= 80 ? 8 : 4));
            const newLevel = newScore >= 80 ? 5 : newScore >= 60 ? 4 : newScore >= 40 ? 3 : 2;
            const newStatus = newScore >= 75 ? 'Proficient' : newScore >= 50 ? 'Developing' : 'High Gap';
            return {
              ...c,
              scorePercentage: newScore,
              currentLevel: newLevel,
              status: newStatus as any,
            };
          }
          return c;
        })
      );
    }
  };

  // Quick Action handlers
  const handleLaunchTargetedQuiz = (competencyName: string) => {
    setActiveTab('generator');
  };

  const handleLaunchCourseQuiz = (course: IGOTCourse) => {
    setActiveTab('generator');
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  if (!isLoggedIn) {
    return (
      <LandingLoginPage
        onLoginSuccess={(profile) => {
          setCurrentUser(profile);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-slate-900 flex">
      {/* 1. Sidebar Navigation */}
      <SideNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartTraining={() => setActiveTab('generator')}
        isMobileOpen={isMobileNavOpen}
        setIsMobileOpen={setIsMobileNavOpen}
        language={language}
        user={currentUser}
        onOpenLogin={() => setIsLoggedIn(false)}
      />

      {/* 2. Top Navigation Bar */}
      <TopNavBar
        targetScore={85}
        currentScore={totalScore}
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        setActiveTab={setActiveTab}
        karmaPoints={karmaPoints}
        user={currentUser}
        onOpenLogin={() => setIsLoggedIn(false)}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 md:ml-[280px] pt-20 pb-16 px-4 sm:px-8 max-w-full overflow-x-hidden">
        {activeTab === 'dashboard' && (
          <DashboardView
            competencies={competencies}
            setActiveTab={setActiveTab}
            onStartAssessmentForDomain={handleLaunchTargetedQuiz}
            user={currentUser}
            onOpenLogin={() => setIsLoggedIn(false)}
            language={language}
          />
        )}

        {activeTab === 'competency' && (
          <CompetencyAnalyzerView
            competencies={competencies}
            setActiveTab={setActiveTab}
            onLaunchTargetedQuiz={handleLaunchTargetedQuiz}
          />
        )}

        {activeTab === 'viva' && (
          <VivaExaminerView
            language={language}
            onAwardKarmaPoints={(pts) => setKarmaPoints((prev) => prev + pts)}
          />
        )}

        {activeTab === 'igot' && (
          <IGOTLearningPathView
            courses={courses}
            history={learningHistory}
            onOpenCertificate={(item) => setActiveCertificateItem(item)}
            onLaunchCourseQuiz={handleLaunchCourseQuiz}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'generator' && (
          <QuizGeneratorView
            manuals={OFFICIAL_MANUALS}
            onStartExam={handleStartExam}
            language={language}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsReportsView
            competencies={competencies}
            assessmentHistory={assessmentHistory}
            onOpenReport={(res) => setActiveScorecard(res)}
          />
        )}
      </main>

      {/* 4. Active Assessment Runner Modal */}
      {activeExamData && (
        <AssessmentRunnerModal
          questions={activeExamData.questions}
          title={activeExamData.title}
          targetRole={activeExamData.targetRole}
          difficulty={activeExamData.difficulty}
          onComplete={handleExamComplete}
          onCancel={() => setActiveExamData(null)}
        />
      )}

      {/* 5. Post-Exam Diagnostic Scorecard Modal */}
      {activeScorecard && (
        <AssessmentReportModal
          result={activeScorecard}
          onClose={() => setActiveScorecard(null)}
          onRetake={() => {
            const sc = activeScorecard;
            setActiveScorecard(null);
            handleStartExam(sc.questions, sc.title, sc.targetRole, sc.difficulty);
          }}
          onGoToLearningPath={() => {
            setActiveScorecard(null);
            setActiveTab('igot');
          }}
        />
      )}

      {/* 6. Official Certificate Modal */}
      {activeCertificateItem && (
        <CertificateModal
          item={activeCertificateItem}
          officerName={`${currentUser.name} (${currentUser.role})`}
          onClose={() => setActiveCertificateItem(null)}
        />
      )}

      {/* 7. MoSPI Officer SSO Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          currentUser={currentUser}
          onSaveProfile={(profile) => setCurrentUser(profile)}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      {/* 8. Multilingual Language Confirmation Modal */}
      <LanguageConfirmModal />
    </div>
  );
}

export default function App() {
  const [variant, setVariant] = useState<AppVariant>(() => {
    const params = new URLSearchParams(window.location.search);
    const vParam = params.get('variant');
    if (vParam === 'admin' || vParam === 'gamified' || vParam === 'rag' || vParam === 'primary') {
      return vParam as AppVariant;
    }
    const saved = localStorage.getItem('statkarmayogi_variant');
    if (saved === 'admin' || saved === 'gamified' || saved === 'rag' || saved === 'primary') {
      return saved as AppVariant;
    }
    return 'primary';
  });

  const handleSelectVariant = (newVariant: AppVariant) => {
    setVariant(newVariant);
    localStorage.setItem('statkarmayogi_variant', newVariant);
  };

  return (
    <>
      <OfflineBanner />
      {variant === 'admin' && <AppVariantA />}
      {variant === 'gamified' && <AppVariantB />}
      {variant === 'rag' && <AppVariantC />}
      {variant === 'primary' && (
        <LanguageProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </LanguageProvider>
      )}

      <DevVariantSwitcher currentVariant={variant} onSelectVariant={handleSelectVariant} />
    </>
  );
}
