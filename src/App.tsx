import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Notification from "./components/Notifications";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Apply from "./pages/Apply";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="apply/:productId" element={<Apply />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
        <Notification />
      </AuthProvider>
    </div>
  );
};

export default App;
