import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import { FC } from "react";
import { logIn } from "../store/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser } from "../store/Users/selectors";
import { Status } from "../store/Users/types";
import { fetchUsers } from "../store/Users/userApi";

import s from "../styles/pages/login.module.scss";
const { Title } = Typography;

export type UserNameTypes = {
  userName: string;
};

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectUser);

  const onFinish = async ({ userName }: UserNameTypes) => {
    const validAuth = await dispatch(fetchUsers({ userName })).unwrap();

    if (validAuth) {
      dispatch(logIn());
    }
  };

  return (
    <Form
      className={s.loginForm}
      initialValues={{ userName: "", password: "" }}
      onFinish={onFinish}
    >
      <Title>Авторизация</Title>
      <Form.Item
        name="userName"
        rules={[{ required: true, message: "Пожалуйста введите свое имя!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Ваше имя"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите свой пароль!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Ваш пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={status === Status.LOADING}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Вход
        </Button>
      </Form.Item>
      {error && <Alert message={error} type="error" />}
    </Form>
  );
};
