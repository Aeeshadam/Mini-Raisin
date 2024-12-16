import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
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
  interestEarned: number;
  startDate: string;
  closedDate?: string;
}

export interface NotificationContextProps {
  message: string | null;
  type: "success" | "error" | "info" | null;
  showNotification: (msg: string, type: "success" | "error" | "info") => void;
  closeNotification: () => void;
}
