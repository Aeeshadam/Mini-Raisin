import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LogIn";
import Apply from "./pages/Apply";

const App = () => {
  const activeProductsData = useSelector(
    (state: RootState) => state.activeDeposits.activeDeposits
  );
  const closedProductsData = useSelector(
    (state: RootState) => state.closedDeposits.closedDeposits
  );
  return (
    <div className="container">
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
          <Route path="/login" element={<Login />} />
          <Route path="apply/:productId" element={<Apply />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
