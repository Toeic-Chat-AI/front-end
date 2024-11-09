import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeAllCookies } from "../helpers";

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeAllCookies();
    navigate("/login");
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};
