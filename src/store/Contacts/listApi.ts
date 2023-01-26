import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONTACTS_URL } from "../../shared/constants";
import { ListItem, SearchType } from "./types";

export const fetchContacts = createAsyncThunk<
  ListItem[],
  SearchType,
  { rejectValue: string }
>("user/fetchContacts", async ({ search }, { rejectWithValue }) => {
  const response = await axios.get<ListItem[]>(`${CONTACTS_URL}?${search}`);

  if (!response.statusText) {
    return rejectWithValue("");
  }

  return response.data as ListItem[];
});

export const fetchContactDelete = createAsyncThunk<
  ListItem,
  string,
  { rejectValue: string }
>("user/fetchContactDelete", async (id, { rejectWithValue }) => {
  const response = await axios.delete(`${CONTACTS_URL}/${id}`);

  if (!response.statusText) {
    return rejectWithValue("Ошибка сервера");
  }

  return response.data as ListItem;
});

export const fetchContactAdd = createAsyncThunk<
  ListItem,
  { name: string; phone: string },
  { rejectValue: string }
>("user/fetchContactAdd", async (newContact, { rejectWithValue }) => {
  const response = await axios.post(CONTACTS_URL, newContact);

  if (!response.statusText) {
    return rejectWithValue("Ошибка сервера");
  }

  return response.data as ListItem;
});

export const fetchContactEdit = createAsyncThunk<
  ListItem,
  ListItem,
  { rejectValue: string }
>(
  "user/fetchContactEdit",
  async (editedContactForEditForm, { rejectWithValue }) => {
    const response = await axios.put(
      `${CONTACTS_URL}/${editedContactForEditForm.id}`,
      editedContactForEditForm
    );

    if (!response.statusText) {
      return rejectWithValue("Ошибка сервера");
    }

    return response.data as ListItem;
  }
);
