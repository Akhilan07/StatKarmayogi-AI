export interface DepartmentHeatmap {
  id: string;
  name: string;
  code: string;
  officerCount: number;
  readinessScore: number;
  gapDeficit: string;
  riskLevel: 'Low' | 'Moderate' | 'Critical';
  tpacBatchesScheduled: number;
  pillars: {
    statistical: number;
    technical: number;
    governance: number;
    behavioural: number;
  };
}

export const DEPARTMENT_HEATMAPS: DepartmentHeatmap[] = [
  {
    id: 'dept-1',
    name: 'Field Operations Division (FOD Zonal HQ)',
    code: 'NSSO-FOD',
    officerCount: 680,
    readinessScore: 78,
    gapDeficit: 'Automated Microdata Anomaly Detection',
    riskLevel: 'Moderate',
    tpacBatchesScheduled: 8,
    pillars: { statistical: 84, technical: 42, governance: 88, behavioural: 90 }
  },
  {
    id: 'dept-2',
    name: 'Survey Design & Research Division (SDRD Kolkata)',
    code: 'NSSO-SDRD',
    officerCount: 220,
    readinessScore: 91,
    gapDeficit: 'Geospatial Satellite Demarcation (QGIS)',
    riskLevel: 'Low',
    tpacBatchesScheduled: 12,
    pillars: { statistical: 95, technical: 82, governance: 92, behavioural: 94 }
  },
  {
    id: 'dept-3',
    name: 'Price Statistics Division (PSD New Delhi)',
    code: 'NSSO-PSD',
    officerCount: 140,
    readinessScore: 56,
    gapDeficit: 'Hedonic Quality Adjustment & CPI Imputation',
    riskLevel: 'Critical',
    tpacBatchesScheduled: 15,
    pillars: { statistical: 62, technical: 38, governance: 70, behavioural: 80 }
  },
  {
    id: 'dept-4',
    name: 'National Accounts Division (NAD HQ)',
    code: 'CSO-NAD',
    officerCount: 190,
    readinessScore: 85,
    gapDeficit: 'System of National Accounts (SNA 2008) SUT',
    riskLevel: 'Low',
    tpacBatchesScheduled: 10,
    pillars: { statistical: 92, technical: 75, governance: 86, behavioural: 88 }
  },
  {
    id: 'dept-5',
    name: 'Data Processing Division (DPD Operations)',
    code: 'NSSO-DPD',
    officerCount: 310,
    readinessScore: 62,
    gapDeficit: 'Python ETL Parsing & Microdata ASCII Scripts',
    riskLevel: 'Critical',
    tpacBatchesScheduled: 14,
    pillars: { statistical: 70, technical: 40, governance: 74, behavioural: 82 }
  },
  {
    id: 'dept-6',
    name: 'State Directorate of Economics & Statistics (DES Union)',
    code: 'STATE-DES',
    officerCount: 1250,
    readinessScore: 52,
    gapDeficit: 'SDG Indicator Metadata & Open Data APIs',
    riskLevel: 'Critical',
    tpacBatchesScheduled: 24,
    pillars: { statistical: 60, technical: 32, governance: 58, behavioural: 72 }
  }
];

export const DIID_LEADERSHIP_STATS = {
  nationalReadinessIndex: 71.4,
  totalOfficersTracked: 2790,
  activeTpacProgrammes: 83,
  criticalDeficitCadres: 'Price Statistics & State DES',
  projectedReadinessQ4: 84.5
};
