import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/authUser";
import { toast } from "react-toastify";

const TITLE_CLASSNAME = "font-bold text-xl";

type Register = {
  username: string;
  password: string;
  email: string;
  fullName: string;
};

export const RegisterPage = () => {
  const { register, handleSubmit } = useForm<Register>();
  const navigate = useNavigate();

  const onSubmit = async (data: Register) => {
    await userRegister(data);
    toast.success("Register success");
    navigate("/login");
  };

  const onError = (error: any) => {
    toast.error("Register failed");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="w-1/3 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <div className="bg-slate-200">
          <div className="flex-1 flex flex-col gap-4 p-8">
            <div className="self-center text-2xl font-bold">Register Page</div>
            <div className={TITLE_CLASSNAME}>User Name</div>
            <TextField
              variant="outlined"
              {...register("username", { required: true })}
            />
            <div className={TITLE_CLASSNAME}>Password</div>
            <TextField
              type="password"
              variant="outlined"
              {...register("password", { required: true })}
            />
            <div className={TITLE_CLASSNAME}>Full name</div>
            <TextField
              variant="outlined"
              {...register("fullName", { required: true })}
            />
            <div className={TITLE_CLASSNAME}>Email</div>
            <TextField
              variant="outlined"
              {...register("email", { required: true })}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outlined"
                className="self-end w-fit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="self-end w-fit"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
