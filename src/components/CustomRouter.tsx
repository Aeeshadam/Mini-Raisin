import React from "react";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";

interface CustomRouterProps extends BrowserRouterProps {
  children: React.ReactNode;
}

const CustomRouter: React.FC<CustomRouterProps> = ({ children, ...props }) => {
  return (
    <BrowserRouter
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
    </BrowserRouter>
  );
};

export default CustomRouter;
