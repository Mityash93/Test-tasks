import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONTACTS_URL } from "../../shared/constants";
import { List } from "./types";

export const fetchContacts = createAsyncThunk<
  List[],
  undefined,
  { rejectValue: string }
>("user/fetchContacts", async (_, { rejectWithValue }) => {
  const response = await axios.get<List[]>(CONTACTS_URL);

  if (!response.statusText) {
    return rejectWithValue("");
  }

  return (response.data) as List[];
});
