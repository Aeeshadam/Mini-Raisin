import React from "react";
import { useNotification } from "../../contexts/NotificationContext";
import styles from "./style.module.css";

const Notification = () => {
  const { message, type, closeNotification } = useNotification();

  if (!message) return null;

  return (
    <div
      role="alert"
      className={`${styles.notification} ${type ? styles[type] : ""} `}
    >
      <p>{message}</p>
      <button onClick={closeNotification} aria-label="Close notification">
        Close
      </button>
    </div>
  );
};

export default Notification;
