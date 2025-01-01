import { FC } from "react";
import { useApplyForm } from "../../../contexts/ApplyContext";
import Button from "../../../components/Button";
import styles from "./style.module.css";

const ApplyForm: FC = () => {
  const { depositAmount, handleInputChange, handleSubmit } = useApplyForm();

  return (
    <form onSubmit={handleSubmit} className={styles.applyForm}>
      <label className={styles.applyLabel} htmlFor="depositAmount">
        Enter Deposit Amount:
      </label>
      <input
        id="depositAmount"
        type="text"
        className={styles.applyFormInput}
        name="depositAmount"
        required
        value={depositAmount}
        onChange={handleInputChange}
      />
      <Button type="submit">Submit Application</Button>
    </form>
  );
};

export default ApplyForm;
