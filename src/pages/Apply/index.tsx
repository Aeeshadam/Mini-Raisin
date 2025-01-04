import { useParams } from "react-router-dom";
import { ApplyFormProvider } from "../../contexts/ApplyContext";
import ProductDetails from "../../components/ProductDetails";
import ApplyForm from "./ApplyForm";
import products from "../../data/products.json";
import { Product } from "../../types";
import styles from "./style.module.css";

const Apply = () => {
  const { productId } = useParams<{ productId: string }>();

  const product = products.find(
    (product: Product) => product.id === productId
  ) as Product | undefined;

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main className={styles.apply}>
      <h2>Your savings account choice</h2>
      <div className={styles.logoAndNameContainer}>
        <img
          className={styles.productLogo}
          src={product.logo}
          alt={`${product.name} logo`}
        />
        <h4>{product.name}</h4>
      </div>
      <ProductDetails product={product} />
      <ApplyFormProvider product={product}>
        <ApplyForm />
      </ApplyFormProvider>
    </main>
  );
};

export default Apply;
