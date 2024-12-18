import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { DashboardProduct } from "../types";
import { setClosedDeposits } from "../store/slices/closedDepositsSlice";
import { removeActiveDeposit } from "../store/slices/activeDepositsSlice";
import { useNotification } from "./NotificationContext";
import { saveDeposit, removeDeposit } from "../utils/localStorageUtils";

interface CloseDepositContextProps {
  handleCloseDeposit: () => void;
}

const CloseDepositContext = createContext<CloseDepositContextProps | undefined>(
  undefined
);

interface CloseDepositProviderProps {
  children: ReactNode;
  product: DashboardProduct | undefined;
}

export const CloseDepositProvider: React.FC<CloseDepositProviderProps> = ({
  children,
  product,
}) => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const handleCloseDeposit = useCallback(() => {
    if (!product) {
      return;
    }
    const newDeposit: DashboardProduct = {
      ...product,
      closedDate: new Date().toISOString().split("T")[0],
    };
    dispatch(setClosedDeposits([newDeposit]));
    dispatch(removeActiveDeposit(product.id));
    saveDeposit("closed", newDeposit);
    removeDeposit("active", product.id);
    showNotification("Deposit closed successfully", "success");
  }, [dispatch, product, showNotification]);

  return (
    <CloseDepositContext.Provider value={{ handleCloseDeposit }}>
      {children}
    </CloseDepositContext.Provider>
  );
};

export const useCloseDeposit = () => {
  const context = useContext(CloseDepositContext);
  if (!context) {
    throw new Error(
      "useCloseDeposit must be used within a CloseDepositProvider"
    );
  }
  return context;
};
