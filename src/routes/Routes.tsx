import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { RequiredAuth } from "../components/RequireAuth";
import { LoginPage } from "../components/Login";
import ChatBox from "../components/ChatBox/ChatBox";
import { ChatHistory } from "../components/ChatHistory/ChatHistory";
import { User } from "../components/UserBlock/User";

export const Routes = (): JSX.Element => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<LoginPage />}></Route>
        <Route element={<RequiredAuth />}>
          <Route
            path="chat"
            element={
              <div className="flex w-screen relative">
                <User />
                <ChatHistory />
                <ChatBox />
              </div>
            }
          ></Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
