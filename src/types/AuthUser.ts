export type UserLoginPayload = {
  username: string;
  password: string;
};

export type UserLoginResponse = {
  message: string;
  token: string;
  user: {
    email: string;
    fullName: string;
    username: string;
    id: string;
  };
};

export type UserRegisterPayload = {
  email: string;
  password: string;
  username: string;
  fullName: string;
};
