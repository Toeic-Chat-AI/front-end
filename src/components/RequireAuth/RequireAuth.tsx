import React, { useEffect } from "react";
import { Outlet, useNavigate, NavigateFunction } from "react-router-dom";

export const RequiredAuth = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? "";

  //   useEffect(() => {
  //     if (token !== null) {
  //       setIsAuthenticated(true);
  //     } else {
  //       navigate("/login");
  //     }
  //   }, [token]);

  return <Outlet />;
};
