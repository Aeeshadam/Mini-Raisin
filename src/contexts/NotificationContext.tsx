// context/NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextProps {
  message: string | null;
  type: "success" | "error" | "info" | null;
  showNotification: (msg: string, type: "success" | "error" | "info") => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "info" | null>(null);

  const showNotification = (
    msg: string,
    type: "success" | "error" | "info"
  ) => {
    setMessage(msg);
    setType(type);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  };

  const closeNotification = () => {
    setMessage(null);
    setType(null);
  };

  return (
    <NotificationContext.Provider
      value={{ message, type, showNotification, closeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
