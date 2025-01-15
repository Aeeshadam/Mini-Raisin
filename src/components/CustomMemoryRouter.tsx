import React from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

interface CustomMemoryRouterProps extends MemoryRouterProps {
  children: React.ReactNode;
}

const CustomMemoryRouter: React.FC<CustomMemoryRouterProps> = ({
  children,
  ...props
}) => {
  return (
    <MemoryRouter
      {...props}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {children}
    </MemoryRouter>
  );
};

export default CustomMemoryRouter;
// This component is a wrapper around the MemoryRouter component. It adds the future prop to enable the new features in React Router v7. It also suppress warning for the new features in the console.
