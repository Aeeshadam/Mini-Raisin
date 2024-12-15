import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardProduct } from "../types";
import { setClosedDeposits } from "../store/slices/closedDepositsSlice";
import { removeActiveDeposit } from "../store/slices/activeDepositsSlice";

const useCloseDeposit = (product: DashboardProduct | undefined) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleCloseDeposit = () => {
    if (!product) {
      return;
    }
    setIsSubmitting(true);
    const newDeposit: DashboardProduct = {
      ...product,
      closedDate: new Date().toISOString().split("T")[0],
    };
    dispatch(setClosedDeposits([newDeposit]));
    dispatch(removeActiveDeposit(product.id));
    setIsSubmitting(false);
  };

  return { isSubmitting, handleCloseDeposit };
};

export default useCloseDeposit;
