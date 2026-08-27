/**
 * Officer Data & Competency Telemetry Service
 */

export interface OfficerProfileData {
  karmayogiId: string;
  name: string;
  role: string;
  division: string;
  readinessScore: number;
  activeCertifications: string[];
}

export const MOCK_OFFICER_PROFILES: Record<string, OfficerProfileData> = {
  'KARM-MOSPI-88941': {
    karmayogiId: 'KARM-MOSPI-88941',
    name: 'A. Sharma',
    role: 'Senior Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    readinessScore: 88,
    activeCertifications: ['Level 4 Survey Specialist', 'NSS 78th Round Field Scrutiny'],
  },
  'KARM-MOSPI-77412': {
    karmayogiId: 'KARM-MOSPI-77412',
    name: 'P. V. Ramakrishnan',
    role: 'Director (National Accounts)',
    division: 'National Accounts Division (NAD)',
    readinessScore: 92,
    activeCertifications: ['GDP Computation Expert', 'SNA 2008 Framework'],
  },
  'KARM-MOSPI-55120': {
    karmayogiId: 'KARM-MOSPI-55120',
    name: 'Meera Deshmukh',
    role: 'Junior Statistical Officer',
    division: 'Economic Statistics Division (ESD)',
    readinessScore: 74,
    activeCertifications: ['CPI Data Scrutiny Basics'],
  },
};

export const getOfficerProfile = (karmayogiId: string): OfficerProfileData => {
  return MOCK_OFFICER_PROFILES[karmayogiId] || MOCK_OFFICER_PROFILES['KARM-MOSPI-88941'];
};

export const getOfficerCompetencyProfile = (karmayogiId: string) => {
  const profile = getOfficerProfile(karmayogiId);
  return {
    karmayogiId: profile.karmayogiId,
    name: profile.name,
    overallReadinessScore: profile.readinessScore,
    competencyDomains: [
      { name: 'Survey Sampling & Stratification', scorePercentage: 84, benchmark: 80, status: 'Proficient' },
      { name: 'CPI & Price Index Aggregation', scorePercentage: 78, benchmark: 75, status: 'Proficient' },
      { name: 'Automated Field Scrutiny & Data Quality', scorePercentage: 68, benchmark: 85, status: 'Gap Identified' },
    ],
  };
};
