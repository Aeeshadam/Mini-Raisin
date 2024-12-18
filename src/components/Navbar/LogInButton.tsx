import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";

const LogInButton: React.FC = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser();
    navigate("/");
  };

  if (user) {
    return <Button onClick={handleSignOut}>Log Out</Button>;
  }

  return (
    <Button onClick={signInWithGoogle} className="googleButton">
      <img src="/google.png" alt="google logo" />
      Log In with Google
    </Button>
  );
};

export default LogInButton;
