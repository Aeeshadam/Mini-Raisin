import React from "react";
import styles from "./style.module.css";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info" | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  return (
    <div
      className={`${styles.notification} ${type !== null ? styles[type] : ""} `}
    >
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;
