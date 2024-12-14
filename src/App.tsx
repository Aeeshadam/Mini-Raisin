import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LogIn";
import Apply from "./pages/Apply";
import activeProductsData from "./data/activeProducts.json";
import closedProductsData from "./data/closedProducts.json";

const App = () => {
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
          <Route path="/apply" element={<Apply />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
