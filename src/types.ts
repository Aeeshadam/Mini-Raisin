import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

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
  startDate: string;
  closedDate?: string;
}
