import { CircularProgress } from "@mui/material";

export const CustomLoading = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-white bg-opacity-10 z-10">
      <CircularProgress />
    </div>
  );
};
