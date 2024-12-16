import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNotification } from "./NotificationContext";
import { log } from "console";

interface AuthContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { showNotification } = useNotification();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      showNotification("Logged in successfully", "success");
    } catch (error) {
      console.error("Error signing in", error);
      showNotification("Error signing in", "error");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      showNotification("Logged out", "info");
    } catch (error) {
      console.error("Error signing out", error);
      showNotification("Error signing out", "error");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
