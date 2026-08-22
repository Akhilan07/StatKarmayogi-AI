import { OfficialManual, CompetencyDomain, IGOTCourse, LearningHistoryItem, Question } from '../types';

export const OFFICIAL_MANUALS: OfficialManual[] = [
  {
    id: 'nss-78',
    title: 'NSS 78th Round Instruction Manual: Multiple Indicators & Domestic Tourism',
    code: 'NSS-78-VOL-I',
    department: 'National Sample Survey Office (FOD/SDRD)',
    year: '2023-24',
    pages: 348,
    fileSize: '4.2 MB',
    summary: 'Comprehensive survey manual defining sampling design, primary sampling units (PSU/FSU), hamlet-group formation, household listing, and multi-indicator questionnaires.',
    keyCompetencies: ['Sampling Design', 'Field Data Collection', 'Data Validation', 'FSU Demarcation'],
    sampleText: `CHAPTER THREE: CONCEPTS AND DEFINITIONS - NSS 78TH ROUND
3.1 Survey Period and Sub-rounds: The survey will span over a period of one full year. The total duration of the field operations is divided into four sub-rounds of three months duration each.
3.2 Sampling Design and Coverage: A stratified multi-stage design is adopted for the 78th round survey. The first stage units (FSU) are the Census villages (Panchayat wards for Kerala) in the rural sector and Urban Frame Survey (UFS) blocks in the urban sector. The ultimate stage units (USU) are households in both the sectors.
3.3 Large FSUs and Hamlet-Group Formation: For large FSUs with approximate present population 1200 or more, hamlet-group formation is mandatory. The FSU is divided into a specified number of hamlet-groups (hg's) of nearly equal population content. Two hg's are selected for listing: hg 1 with maximum population is selected with certainty, and one more hg is selected randomly from the remaining hg's with equal probability (SRSWOR).
3.4 Listing Schedule (Schedule 0.0): In each selected FSU, a complete listing of all houses and households is done in Schedule 0.0 before selecting sample households.
3.5 Stratification: Within each district of a State/UT, two basic strata are formed: (i) rural stratum comprising all rural areas of the district and (ii) urban stratum comprising all urban areas of the district.`,
    sections: [
      {
        id: 'sec-1',
        title: 'Section 1: General Background and Scope',
        content: 'Explains the objectives of the 78th round, covering SDG indicators 1.4.2, 6.1.1, 6.2.1, and tourism satellite accounting components.'
      },
      {
        id: 'sec-2',
        title: 'Section 2: Sampling Design and Selection Methodology',
        content: 'Defines two-stage stratified sampling with Census 2011 sampling frame, rural village FSUs, urban UFS block FSUs, and household USUs.'
      },
      {
        id: 'sec-3',
        title: 'Section 3: Concepts, Definitions and Operational Rules',
        content: 'Provides precise statutory definitions of Household, Normal Resident, Hamlet-group, Sub-round schedule, and Primary vs Secondary informers.'
      },
      {
        id: 'sec-4',
        title: 'Section 4: Field Scrutiny and Data Validation Rules',
        content: 'Covers consistency checks between Schedule 0.0 and Schedule 21.1, valid value ranges, and mandatory supervisory inspection norms.'
      }
    ]
  },
  {
    id: 'plfs-guidelines',
    title: 'Periodic Labour Force Survey (PLFS) Concepts, Definitions & Methodological Guidelines',
    code: 'PLFS-MET-2024',
    department: 'Survey Design and Research Division (SDRD)',
    year: '2024',
    pages: 182,
    fileSize: '3.6 MB',
    summary: 'Guidelines governing labor market metrics: Usual Principal Status (ps), Subsidiary Status (ss), Current Weekly Status (CWS), Labour Force Participation Rate (LFPR), Worker Population Ratio (WPR), and Unemployment Rate (UR).',
    keyCompetencies: ['Labour Statistics', 'Activity Classification', 'Sampling Multipliers', 'Data Validation'],
    sampleText: `PERIODIC LABOUR FORCE SURVEY (PLFS) - TECHNICAL MANUAL
1. Activity Status Determination: An individual's activity status is categorized into: (a) Working or being engaged in economic activity (employed), (b) Not working but seeking or available for work (unemployed), and (c) Neither working nor available for work (not in labour force).
2. Usual Principal Activity Status (ps): The activity status on which a person spent relatively long time (major time criterion) during the 365 days preceding the date of survey.
3. Subsidiary Economic Activity Status (ss): A non-worker or principal status worker who pursued some economic activity for 30 days or more during the 365 days reference period.
4. Current Weekly Status (CWS): Activity status based on the reference period of the last 7 days preceding the date of survey. A person is considered working in CWS if they pursued economic activity for at least 1 hour on any 1 day during the reference week.
5. Rotational Panel Sampling in Urban Sector: In urban areas, a rotational panel sampling design is used where each selected FSU is visited four times with 25% rotation.`,
    sections: [
      {
        id: 'plfs-sec-1',
        title: 'Section 1: Measurement Framework of Labour Force',
        content: 'Detailed explanation of usual status approach (ps+ss) versus current weekly status (CWS) approach and International Labour Organization (ILO) harmonized standards.'
      },
      {
        id: 'plfs-sec-2',
        title: 'Section 2: Rotational Panel Design in Urban Sector',
        content: 'Sampling mechanics of 25% rotational panel scheme (visit 1 through visit 4) and panel replacement rules for urban FSUs.'
      },
      {
        id: 'plfs-sec-3',
        title: 'Section 3: Calculation of Key Ratios (LFPR, WPR, UR)',
        content: 'Mathematical formulations for Labour Force Participation Rate, Worker Population Ratio, and Unemployment Rate across demographic slices.'
      }
    ]
  },
  {
    id: 'cpi-manual',
    title: 'Consumer Price Index (CPI Base 2012=100) Compilation Manual & Imputation Protocols',
    code: 'CPI-REV-2024',
    department: 'Price Statistics Division (PSD)',
    year: '2024',
    pages: 215,
    fileSize: '5.1 MB',
    summary: 'Official methodologies for rural, urban, and combined CPI indices using modified Laspeyres formula, geometric mean price relatives, and missing price imputation routines.',
    keyCompetencies: ['Price Index Calculation', 'Time Series Modeling', 'Data Imputation', 'National Accounts'],
    sampleText: `COMPILATION MANUAL FOR CONSUMER PRICE INDEX (BASE 2012=100)
1. Index Formula: The Consumer Price Index (CPI) is compiled using the Modified Laspeyres Price Index formula. Elementary aggregate indices at item level for each market are calculated as the simple geometric mean of price relatives (Jevons index formula).
2. Imputation of Missing Prices: If price quotation for an item is not available in a selected shop/market during the reference month:
   - Rule A: If temporarily missing, the price is imputed by applying the average price relative of other reporting shops in the same stratum/sub-group.
   - Rule B: If permanently unavailable, item substitution is carried out with comparable specifications and suitable base price adjustment.
3. Weighting Diagram: The weighting diagram is derived from the Consumer Expenditure Survey (CES), reflecting expenditure shares at the all-India and State/UT level across 6 major groups.
4. Housing Index Compilation: Compiled on a six-monthly basis for urban sector using the chain base method from repeated surveys of selected dwelling units.`,
    sections: [
      {
        id: 'cpi-sec-1',
        title: 'Section 1: Elementary Aggregate Formulation',
        content: 'Mathematical application of Jevons Index and modified Laspeyres index for rural and urban item baskets.'
      },
      {
        id: 'cpi-sec-2',
        title: 'Section 2: Imputation and Replacement Protocols',
        content: 'Step-by-step algorithms for seasonal item price carryover, class-mean imputation, and geometric chain linking.'
      }
    ]
  },
  {
    id: 'asi-manual',
    title: 'Annual Survey of Industries (ASI) Operational Manual: Vol I - Concepts & Scrutiny',
    code: 'ASI-VOL-I-2023',
    department: 'Industrial Statistics Wing (ISW / FOD)',
    year: '2023-24',
    pages: 290,
    fileSize: '4.8 MB',
    summary: 'Standard operating manual for industrial statistics covering registered factory units under Factories Act 1948, Census and Sample sectors, Gross Output, and Net Value Added (NVA).',
    keyCompetencies: ['Industrial Statistics', 'Data Validation', 'National Accounts', 'Gross Value Added (GVA)'],
    sampleText: `ANNUAL SURVEY OF INDUSTRIES (ASI) - OPERATIONAL MANUAL
1. Coverage and Scope: ASI covers all factory units registered under Sections 2m(i) and 2m(ii) of the Factories Act, 1948 (employing 10 or more workers with power, or 20 or more without power), as well as bidi and cigar manufacturing establishments.
2. Frame and Sectoral Stratification: The ASI frame is divided into two sectors:
   - Census Sector: Units employing 100 or more workers (in certain states 50 or more), all units in 12 economically less developed states, and joint returns. These are surveyed completely (100% census).
   - Sample Sector: Remaining registered factory units, surveyed based on stratified circular systematic sampling.
3. Gross Value Added (GVA) Calculation: GVA is calculated as Total Gross Value of Output minus Total Input (including raw materials, fuels, consumables, and industrial/non-industrial services purchased).
4. Depreciation and Net Value Added (NVA): NVA is derived as GVA minus Depreciation (consumption of fixed capital).`,
    sections: [
      {
        id: 'asi-sec-1',
        title: 'Section 1: Legal Framework and Statutory Compliance',
        content: 'Collection of Statistics Act 2008 and Factories Act 1948 section 2m definitions.'
      },
      {
        id: 'asi-sec-2',
        title: 'Section 2: Valuation of Capital, Input and Output',
        content: 'Accounting guidelines for fixed capital valuation, working capital, gross output, and intermediate consumption.'
      }
    ]
  },
  {
    id: 'data-qa-manual',
    title: 'NSSO Data Quality Assurance Manual V3: Scrutiny Rules & Validation Protocols',
    code: 'NSSO-QA-V3',
    department: 'Data Quality & Validation Directorate',
    year: '2024',
    pages: 160,
    fileSize: '3.1 MB',
    summary: 'Validation rules, cross-tabulation check algorithms, hot-deck imputation limits, outlier bounds, and supervisory re-interview protocols.',
    keyCompetencies: ['Data Validation', 'Outlier Detection', 'Imputation Methods', 'Python/R Analytics'],
    sampleText: `NSSO DATA QUALITY ASSURANCE MANUAL V3
1. Field Scrutiny Protocol: Field supervisors must carry out 100% scrutiny of primary listing schedules and a minimum of 25% re-interviews for detailed sample schedules within 48 hours of field completion.
2. Boundary and Range Checks: All continuous numeric variables (income, expenditure, quantity) must be evaluated against upper and lower plausibility bounds (±3 IQR beyond Q3/Q1).
3. Cross-Tabulation Consistency: For example, total household consumer expenditure must not deviate by more than 40% from aggregated sub-schedule item expenditure totals.
4. Imputation Rules: Automated cold-deck imputation is prohibited without written authorization from the zonal Joint Director. Hot-deck donor imputation requires matching on a minimum of 3 demographic covariates (State, Sector, Household Size).`,
    sections: [
      {
        id: 'qa-sec-1',
        title: 'Section 1: Multi-Tier Verification Standards',
        content: 'Mandatory scrutiny checklists for Field Investigators, Senior Statistical Officers, and Assistant Directors.'
      },
      {
        id: 'qa-sec-2',
        title: 'Section 2: Automated Anomaly Detection Algorithms',
        content: 'Rules for boundary checks, logical contradiction traps, and variance ratio testing.'
      }
    ]
  }
];

