import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { UsersContacts } from "./pages/UsersContacts";
import { RoutesPath } from "./shared/constants";
import { selectAuth } from "./store/Auth/selectors";
import { useAppSelector } from "./store/hooks";

export const AppRoutes = () => {
  const { isLogin } = useAppSelector(selectAuth);
  return (
    <>
      <Routes>
        <Route
          path={RoutesPath.Main}
          element={
            isLogin ? (
              <Navigate to={RoutesPath.Contacts} />
            ) : (
              <Navigate to={RoutesPath.Login} />
            )
          }
        />
        <Route
          path={RoutesPath.Login}
          element={isLogin ? <Navigate to={RoutesPath.Contacts} /> : <Login />}
        />
        <Route
          path={RoutesPath.Contacts}
          element={
            isLogin ? <UsersContacts /> : <Navigate to={RoutesPath.Login} />
          }
        />
      </Routes>
    </>
  );
};
