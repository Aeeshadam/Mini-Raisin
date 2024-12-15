import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { Product } from "../../types";
import products from "../../data/products.json";
import ProductDetails from "../../components/ProductDetails.tsx";
import Button from "../../components/Button";
import useApplyForm from "../../hooks/useApplyForm";

const Apply = () => {
  const { productId } = useParams();
  const product = products.find((product: Product) => product.id === productId);

  const { depositAmount, handleInputChange, handleSubmit } =
    useApplyForm(product);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main className={styles.apply}>
      <h2>Your savings account choice</h2>
      <div className={styles.logoAndNameContainer}>
        <img src={product.logo} alt={`${product.name} logo`} />
        <h4>{product.name}</h4>
      </div>
      <ProductDetails product={product} />

      <form className={styles.applyForm} onSubmit={handleSubmit}>
        <label htmlFor="depositAmount">Enter Deposit Amount:</label>
        <input
          type="text"
          name="depositAmount"
          required
          value={depositAmount}
          onChange={handleInputChange}
        />

        <Button type="submit">Submit Application</Button>
      </form>
    </main>
  );
};
export default Apply;
