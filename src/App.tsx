import { useEffect } from "react";
import { Routes } from "./routes/Routes";
import { useGetUserProfile } from "./hooks/useUserProfile";
import { CustomLoading } from "./components/Loading/Loading";
import { useGlobalStorage } from "./contexts/Storage";

const App = () => {
  const { data, isLoading } = useGetUserProfile();
  const { setUser } = useGlobalStorage();

  useEffect(() => {
    if (data) setUser(data);
    // eslint-disable-next-line
  }, [data]);

  if (isLoading) return <CustomLoading />;

  return <Routes />;
};

export default App;