export const INITIAL_COMPETENCIES: CompetencyDomain[] = [
  {
    id: 'survey-sampling',
    name: 'Survey Sampling Methodology',
    shortName: 'Survey Sampling',
    currentLevel: 3,
    targetLevel: 5,
    peerBenchmark: 3.5,
    scorePercentage: 74,
    status: 'Developing',
    skills: [
      { name: 'Multi-stage Stratified Sampling', status: 'Proficient', iGotCourseId: 'igot-sample-1' },
      { name: 'FSU/USU Demarcation Rules', status: 'Proficient' },
      { name: 'Multipliers and Weight Estimation', status: 'Developing', iGotCourseId: 'igot-sample-2' }
    ]
  },
  {
    id: 'cpi-iip',
    name: 'CPI & IIP Index Calculations',
    shortName: 'CPI/IIP Calc.',
    currentLevel: 4,
    targetLevel: 5,
    peerBenchmark: 3.8,
    scorePercentage: 80,
    status: 'Proficient',
    skills: [
      { name: 'Modified Laspeyres Aggregation', status: 'Proficient' },
      { name: 'Price Relatives & Jevons Index', status: 'Proficient' },
      { name: 'Seasonal Item Imputation', status: 'Developing', iGotCourseId: 'igot-cpi-1' }
    ]
  },
  {
    id: 'data-val',
    name: 'Data Validation & Cleaning',
    shortName: 'Data Validation*',
    currentLevel: 2,
    targetLevel: 5,
    peerBenchmark: 3.2,
    scorePercentage: 42,
    status: 'Critical Gap',
    skills: [
      { name: 'Outlier Detection (IQR / Z-score)', status: 'Proficient' },
      { name: 'Imputation Methods (Hot-deck/Cold-deck)', status: 'Critical Gap', iGotCourseId: 'igot-val-1' },
      { name: 'Cross-tabulation Consistency Rules', status: 'Developing' }
    ]
  },
  {
    id: 'national-acc',
    name: 'National Accounts Statistics',
    shortName: 'National Accounts',
    currentLevel: 4,
    targetLevel: 5,
    peerBenchmark: 3.6,
    scorePercentage: 78,
    status: 'Proficient',
    skills: [
      { name: 'Gross & Net Value Added (GVA/NVA)', status: 'Proficient' },
      { name: 'Capital Consumption Depreciation', status: 'Proficient' },
      { name: 'Supply-Use Tables (SUT)', status: 'Developing' }
    ]
  },
  {
    id: 'field-ops',
    name: 'Field Operations & Scrutiny',
    shortName: 'Field Data Collect.',
    currentLevel: 4,
    targetLevel: 5,
    peerBenchmark: 4.1,
    scorePercentage: 82,
    status: 'Proficient',
    skills: [
      { name: 'Listing Schedule 0.0 Execution', status: 'Proficient' },
      { name: 'Supervisory Re-interview Audits', status: 'Proficient' },
      { name: 'Informer Bias Rectification', status: 'Developing' }
    ]
  },
  {
    id: 'analytics-prog',
    name: 'Python/R Analytics for Official Statistics',
    shortName: 'Python/R Analytics*',
    currentLevel: 2,
    targetLevel: 5,
    peerBenchmark: 3.0,
    scorePercentage: 38,
    status: 'Critical Gap',
    skills: [
      { name: 'Pandas DataFrames for Large Datasets', status: 'Critical Gap', iGotCourseId: 'igot-py-1' },
      { name: 'ggplot2 & Statistical Visualizations', status: 'Developing' },
      { name: 'Statistical Modelling (lm/glm)', status: 'Critical Gap', iGotCourseId: 'igot-py-2' }
    ]
  }
];

