import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { isAuthenticated } from "../Auth/auth";

const EXTERNAL_LOGIN_URL = "http://localhost:3000/users/login";

const PrivateLayout = () => {
  const authenticated = isAuthenticated();

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
