import { CircularProgress } from "@mui/material";

export const CustomLoading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};
