import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  classname?: string;
}

export interface Product {
  id: number;
  name: string;
  interestRate: string;
  term: string;
  minimumDeposit: string;
  maximumDeposit: string;
  link: string;
  logo: string;
}
