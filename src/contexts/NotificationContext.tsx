import { createContext, useContext, useState, ReactNode, FC } from "react";

interface NotificationContextProps {
  message: string | null;
  type: "success" | "error" | "info" | null;
  showNotification: (msg: string, type: "success" | "error" | "info") => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "info" | null>(null);

  const resetNotification = () => {
    setMessage(null);
    setType(null);
  };

  const showNotification = (
    msg: string,
    type: "success" | "error" | "info"
  ) => {
    setMessage(msg);
    setType(type);
    setTimeout(() => {
      resetNotification();
    }, 3000);
  };

  const closeNotification = () => {
    resetNotification();
  };

  return (
    <NotificationContext.Provider
      value={{ message, type, showNotification, closeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
