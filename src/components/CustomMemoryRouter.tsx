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
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
      }}
    >
      {children}
    </MemoryRouter>
  );
};

export default CustomMemoryRouter;
