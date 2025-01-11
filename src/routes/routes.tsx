import React from "react";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Apply from "../pages/Apply";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";

interface Route {
  path: string;
  component: React.ReactNode;
}
const routes: Route[] = [
  { path: "/", component: <Home /> },
  {
    path: "/dashboard",
    component: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/apply/:productId",
    component: (
      <ProtectedRoute>
        <Apply />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export default routes;
