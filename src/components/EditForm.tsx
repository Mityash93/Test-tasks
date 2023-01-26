import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Modal } from "antd";
import { FC } from "react";
import { fetchContactEdit } from "../store/Contacts/listApi";
import { selectContact } from "../store/Contacts/selectors";
import { ListItem } from "../store/Contacts/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Status } from "../store/UsersAuth/types";

type EditFormValues = {
  name: string;
  phone: string;
};

type EditFormProps = {
  visibleEditForm: boolean;
  setVisibleEditForm: (value: boolean) => void;
  contactForEditForm: ListItem | undefined;
};

export const EditForm: FC<EditFormProps> = ({
  visibleEditForm,
  setVisibleEditForm,
  contactForEditForm,
}) => {
  const { status, error } = useAppSelector(selectContact);
  const dispatch = useAppDispatch();

  const onFinish = ({ name, phone }: EditFormValues) => {
    if (!contactForEditForm) return;
    dispatch(fetchContactEdit({ ...contactForEditForm, name, phone }));
    setVisibleEditForm(false);
  };
  return (
    <Modal
      title="Добавление контакта"
      open={visibleEditForm}
      onCancel={() => setVisibleEditForm(false)}
      width={400}
      centered
      footer={null}
    >
      <Form
        initialValues={{
          name: contactForEditForm?.name,
          phone: contactForEditForm?.phone,
        }}
        onFinish={onFinish}
      >
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
            Изменить контакт
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert message={error} type="error" style={{ textAlign: "center" }} />
      )}
    </Modal>
  );
};