export const IGOT_COURSES: IGOTCourse[] = [
  {
    id: 'igot-sample-1',
    title: 'Advanced Sampling Techniques for National Surveys',
    provider: 'iGOT Karmayogi / National Statistical Systems Training Academy (NSSTA)',
    matchScore: 95,
    duration: '8h',
    level: 'Advanced',
    competency: 'Sampling Design',
    description: 'Master complex stratified and cluster sampling methodologies for national-scale household surveys, including multi-stage multiplier derivations.',
    imageAlt: 'Data visualization graphic showing interconnected nodes and statistical charts in navy and emerald colors.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    progress: 0,
    status: 'Not Started',
    syllabus: [
      'Module 1: Multi-stage Stratified Sampling Frame Mechanics',
      'Module 2: Circular Systematic Sampling with PPS',
      'Module 3: Non-sampling Errors & Multiplier Formulations',
      'Module 4: Practical Case Study on PLFS Panel Rotations'
    ]
  },
  {
    id: 'igot-val-1',
    title: 'Data Validation Standards & Automated Anomaly Detection 2026',
    provider: 'iGOT Karmayogi / Data Quality Assurance Directorate',
    matchScore: 88,
    duration: '4h',
    level: 'Intermediate',
    competency: 'Data Validation',
    description: 'Learn the latest MoSPI guidelines for automated anomaly detection, boundary checks, and standardized hot-deck imputation protocols.',
    imageAlt: 'Digital folders and checkmarks emphasizing data integrity and statistical standards.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    progress: 35,
    status: 'In Progress',
    syllabus: [
      'Module 1: NSSO Scrutiny Protocols & Logical Cross-Checks',
      'Module 2: Outlier Truncation vs Statistical Winsorization',
      'Module 3: Donor Matching and Hot-deck Imputation Rules',
      'Module 4: Automated Data Cleaning Workflows in R/Python'
    ]
  },
  {
    id: 'igot-cpi-1',
    title: 'Time Series Modeling & Imputation for Consumer Price Index (CPI)',
    provider: 'iGOT Karmayogi / Price Statistics Division',
    matchScore: 92,
    duration: '6h',
    level: 'Advanced',
    competency: 'Price Index Calculation',
    description: 'Advanced forecasting models and missing quote imputation techniques tailored for Consumer Price Index and Index of Industrial Production.',
    imageAlt: 'Line chart visualization glowing on dark blue background representing economic indices.',
    imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    progress: 0,
    status: 'Not Started',
    syllabus: [
      'Module 1: Laspeyres vs Jevons Index Foundations',
      'Module 2: Seasonality and Class-Mean Imputation',
      'Module 3: Chain Base Linking for Urban Housing Sub-Index',
      'Module 4: Real-time Price Verification & Anomaly Capping'
    ]
  },
  {
    id: 'igot-py-1',
    title: 'Advanced Python for Large Official Datasets & Survey Microdata',
    provider: 'iGOT Karmayogi / Computer Centre, MoSPI',
    matchScore: 96,
    duration: '24h',
    level: 'Advanced',
    competency: 'Python/R Analytics',
    description: 'Practical data wrangling with Pandas, microdata parsing from raw fixed-width ASCII survey files, and statistical weighting algorithms.',
    imageAlt: 'Python coding and data science analytics interface.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    progress: 50,
    status: 'In Progress',
    syllabus: [
      'Module 1: High Performance Data Wrangling with Pandas & Polars',
      'Module 2: Processing Multi-Gigabyte NSS Microdata Fixed-Format Files',
      'Module 3: Implementing Replicate Weight Variance Estimation',
      'Module 4: Automated Quality Dashboard Creation'
    ]
  },
  {
    id: 'igot-nat-1',
    title: 'National Accounts Statistics: Gross Value Added & Capital Accounting',
    provider: 'iGOT Karmayogi / National Accounts Division (NAD)',
    matchScore: 84,
    duration: '10h',
    level: 'Intermediate',
    competency: 'National Accounts',
    description: 'In-depth conceptual study of System of National Accounts (SNA 2008), GVA from ASI datasets, and Supply-Use Tables (SUT).',
    imageAlt: 'National accounts economic indicators architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    progress: 0,
    status: 'Not Started',
    syllabus: [
      'Module 1: SNA 2008 Foundations and MoSPI Implementation',
      'Module 2: Sectoral GVA Compilation from Corporate MCA21 and ASI',
      'Module 3: Constant Price Deflators and Base Revision Protocols',
      'Module 4: Input-Output Transaction Tables (IOTT)'
    ]
  }
];

