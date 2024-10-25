import Cookies from "js-cookie";

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const setCookie = (name: string, value: string) => {
  return Cookies.set(name, value);
};

export const removeCookie = (name: string) => {
  return Cookies.remove(name);
};

export const removeAllCookies = () => {
  return Object.keys(Cookies.get()).forEach((cookie) => {
    Cookies.remove(cookie);
  });
};
