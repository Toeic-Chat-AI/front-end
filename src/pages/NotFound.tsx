import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeAllCookies, getCookie } from "../helpers";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/chat");
    } else {
      removeAllCookies();
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};
