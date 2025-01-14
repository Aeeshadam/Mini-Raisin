import { FC } from "react";

const DetailItem: FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <h4>{label}:</h4>
    <p>{value}</p>
  </div>
);

export default DetailItem;
