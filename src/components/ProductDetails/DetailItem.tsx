import React from "react";

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <h4>{label}:</h4>
    <p>{value}</p>
  </div>
);

export default DetailItem;
