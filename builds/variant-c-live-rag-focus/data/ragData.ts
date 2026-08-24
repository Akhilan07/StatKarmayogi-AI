export interface DocumentChunk {
  id: string;
  sectionTitle: string;
  chapter: string;
  content: string;
  cosineSimilarity: number;
  tokens: number;
}

export const SAMPLE_RAG_DOCUMENT = {
  title: 'NSS 78th Round Instruction Manual: Multiple Indicators & Domestic Tourism',
  code: 'NSS-78-VOL-I',
  totalSections: 24,
  chunks: [
    {
      id: 'chunk-101',
      chapter: 'Chapter 3: Sampling Design & Coverage',
      sectionTitle: 'Section 3.2: Multi-stage Stratified Sampling Frame',
      content: `A stratified multi-stage design is adopted for the 78th round survey. The first stage units (FSU) are Census villages (Panchayat wards for Kerala) in rural sector and Urban Frame Survey (UFS) blocks in urban sector. The ultimate stage units (USU) are households in both sectors.`,
      cosineSimilarity: 0.94,
      tokens: 145
    },
    {
      id: 'chunk-102',
      chapter: 'Chapter 3: Sampling Design & Coverage',
      sectionTitle: 'Section 3.3: Large FSUs and Hamlet-Group Formation',
      content: `For large FSUs with approximate present population 1200 or more, hamlet-group formation is mandatory. The FSU is divided into a specified number of hamlet-groups (hg's) of nearly equal population content. Two hg's are selected for listing: hg 1 with maximum population is selected with certainty, and one more hg is selected randomly using SRSWOR.`,
      cosineSimilarity: 0.91,
      tokens: 182
    },
    {
      id: 'chunk-103',
      chapter: 'Chapter 4: Operational Field Rules',
      sectionTitle: 'Section 4.1: Listing Schedule 0.0 Execution & Scrutiny',
      content: `In each selected FSU, a complete listing of all houses and households is done in Schedule 0.0 before selecting sample households. Field supervisors must carry out 100% scrutiny of primary listing schedules and a minimum of 25% re-interviews.`,
      cosineSimilarity: 0.88,
      tokens: 160
    }
  ]
};