export const LEARNING_HISTORY: LearningHistoryItem[] = [
  {
    id: 'cert-1',
    title: 'Introduction to Big Data in Official Statistics',
    completedDate: 'Oct 12, 2023',
    score: 92,
    certificateId: 'MOSPI-IGOT-2023-88941',
    competency: 'Data Systems'
  },
  {
    id: 'cert-2',
    title: 'Ethics & Legal Mandates in Official Data Collection',
    completedDate: 'Aug 05, 2023',
    score: 100,
    certificateId: 'MOSPI-IGOT-2023-74102',
    competency: 'Governance'
  },
  {
    id: 'cert-3',
    title: 'Foundations of Survey Sampling & Demarcation',
    completedDate: 'May 18, 2023',
    score: 88,
    certificateId: 'MOSPI-IGOT-2023-61029',
    competency: 'Survey Sampling'
  }
];

export const SAMPLE_GENERATED_MCQS: Question[] = [
  {
    id: 'q-1',
    questionNumber: 1,
    question: 'According to NSS 78th Round guidelines, what is defined as the Primary Sampling Unit (PSU) in rural areas?',
    options: [
      { id: 'A', text: 'Sample Household (USU)' },
      { id: 'B', text: 'Census Village / Panchayat Ward in Kerala' },
      { id: 'C', text: 'Community Development Block' },
      { id: 'D', text: 'Administrative District' }
    ],
    correctAnswer: 'B',
    explanation: 'In the rural sector, the first stage units (FSU) / primary sampling units (PSU) are Census villages (or Panchayat wards for Kerala), whereas the ultimate stage units (USU) are sample households as per the stratified multi-stage design specified in Section 3.2.',
    citation: 'Ref: NSS 78th Round Instruction Manual, Section 3.2 (Sampling Design and Coverage)',
    difficulty: 'Intermediate',
    competencyTag: 'Sampling Design',
    bloomsLevel: 'Understanding',
    manualSource: 'NSS 78th Round Instruction Manual'
  },
  {
    id: 'q-2',
    questionNumber: 2,
    question: 'Under NSS 78th Round protocols for large FSUs with an approximate population of 1200 or more, which selection procedure is mandatory for hamlet-group (hg) listing?',
    options: [
      { id: 'A', text: 'All hamlet-groups are listed completely without any subsampling' },
      { id: 'B', text: 'Hg 1 with maximum population is selected with certainty, plus one more hg selected randomly using SRSWOR' },
      { id: 'C', text: 'Two hamlet-groups are selected purely with probability proportional to size with replacement (PPSWR)' },
      { id: 'D', text: 'Only the hamlet-group with the lowest population is chosen for listing' }
    ],
    correctAnswer: 'B',
    explanation: 'According to Section 3.3, for large FSUs divided into hamlet-groups of nearly equal population, two hg\'s are selected: hg 1 (maximum population content) is chosen with certainty (probability 1), and one additional hg is selected randomly from the remaining ones using SRSWOR.',
    citation: 'Ref: NSS 78th Round Instruction Manual, Section 3.3 (Large FSUs and Hamlet-Group Formation)',
    difficulty: 'Advanced',
    competencyTag: 'Sampling Design',
    bloomsLevel: 'Applying',
    manualSource: 'NSS 78th Round Instruction Manual'
  },
  {
    id: 'q-3',
    questionNumber: 3,
    question: 'In the Periodic Labour Force Survey (PLFS), how is a person classified under the Current Weekly Status (CWS) framework regarding employment?',
    options: [
      { id: 'A', text: 'Must have worked for at least 4 hours on all 7 days of the reference week' },
      { id: 'B', text: 'Must have worked for at least 1 hour on any 1 day during the reference week' },
      { id: 'C', text: 'Must have earned more than the state statutory minimum wage during the week' },
      { id: 'D', text: 'Must have been employed for major time (at least 4 days) in the reference week' }
    ],
    correctAnswer: 'B',
    explanation: 'As per PLFS guidelines Section 4, under the Current Weekly Status (CWS) approach, a person is considered employed if they pursued any economic activity for at least 1 hour on any 1 day during the 7-day reference period.',
    citation: 'Ref: PLFS Concepts & Definitions Manual, Section 4 (Current Weekly Status Criteria)',
    difficulty: 'Beginner',
    competencyTag: 'Labour Statistics',
    bloomsLevel: 'Remembering',
    manualSource: 'PLFS Concepts & Definitions Manual'
  },
  {
    id: 'q-4',
    questionNumber: 4,
    question: 'According to the Consumer Price Index (CPI Base 2012=100) Compilation Manual, which index formulation is strictly utilized at the elementary aggregate level for each market?',
    options: [
      { id: 'A', text: 'Carli Index (Arithmetic mean of price relatives)' },
      { id: 'B', text: 'Jevons Index (Geometric mean of price relatives)' },
      { id: 'C', text: 'Dutot Index (Ratio of arithmetic mean prices)' },
      { id: 'D', text: 'Paasche Weighted Quantity Index' }
    ],
    correctAnswer: 'B',
    explanation: 'Section 1 of the CPI Compilation Manual mandates the Jevons index formula (unweighted geometric mean of price relatives) for elementary aggregates at the item-market level, which avoids the upward arithmetic bias inherent in the Carli formulation.',
    citation: 'Ref: CPI Base 2012=100 Manual, Section 1 (Elementary Aggregate Formulation)',
    difficulty: 'Advanced',
    competencyTag: 'Price Index Calculation',
    bloomsLevel: 'Analyzing',
    manualSource: 'CPI Compilation Manual'
  },
  {
    id: 'q-5',
    questionNumber: 5,
    question: 'In the Annual Survey of Industries (ASI), what is the key criterion that distinguishes the Census Sector from the Sample Sector for factory units?',
    options: [
      { id: 'A', text: 'Units with capital investment above ₹100 Crores regardless of workers' },
      { id: 'B', text: 'Units employing 100 or more workers (or 50+ in specified states) and all units in 12 less developed states' },
      { id: 'C', text: 'Units exclusively manufacturing defence and atomic energy products' },
      { id: 'D', text: 'Units registered under the Companies Act 2013 rather than the Factories Act 1948' }
    ],
    correctAnswer: 'B',
    explanation: 'Under ASI Operational Manual Vol I Section 2, the Census sector comprises units employing 100 or more workers (in certain smaller states 50 or more), all units in 12 less-developed states/UTs, and joint returns, all of which are surveyed with 100% complete coverage.',
    citation: 'Ref: ASI Operational Manual Vol I, Section 2 (Frame & Sectoral Stratification)',
    difficulty: 'Intermediate',
    competencyTag: 'Industrial Statistics',
    bloomsLevel: 'Understanding',
    manualSource: 'ASI Operational Manual Vol I'
  }
];

