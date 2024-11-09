import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { RequiredAuth } from "../components/RequireAuth";
import { LoginPage } from "../components/Login";
import { Chat } from "../pages/chat";
import { RegisterPage } from "../components/Register";
import { NotFound } from "../pages/NotFound";

export const Routes = (): JSX.Element => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<RequiredAuth />}>
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
