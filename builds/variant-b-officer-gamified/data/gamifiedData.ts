export interface MicroQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  xpReward: number;
  competency: string;
}

export interface OfficerBadge {
  id: string;
  title: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  karmaXp: number;
}

export const OFFICER_STREAK = {
  currentStreakDays: 7,
  totalXp: 1450,
  level: 4,
  levelTitle: 'Senior Sampling Specialist',
  dailyGoalProgress: 80, // %
};

export const DAILY_MICRO_QUIZZES: MicroQuizQuestion[] = [
  {
    id: 'mq-1',
    question: 'In NSS 78th Round, what is the mandatory population limit requiring Hamlet-Group formation in a rural FSU?',
    options: ['500 or more', '800 or more', '1200 or more', '2000 or more'],
    correctIndex: 2,
    xpReward: 50,
    competency: 'Survey Sampling'
  },
  {
    id: 'mq-2',
    question: 'Under PLFS Current Weekly Status (CWS), how many hours of economic activity in reference week qualifies a person as employed?',
    options: ['At least 1 hour on any 1 day', 'At least 4 hours daily', 'At least 20 hours total', 'At least 3 full days'],
    correctIndex: 0,
    xpReward: 50,
    competency: 'Labour Statistics'
  },
  {
    id: 'mq-3',
    question: 'Which unweighted geometric mean price relative index formula is mandated for CPI elementary aggregates?',
    options: ['Laspeyres Index', 'Jevons Index', 'Carli Index', 'Paasche Index'],
    correctIndex: 1,
    xpReward: 50,
    competency: 'Price Statistics'
  }
];

export const GAMIFIED_BADGES: OfficerBadge[] = [
  {
    id: 'gb-1',
    title: 'Sampling Methodology Master',
    tier: 'Gold',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: 'Yesterday',
    karmaXp: 250
  },
  {
    id: 'gb-2',
    title: '7-Day Study Streak Champion',
    tier: 'Platinum',
    icon: 'Zap',
    unlocked: true,
    unlockedAt: 'Today',
    karmaXp: 500
  },
  {
    id: 'gb-3',
    title: 'Python Microdata Wrangler',
    tier: 'Silver',
    icon: 'Sparkles',
    unlocked: false,
    karmaXp: 150
  }
];
