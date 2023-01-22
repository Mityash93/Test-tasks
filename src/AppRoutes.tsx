import { Header } from "./components/Header";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { UsersContacts } from "./pages/UsersContacts";
import { selectAuth } from "./store/Auth/selectors";
import { useAppSelector } from "./store/hooks";

export const AppRoutes = () => {
  const { isLogin } = useAppSelector(selectAuth);
  return (
    <>
      {isLogin && <Header />}
      <Routes>
      <Route
          path="/"
          element={isLogin ? <Navigate to={"/users-contacts"} /> : <Navigate to={"/login"}/>}
        />
        <Route
          path="/login"
          element={isLogin ? <Navigate to={"/users-contacts"} /> : <Login />}
        />
        <Route
          path="/users-contacts"
          element={isLogin ? <UsersContacts /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
};
