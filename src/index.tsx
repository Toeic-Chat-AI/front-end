import React from "react";
import ReactDOM from "react-dom/client";
import "react-chat-elements/dist/main.css";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./contexts/Storage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
    <ToastContainer />
  </React.StrictMode>
);
