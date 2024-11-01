import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useEffect
} from "react";
import { User } from "../types";

// Define the shape of the context state
interface GlobalState {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component
const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    setIsLogged(!!user?.id);
  }, [user?.id]);

  const storageValue = {
    user,
    setUser,
    isLogged,
    setIsLogged
  };

  return (
    <GlobalContext.Provider value={storageValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
const useGlobalStorage = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalStorage };
