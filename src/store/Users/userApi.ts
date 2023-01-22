import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserNameTypes } from "../../pages/Login";
import { USERS_URL } from "../../shared/constants";
import { UserItem } from "./types";

export const fetchUsers = createAsyncThunk<
  UserItem,
  UserNameTypes,
  { rejectValue: string }
>("user/fetchUsers", async ({ userName }, { rejectWithValue }) => {
  const response = await axios.get<UserItem[]>(USERS_URL);

  if (!response.statusText) {
    return rejectWithValue("");
  }

  const foundUser = response.data.find((user) => user.username === userName);

  if (!foundUser) {
    return rejectWithValue("Такого пользователя нет");
  }

  return foundUser;
});


