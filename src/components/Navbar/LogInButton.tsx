import React from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";

const LogInButton: React.FC = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();

  if (user) {
    return <Button onClick={signOutUser}>Log Out</Button>;
  }

  return <Button onClick={signInWithGoogle}>Log In</Button>;
};

export default LogInButton;
