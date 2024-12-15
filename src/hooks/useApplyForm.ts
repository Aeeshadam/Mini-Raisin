import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardProduct, Product } from "../types";
import { setActiveDeposits } from "../store/slices/activeDepositsSlice";
import { formatNumber } from "../utils";

const useApplyForm = (product: Product | undefined) => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepositAmount(formatNumber(value));
  };

  const isValidDeposit = (value: string) => {
    if (!product) {
      return false;
    }
    const numericValue = parseFloat(value.replace(/,/g, ""));
    return (
      numericValue >= product?.minimumDeposit &&
      numericValue <= product?.maximumDeposit
    );
  };

  const calculateInterestEarned = (
    amount: number,
    rate: number,
    startDate: string
  ) => {
    const dailyRate = rate / 100 / 365;
    const start = new Date(startDate);
    const now = new Date();
    const days = Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return amount * dailyRate * days;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidDeposit(depositAmount)) {
      alert("Invalid deposit amount");
      return;
    }
    if (!product) {
      return;
    }
    const numericValue = parseFloat(depositAmount.replace(/,/g, ""));
    const startDate = new Date().toISOString().split("T")[0];
    const interestEarned = calculateInterestEarned(
      numericValue,
      product.interestRate,
      startDate
    );
    const newDeposit: DashboardProduct = {
      ...product,
      interestEarned: interestEarned,
      balance: numericValue,
      startDate,
    };
    dispatch(setActiveDeposits([newDeposit]));
    navigate("/dashboard");
  };

  return { depositAmount, handleInputChange, handleSubmit };
};

export default useApplyForm;
