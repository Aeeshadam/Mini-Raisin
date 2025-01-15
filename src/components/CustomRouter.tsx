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
// This component is a wrapper around the BrowserRouter component. It adds the future prop to enable the new features in React Router v7. It also suppress warning for the new features in the console.
