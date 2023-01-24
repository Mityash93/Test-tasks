import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../Users/types";
import { fetchContacts } from "./listApi";
import { ContactState } from "./types";

const initialState: ContactState = {
  list: [],
  status: Status.IDLE,
  error: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.list = action.payload;
        state.error = "";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
