import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { DashboardProduct } from "../types/types";
import { setClosedDeposits } from "../store/slices/closedDepositsSlice";
import { removeActiveDeposit } from "../store/slices/activeDepositsSlice";
import { useNotification } from "./NotificationContext";
import { saveDeposit, removeDeposit } from "../utils/localStorageUtils";
import { calculateInterestEarned } from "../utils/utils";

interface DashboardContextProps {
  handleCloseDeposit: (product: DashboardProduct) => void;
  closedDeposits: DashboardProduct[];
  activeDeposits: DashboardProduct[];
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const activeDeposits = useSelector(
    (state: RootState) => state.activeDeposits.activeDeposits
  );
  const closedDeposits = useSelector(
    (state: RootState) => state.closedDeposits.closedDeposits
  );

  const handleCloseDeposit = useCallback(
    (product: DashboardProduct) => {
      if (!product) return;

      const newDeposit: DashboardProduct = {
        ...product,
        closedDate: new Date().toISOString().split("T")[0],
        interestEarned: calculateInterestEarned(
          product.balance,
          product.interestRate,
          product.startDate
        ),
      };
      dispatch(setClosedDeposits([newDeposit]));
      dispatch(removeActiveDeposit(product.id));
      saveDeposit("closed", newDeposit);
      removeDeposit("active", product.id);
      showNotification("Deposit closed successfully", "success");
    },
    [dispatch, showNotification]
  );

  return (
    <DashboardContext.Provider
      value={{ handleCloseDeposit, activeDeposits, closedDeposits }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
