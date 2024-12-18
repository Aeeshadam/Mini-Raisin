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
      role="alert"
      className={`${styles.notification} ${type !== null ? styles[type] : ""} `}
    >
      <p>{message}</p>
      <button onClick={onClose} aria-label="Close notification">
        Close
      </button>
    </div>
  );
};

export default Notification;
