import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EXTERNAL_LOGIN_URL = import.meta.env.VITE_EXTERNAL_LOGIN_URL ?? "http://localhost:3000/users/login";

const PrivateLayout = () => {
  const { isAuthenticated: authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) {
      window.location.replace(EXTERNAL_LOGIN_URL);
    }
  }, [authenticated]);

  if (!authenticated) {
    return null;
  }

  return <Outlet />;
};

export default PrivateLayout;