export const MASTERY_BADGES: any[] = [
  {
    id: 'badge-sampling-master',
    title: 'Sampling Methodology Specialist',
    description: 'Achieved >85% in NSS Stratified Multi-Stage Sampling Assessments',
    iconName: 'ShieldCheck',
    earnedDate: 'Aug 14, 2023',
    isUnlocked: true,
    karmaPointsReward: 250,
  },
  {
    id: 'badge-cpi-expert',
    title: 'Price Index Calculation Expert',
    description: 'Mastered Jevons Elementary Aggregates and CPI Base Weight Re-referencing',
    iconName: 'TrendingUp',
    earnedDate: 'Jul 28, 2023',
    isUnlocked: true,
    karmaPointsReward: 200,
  },
  {
    id: 'badge-[#viva-orator]',
    title: 'AI Viva Voice Champion',
    description: 'Completed 3 consecutive oral viva examinations with Distinction (>80%)',
    iconName: 'Mic',
    earnedDate: 'Aug 20, 2023',
    isUnlocked: true,
    karmaPointsReward: 300,
  },
  {
    id: 'badge-data-validation-pioneer',
    title: 'Survey Data Audit Pioneer',
    description: 'Enrolled in iGOT Automated Validation Module & cleared 5 audit scenarios',
    iconName: 'Sparkles',
    isUnlocked: false,
    karmaPointsReward: 500,
  },
];

