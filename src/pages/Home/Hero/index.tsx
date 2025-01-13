import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../../components/Button";
import styles from "./style.module.css";

const Hero = () => {
  const { user, signInWithGoogle } = useAuth();
  return (
    <header className={styles.heroContainer}>
      <div className={styles.heroOverlay}></div>
      <section className={styles.heroContent}>
        <h1>Maximize Your Savings with Secure Investment Accounts</h1>
        <p className={styles.heroDescription} aria-label="Website description">
          Explore high-yield savings accounts tailored to your financial goals.
          Secure, flexible, and rewarding.
        </p>

        {user ? (
          <Button to="/dashboard">Dashboard</Button>
        ) : (
          <Button onClick={signInWithGoogle} className="googleButton">
            Log In with Google
          </Button>
        )}
      </section>
    </header>
  );
};
export default Hero;
