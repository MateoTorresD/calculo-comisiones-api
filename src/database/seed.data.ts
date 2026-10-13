
export const SELLERS = ['Perico P', 'Zoila B', 'Aquiles C', 'Johny M'] as const;

export const RULES = [
  { minAmount: 1000, percentage: 0.15 },
  { minAmount: 800, percentage: 0.1 },
  { minAmount: 600, percentage: 0.08 },
  { minAmount: 500, percentage: 0.06 },
] as const;

export const SALES: ReadonlyArray<{
  date: string;
  seller: (typeof SELLERS)[number];
  amount: number;
}> = [
  { date: '2025-06-02', seller: 'Aquiles C', amount: 400 },
  { date: '2025-06-04', seller: 'Perico P', amount: 300 },
  { date: '2025-06-09', seller: 'Aquiles C', amount: 300 },
  { date: '2025-06-11', seller: 'Zoila B', amount: 200 },
  { date: '2025-06-15', seller: 'Johny M', amount: 1000 },
  { date: '2025-06-18', seller: 'Aquiles C', amount: 200 },
  { date: '2025-06-20', seller: 'Perico P', amount: 1200 },
  { date: '2025-06-25', seller: 'Zoila B', amount: 800 },
  { date: '2025-07-01', seller: 'Aquiles C', amount: 500 },
  { date: '2025-07-05', seller: 'Johny M', amount: 700 },
];
