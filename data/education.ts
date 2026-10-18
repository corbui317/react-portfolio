export interface Degree {
  school: string;
  degree: string;
  year: string;
  location: string;
}

export interface Credential {
  name: string;
  issuer: string;
  period?: string;
}

export const degrees: Degree[] = [
  {
    school: 'Wayne State University',
    degree: 'B.S. Computer Science & Engineering',
    year: '2021',
    location: 'Detroit, MI',
  },
  {
    school: 'Oakland Community College',
    degree: 'A.S. Computer Programming',
    year: '2017',
    location: 'Farmington Hills, MI',
  },
];

export const credentials: Credential[] = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', period: '2021 – 2024' },
  { name: 'ITIL Foundation', issuer: 'AXELOS' },
  { name: 'DoD Secret Clearance', issuer: 'U.S. Department of Defense', period: '2019 – 2021' },
];
