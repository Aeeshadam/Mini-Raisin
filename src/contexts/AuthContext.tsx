import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  FC,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebaseConfig";
import {
  setActiveDeposits,
  setLoading,
  resetActiveDeposits,
} from "../store/slices/activeDepositsSlice";
import {
  setClosedDeposits,
  resetClosedDeposits,
} from "../store/slices/closedDepositsSlice";
import { useNotification } from "./NotificationContext";
import { loadDeposits } from "../utils";

export interface AuthContextProps {
  authLoading: boolean;
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { showNotification } = useNotification();
  const dispatch = useDispatch();

  const loadUserDeposits = useCallback(() => {
    const activeDeposits = loadDeposits("active");
    const closedDeposits = loadDeposits("closed");
    dispatch(setActiveDeposits(activeDeposits));
    dispatch(setClosedDeposits(closedDeposits));
  }, [dispatch]);

  const resetUserDeposits = useCallback(() => {
    dispatch(resetActiveDeposits());
    dispatch(resetClosedDeposits());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        dispatch(setLoading(true));
        loadUserDeposits();
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, loadUserDeposits]);

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
      resetUserDeposits();
      showNotification("Logged out", "info");
    } catch (error) {
      console.error("Error signing out", error);
      showNotification("Error signing out", "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, signInWithGoogle, signOutUser }}
    >
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
