import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Typography } from "antd";
import { useEffect } from "react";
import { fetchContacts } from "../../store/Contacts/listApi";
import { selectContact } from "../../store/Contacts/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import s from "../../styles/components/contactList.module.scss";

const { Title } = Typography;

export const ContactsList = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectContact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.contactList}>
      <Title>Список контактов</Title>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="list-loadmore-more">
                <EditOutlined />
              </Button>,
              <Button danger key="list-loadmore-more">
                <DeleteOutlined />
              </Button>,
            ]}
          >
            <List.Item.Meta
              className={s.listItem}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
              }
              title={item.name}
              description={item.phone}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
