import axiosClient from "./axiosClients";
import {
  UserLoginPayload,
  UserRegisterPayload,
  UserLoginResponse
} from "../types";

export const userLogin = async (
  data: UserLoginPayload
): Promise<UserLoginResponse> => {
  const response = await axiosClient.post("/login", data);
  return response.data;
};

export const userRegister = (data: UserRegisterPayload) => {
  const response = axiosClient.post("/register", data);
  return response;
};
