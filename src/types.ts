export interface Product {
  id: string;
  name: string;
  interestRate: number;
  term: string;
  minimumDeposit: number;
  maximumDeposit: number;
  link: string;
  logo: string;
}

export interface DashboardProduct extends Product {
  balance: number;
  interestEarned: number;
  startDate: string;
  closedDate?: string;
}
