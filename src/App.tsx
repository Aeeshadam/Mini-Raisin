import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Notification from "./components/Notifications";
import routes from "./routes/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import styles from "./styles/App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            {routes.map(({ path, component }) => (
              <Route path={path} element={component} key={path} />
            ))}
          </Routes>
          <Footer />
        </Router>
        <Notification />
      </AuthProvider>
    </div>
  );
};

export default App;
