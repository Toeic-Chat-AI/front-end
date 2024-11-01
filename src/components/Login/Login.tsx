import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/authUser";
import { setCookie } from "../../helpers";
import { toast } from "react-toastify";
import { useGlobalStorage } from "../../contexts/Storage";

const TITLE_CLASSNAME = "font-bold text-xl text-black";

type Login = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const { setUser } = useGlobalStorage();
  const { register, handleSubmit } = useForm<Login>();
  const navigate = useNavigate();

  const onSubmit = async (data: Login) => {
    try {
      const userLoginData = await userLogin(data);

      if (userLoginData) {
        setUser(userLoginData.user);
        setCookie("token", userLoginData.token);
        setCookie("userId", userLoginData.user.id);
        navigate("/chat");
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  const onError = (error: any) => {
    toast.error("Login failed");
    console.error(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="w-1/3 h-1/2 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <div className="bg-slate-200">
          <div className="flex-1 flex flex-col gap-4 p-8">
            <div className="self-center text-2xl font-bold text-black">
              Login Page
            </div>
            <div className={TITLE_CLASSNAME}>User Name</div>
            <TextField
              variant="outlined"
              {...register("username", { required: true })}
            />
            <div className={TITLE_CLASSNAME}>Password</div>
            <TextField
              variant="outlined"
              type="password"
              {...register("password", { required: true })}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outlined"
                className="self-end w-fit"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="self-end w-fit"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
