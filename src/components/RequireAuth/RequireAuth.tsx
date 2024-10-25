import React, { useEffect } from "react";
import { Outlet, useNavigate, NavigateFunction } from "react-router-dom";
import { getCookie } from "../../helpers";
import { useGlobalStorage } from "../../contexts/Storage";

export const RequiredAuth = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const token = getCookie("token");

  const { setIsLogged } = useGlobalStorage();

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    } else {
      navigate("/login");
    }
  }, [token]);

  return <Outlet />;
};
