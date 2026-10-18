export interface Stat {
  value: string;
  label: string;
}

export const heroStats: Stat[] = [
  { value: '4+', label: 'Years shipping' },
  { value: 'Meta', label: 'Production scale' },
  { value: '10k+', label: 'Users supported' },
];

export const aboutStats: Stat[] = [
  { value: '4+', label: 'Years of experience' },
  { value: '4', label: 'Companies' },
  { value: '15+', label: 'Core technologies' },
  { value: '5', label: 'Engineers led in review' },
];
