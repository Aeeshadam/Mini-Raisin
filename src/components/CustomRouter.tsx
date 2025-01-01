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
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {children}
    </BrowserRouter>
  );
};

export default CustomRouter;
