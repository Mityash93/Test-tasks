import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Button, List, Typography } from "antd";
import { useEffect, useState } from "react";
import { fetchContactDelete, fetchContacts } from "../store/Contacts/listApi";
import { selectContact } from "../store/Contacts/selectors";
import { ListItem } from "../store/Contacts/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Status } from "../store/UsersAuth/types";

import s from "../styles/pages/contactList.module.scss";
import { AddForm } from "./AddForm";
import { EditForm } from "./EditForm";

import { SearchForm } from "./SearchForm";

const { Title } = Typography;

export const ContactsList = () => {
  const dispatch = useAppDispatch();
  const { list, error, status } = useAppSelector(selectContact);

  const [searchValue, setSearchValue] = useState("");
  const [visibleAddForm, setVisibleAddForm] = useState(false);
  const [visibleEditForm, setVisibleEditForm] = useState(false);
  const [contactForEditForm, setContactForEditForm] = useState<ListItem>();

  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    dispatch(fetchContacts({ search }));
  }, [dispatch, search]);

  const onClickDelete = (id: string) => {
    if (window.confirm("Точно удалить контакт?")) {
      dispatch(fetchContactDelete(id));
    }
  };

  const openEditForm = (contact: ListItem) => {
    if (contact) {
      setContactForEditForm(contact);
      setVisibleEditForm(true);
    }
  };

  return (
    <div className={s.contactList}>
      <Title>Список контактов</Title>
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
      <List
        loading={status === Status.LOADING}
        bordered
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(contact) => (
          <List.Item
            actions={[
              <Button
                onClick={() => openEditForm(contact)}
                key="list-loadmore-more"
              >
                <EditOutlined />
              </Button>,
              <Button
                onClick={() => onClickDelete(contact.id)}
                key="list-loadmore-more"
                danger
              >
                <DeleteOutlined />
              </Button>,
            ]}
          >
            <List.Item.Meta
              className={s.listItem}
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
              }
              title={contact.name}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
      {visibleAddForm ? (
        <AddForm
          visibleAddForm={visibleAddForm}
          setVisibleAddForm={setVisibleAddForm}
        />
      ) : null}

      {visibleEditForm ? (
        <EditForm
          visibleEditForm={visibleEditForm}
          setVisibleEditForm={setVisibleEditForm}
          contactForEditForm={contactForEditForm}
        />
      ) : null}

      <Button
        icon={<PlusCircleOutlined />}
        onClick={() => setVisibleAddForm(true)}
        type="primary"
        className={s.addBtn}
      >
        Добавить новый контакт
      </Button>
      {error && <Alert message={error} type="error" />}
    </div>
  );
};
