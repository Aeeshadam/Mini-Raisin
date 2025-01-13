import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
