import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardProduct, Product } from "../types";
import { setActiveDeposits } from "../store/slices/activeDepositsSlice";
import { formatNumber } from "../utils/utils";
import { useNotification } from "./NotificationContext";
import { saveDeposit } from "../utils/localStorageUtils";

interface ApplyFormContextProps {
  depositAmount: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ApplyFormContext = createContext<ApplyFormContextProps | undefined>(
  undefined
);

interface ApplyFormProviderProps {
  children: ReactNode;
  product: Product | undefined;
}

export const ApplyFormProvider: React.FC<ApplyFormProviderProps> = ({
  children,
  product,
}) => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepositAmount(formatNumber(value));
  };

  const isValidAmount = (value: string) => {
    if (!product) return false;
    const numericValue = parseFloat(value.replace(/,/g, ""));
    return (
      numericValue >= product.minimumDeposit &&
      numericValue <= product.maximumDeposit
    );
  };

  const calculateInterestEarned = useCallback(
    (amount: number, rate: number, startDate: string) => {
      const dailyRate = rate / 100 / 365;
      const start = new Date(startDate);
      const now = new Date();
      const days = Math.floor(
        (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return amount * dailyRate * days;
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isValidAmount(depositAmount)) {
        showNotification(
          "Deposit amount must be within the min and max deposit limits",
          "error"
        );
        return;
      }
      if (!product) return;

      const numericValue = parseFloat(depositAmount.replace(/,/g, ""));
      const startDate = new Date().toISOString().split("T")[0];
      const interestEarned = calculateInterestEarned(
        numericValue,
        product.interestRate,
        startDate
      );

      const newDeposit: DashboardProduct = {
        ...product,
        id: `${product.id}-${Date.now()}`,
        interestEarned,
        balance: numericValue,
        startDate,
      };

      dispatch(setActiveDeposits([newDeposit]));
      saveDeposit("active", newDeposit);
      navigate("/dashboard");
      showNotification("Deposit opened successfully", "success");
    },
    [
      depositAmount,
      product,
      showNotification,
      calculateInterestEarned,
      dispatch,
      navigate,
      isValidAmount,
    ]
  );

  return (
    <ApplyFormContext.Provider
      value={{
        depositAmount,
        handleInputChange,
        handleSubmit,
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export const useApplyForm = () => {
  const context = useContext(ApplyFormContext);
  if (!context) {
    throw new Error("useApplyForm must be used within an ApplyFormProvider");
  }
  return context;
};
