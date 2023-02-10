import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Modal } from "antd";
import { FC } from "react";

import { fetchContactAdd } from "../store/Contacts/listApi";
import { selectContact } from "../store/Contacts/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Status } from "../store/UsersAuth/types";

type AddFormValues = {
  name: string;
  phone: string;
};

type AddFormProps = {
  visibleAddForm: boolean;
  setVisibleAddForm: (value: boolean) => void;
};

export const AddForm: FC<AddFormProps> = ({
  visibleAddForm,
  setVisibleAddForm,
}) => {
  const { status, error } = useAppSelector(selectContact);
  const dispatch = useAppDispatch();

  const onFinish = ({ name, phone }: AddFormValues) => {
    dispatch(fetchContactAdd({ name, phone }));
    setVisibleAddForm(false);
  };

  return (
    <Modal
      title="Добавление контакта"
      open={visibleAddForm}
      onCancel={() => setVisibleAddForm(false)}
      width={400}
      centered
      footer={null}
    >
      <Form initialValues={{ name: "", phone: "" }} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Пожалуйста введите имя контакта" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Название контакта"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Пожалуйста введите номер телефона" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Номер телефона"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={status === Status.LOADING}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert message={error} type="error" style={{ textAlign: "center" }} />
      )}
    </Modal>
  );
};
