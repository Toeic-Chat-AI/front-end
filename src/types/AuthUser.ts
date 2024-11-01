import { UserProfile } from "./UserProfile";

export type UserLoginPayload = {
  username: string;
  password: string;
};

export type UserLoginResponse = {
  message: string;
  token: string;
  user: UserProfile
};

export type UserRegisterPayload = {
  email: string;
  password: string;
  username: string;
  fullName: string;
};
