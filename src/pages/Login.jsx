import React from "react";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";

export default function Login() {
  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Button onClick={handleLogin} className="tactical-button">
        SE CONNECTER
      </Button>
      <Button onClick={handleLogout} className="tactical-button">
        SE DÉCONNECTER
      </Button>
    </div>
  );
}
