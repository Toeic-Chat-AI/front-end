import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TITLE_CLASSNAME = "font-bold text-xl text-white";

type Login = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<Login>();
  const navigate = useNavigate();

  const onSubmit = async (data: Login) => {
    console.log(data);
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-1/2 h-1/2 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <div className="bg-slate-500">
          <div className="flex-1 flex flex-col gap-4 p-8">
            <div className="self-center text-2xl font-bold text-white">
              Login Page
            </div>
            <div className={TITLE_CLASSNAME}>User Name</div>
            <TextField variant="outlined" {...register("username")} />
            <div className={TITLE_CLASSNAME}>Password</div>
            <TextField variant="outlined" {...register("password")} />
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
    </form>
  );
};
