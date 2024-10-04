import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Routes } from "./routes/Routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
};

export default App;
