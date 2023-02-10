import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { logOut } from "../store/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UsersAuth/selectors";

import s from "../styles/components/header.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className={s.header}>
      <div>
        <span>{data.username}, </span>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          size="small"
          onClick={handleLogout}
        >
          Выход
        </Button>
      </div>
    </header>
  );
};