export const DIVISION_METRICS: any[] = [
  {
    code: 'FOD',
    name: 'Field Operations Division',
    officersCount: 420,
    avgReadiness: 76,
    topGap: 'Automated Data Validation & Outlier Detection',
    status: 'Optimal',
  },
  {
    code: 'SDRD',
    name: 'Survey Design & Research Division',
    officersCount: 185,
    avgReadiness: 88,
    topGap: 'Python/R Geospatial Demarcation Analytics',
    status: 'Optimal',
  },
  {
    code: 'DPD',
    name: 'Data Processing Division',
    officersCount: 260,
    avgReadiness: 64,
    topGap: 'Python ETL Scripting & ASI Data Validation',
    status: 'Requires Attention',
  },
  {
    code: 'NAD',
    name: 'National Accounts Division',
    officersCount: 140,
    avgReadiness: 82,
    topGap: 'SNA 2008 Sequence of Accounts Compilation',
    status: 'Optimal',
  },
  {
    code: 'PRICE',
    name: 'Price Statistics Division',
    officersCount: 110,
    avgReadiness: 58,
    topGap: 'Hedonic Quality Adjustment in Urban CPI',
    status: 'Critical Training Deficit',
  },
];

export const VIVA_TOPICS: { id: string; title: string; manual: string; description: string; targetRole: string }[] = [
  {
    id: 'viva-topic-1',
    title: 'Survey Sampling & Stratification Methodology',
    manual: 'NSS 78th Round Instruction Manual',
    description: 'Oral evaluation on FSU selection, hamlet-group formation, probability proportional to size (PPS), and multiplier calculations.',
    targetRole: 'Senior Statistical Officer',
  },
  {
    id: 'viva-topic-2',
    title: 'CPI & IIP Aggregation & Base Year Weighting',
    manual: 'Consumer Price Index Manual (Base 2012=100)',
    description: 'Verbal assessment on elementary aggregate formulations (Jevons Index), geometric means, and price imputation protocols.',
    targetRole: 'Statistical Officer (Price Division)',
  },
  {
    id: 'viva-topic-3',
    title: 'PLFS Labour Force Classification & CWS/UPSS Criteria',
    manual: 'PLFS Concepts & Definitions Manual',
    description: 'Defense of Usual Principal & Subsidiary Status (UPSS) vs Current Weekly Status (CWS) Activity Status classification.',
    targetRole: 'Field Investigator / SSO',
  },
  {
    id: 'viva-topic-4',
    title: 'Annual Survey of Industries (ASI) Frame & Audit',
    manual: 'ASI Operational Manual Vol I',
    description: 'Explanation of Census vs Sample sector demarcation, Net Value Added (NVA) accounting, and factory schedule audit.',
    targetRole: 'Supervising Officer (DPD/FOD)',
  },
];

