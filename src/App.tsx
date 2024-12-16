import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { AuthProvider } from "./contexts/AuthContext";
import { useNotification } from "./contexts/NotificationContext";
import Notification from "./components/Notifications";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Apply from "./pages/Apply";

const App = () => {
  const activeProductsData = useSelector(
    (state: RootState) => state.activeDeposits.activeDeposits
  );
  const closedProductsData = useSelector(
    (state: RootState) => state.closedDeposits.closedDeposits
  );
  const { message, type, closeNotification } = useNotification();
  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  activeProducts={activeProductsData}
                  closedProducts={closedProductsData}
                />
              }
            />
            <Route path="apply/:productId" element={<Apply />} />
          </Routes>
          <Footer />
        </Router>
        {message && (
          <Notification
            message={message}
            type={type}
            onClose={closeNotification}
          />
        )}
      </AuthProvider>
    </div>
  );
};

export default App;
