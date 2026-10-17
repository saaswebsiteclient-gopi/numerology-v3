export interface NumerologyBreakdown {
  driverNumber: number; // Moolank
  destinyNumber: number; // Bhagyank
  driverRuler: string;
  destinyRuler: string;
  driverKeywords: string;
  destinyKeywords: string;
  gridCounts: Record<number, number>;
  presentPlanes: { name: string; numbers: number[]; status: string }[];
}

const PLANETARY_RULERS: Record<number, { ruler: string; keywords: string }> = {
  1: { ruler: 'Sun (Surya)', keywords: 'Leadership, Ambition, Pioneer Spirit, Vitality' },
  2: { ruler: 'Moon (Chandra)', keywords: 'Intuition, Diplomacy, Empathy, Cooperation' },
  3: { ruler: 'Jupiter (Guru)', keywords: 'Wisdom, Knowledge, Optimism, Creative Expression' },
  4: { ruler: 'Rahu (North Node)', keywords: 'Discipline, Strategy, Practicality, Breakthroughs' },
  5: { ruler: 'Mercury (Budha)', keywords: 'Communication, Adaptability, Commerce, Freedom' },
  6: { ruler: 'Venus (Shukra)', keywords: 'Harmony, Luxury, Aesthetics, Responsibility' },
  7: { ruler: 'Ketu (South Node)', keywords: 'Spirituality, Research, Introspection, Depth' },
  8: { ruler: 'Saturn (Shani)', keywords: 'Authority, Perseverance, Karma, Executive Power' },
  9: { ruler: 'Mars (Mangal)', keywords: 'Courage, Energy, Humanitarianism, Passion' }
};

export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num === 0 ? 9 : num;
}

export function calculateNumerologyProfile(dobString: string): NumerologyBreakdown | null {
  if (!dobString) return null;
  const parts = dobString.split('-');
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  // Driver Number (Moolank) = day reduced to single digit
  const driverNumber = reduceToSingleDigit(day);

  // Destiny Number (Bhagyank) = total sum of DD + MM + YYYY
  const totalSum = day + month + year;
  const destinyNumber = reduceToSingleDigit(totalSum);

  // Lo Shu Grid digit extraction from full birth date (e.g., 1990-10-24 -> 2, 4, 1, 0, 1, 9, 9, 0)
  const fullDateDigits = `${day}${month}${year}${driverNumber}${destinyNumber}`.split('');
  const gridCounts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };

  for (const char of fullDateDigits) {
    const d = parseInt(char, 10);
    if (d >= 1 && d <= 9) {
      gridCounts[d] = (gridCounts[d] || 0) + 1;
    }
  }

  const planes = [
    { name: 'Mental Plane', numbers: [4, 9, 2], status: hasAll(gridCounts, [4, 9, 2]) ? 'Complete' : getStatus(gridCounts, [4, 9, 2]) },
    { name: 'Emotional Plane', numbers: [3, 5, 7], status: hasAll(gridCounts, [3, 5, 7]) ? 'Complete' : getStatus(gridCounts, [3, 5, 7]) },
    { name: 'Practical Plane', numbers: [8, 1, 6], status: hasAll(gridCounts, [8, 1, 6]) ? 'Complete' : getStatus(gridCounts, [8, 1, 6]) },
    { name: 'Thought Plane', numbers: [4, 3, 8], status: hasAll(gridCounts, [4, 3, 8]) ? 'Complete' : getStatus(gridCounts, [4, 3, 8]) },
    { name: 'Will Plane', numbers: [9, 5, 1], status: hasAll(gridCounts, [9, 5, 1]) ? 'Complete' : getStatus(gridCounts, [9, 5, 1]) },
    { name: 'Action Plane', numbers: [2, 7, 6], status: hasAll(gridCounts, [2, 7, 6]) ? 'Complete' : getStatus(gridCounts, [2, 7, 6]) },
    { name: 'Golden Prosperity', numbers: [4, 5, 6], status: hasAll(gridCounts, [4, 5, 6]) ? 'Royal Presence' : getStatus(gridCounts, [4, 5, 6]) }
  ];

  return {
    driverNumber,
    destinyNumber,
    driverRuler: PLANETARY_RULERS[driverNumber]?.ruler || 'Universal Force',
    destinyRuler: PLANETARY_RULERS[destinyNumber]?.ruler || 'Universal Force',
    driverKeywords: PLANETARY_RULERS[driverNumber]?.keywords || '',
    destinyKeywords: PLANETARY_RULERS[destinyNumber]?.keywords || '',
    gridCounts,
    presentPlanes: planes
  };
}

function hasAll(counts: Record<number, number>, nums: number[]): boolean {
  return nums.every((n) => (counts[n] || 0) > 0);
}

function getStatus(counts: Record<number, number>, nums: number[]): string {
  const activeCount = nums.filter((n) => (counts[n] || 0) > 0).length;
  if (activeCount === 0) return 'Needs Balancing';
  if (activeCount === 1) return 'Partial (1/3)';
  return 'Strong (2/3)';
}

export function formatToDDMMYYYY(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
}
