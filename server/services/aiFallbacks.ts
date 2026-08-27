/**
 * MoSPI Pre-Computed Deterministic Fallbacks
 * Provides graceful fallback assessment outputs if external AI services are unreachable.
 */

export const getFallbackMcqs = (manualTitle: string = 'NSS 78th Round Instruction Manual') => ({
  quiz_title: `MoSPI Competency Assessment: ${manualTitle}`,
  source_manual: manualTitle,
  competency_focus: 'Statistical Methodology & Validation',
  confidence_score: 0.95,
  is_fallback: true,
  questions: [
    {
      id: 'mcq-fb-1',
      questionNumber: 1,
      question: 'According to NSS 78th Round guidelines, what is defined as the Primary Sampling Unit (PSU) in rural areas?',
      options: [
        { id: 'A', text: 'Sample Household (USU)' },
        { id: 'B', text: 'Census Village / Panchayat Ward' },
        { id: 'C', text: 'Community Development Block' },
        { id: 'D', text: 'Administrative District' },
      ],
      correctAnswer: 'B',
      explanation: 'In NSS 78th Round, census villages in rural areas and UDB blocks in urban areas act as the Primary Sampling Units (PSUs).',
      citation: `Ref: ${manualTitle}, Section 2.1 (PSU Selection)`,
      difficulty: 'Intermediate',
      competencyTag: 'Sampling Design',
      bloomsLevel: 'Understanding',
      manualSource: manualTitle,
    },
    {
      id: 'mcq-fb-2',
      questionNumber: 2,
      question: 'What is the required threshold for hamlet-group formation when a sample village population exceeds 1200?',
      options: [
        { id: 'A', text: '2 hamlet groups of equal population' },
        { id: 'B', text: '3 or more hamlet groups based on population slabs' },
        { id: 'C', text: 'No division permitted' },
        { id: 'D', text: 'Complete 100% census enumeration' },
      ],
      correctAnswer: 'B',
      explanation: 'NSS guidelines require dividing large villages into 3 or more hamlet groups depending on population thresholds.',
      citation: `Ref: ${manualTitle}, Section 3.4 (Hamlet-group Formation)`,
      difficulty: 'Advanced',
      competencyTag: 'Field Survey Protocols',
      bloomsLevel: 'Applying',
      manualSource: manualTitle,
    },
    {
      id: 'mcq-fb-3',
      questionNumber: 3,
      question: 'Which index formula is officially mandated for compiling Consumer Price Index (CPI) elementary aggregates in India?',
      options: [
        { id: 'A', text: 'Laspeyres Weighted Index Formula' },
        { id: 'B', text: 'Jevons Geometric Mean Index Formula' },
        { id: 'C', text: 'Paasche Price Index Formula' },
        { id: 'D', text: 'Simple Unweighted Arithmetic Mean' },
      ],
      correctAnswer: 'B',
      explanation: 'MoSPI mandates Jevons Geometric Mean formula for elementary item groups to minimize substitution bias.',
      citation: 'Ref: CPI Base 2012=100 Manual, Chapter 4',
      difficulty: 'Intermediate',
      competencyTag: 'Price Index Compilation',
      bloomsLevel: 'Analyzing',
      manualSource: manualTitle,
    },
  ],
});

export const getFallbackGapAnalysis = (officerRole: string = 'Statistical Officer') => ({
  officer_role: officerRole,
  overall_readiness_pct: 74,
  confidence_score: 0.92,
  is_fallback: true,
  competency_scores: [
    { competency: 'Survey Sampling & Stratification', score: 82, benchmark: 80, status: 'Proficient' },
    { competency: 'CPI & Price Index Aggregation', score: 68, benchmark: 75, status: 'Gap Identified' },
    { competency: 'Automated Field Scrutiny & Python Analytics', score: 48, benchmark: 80, status: 'Critical Gap' },
  ],
  recommended_igot_courses: [
    {
      course_id: 'iGOT-STAT-302',
      title: 'Automated Data Validation in Official Surveys',
      target_competency: 'Automated Field Scrutiny & Python Analytics',
      duration: '4 Hours',
      priority: 'High',
    },
    {
      course_id: 'iGOT-CPI-201',
      title: 'Price Index Compilation & Elementary Aggregation',
      target_competency: 'CPI & Price Index Aggregation',
      duration: '6 Hours',
      priority: 'High',
    },
  ],
});

export const getFallbackVivaQuestion = (topic: string = 'Survey Sampling') => ({
  question: `In NSS survey methodology for ${topic}, how do you handle non-response in household listing schedules during field inspection?`,
  context_hint: 'Focus on substitution rules and supervisory scrutiny checks.',
  target_concepts: ['Non-response handling', 'Substitution rules', 'Supervisor scrutiny'],
  confidence_score: 0.94,
  is_fallback: true,
});

export const getFallbackVivaEvaluation = () => ({
  score: 82,
  grade: 'A',
  summary_feedback: 'Strong technical grounding in MoSPI survey guidelines and non-response protocols.',
  strengths: ['Correct identification of PSU sampling frames', 'Grounded in NSS manual guidelines'],
  gaps: ['Elaborate more on multiplier weighting adjustments'],
  manual_citation: 'Ref: NSS 78th Round Manual, Section 3.2',
  recommended_reading: 'iGOT Module STAT-302: Survey Sampling & Validation',
  confidence_score: 0.95,
  is_fallback: true,
});
