import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../UsersAuth/types";
import {
  fetchContactAdd,
  fetchContactDelete,
  fetchContactEdit,
  fetchContacts,
} from "./listApi";
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
      })
      .addCase(fetchContactDelete.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchContactDelete.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.list = state.list.filter((item) => item.id !== action.payload.id);
        state.error = "";
      })
      .addCase(fetchContactDelete.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message;
      })
      .addCase(fetchContactAdd.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchContactAdd.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.list.push(action.payload);
      })
      .addCase(fetchContactAdd.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message;
      })
      .addCase(fetchContactEdit.pending, (state, action) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchContactEdit.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        const findedContactForEdit = state.list.find(
          (contact) => contact.id === action.payload.id
        );
        if (findedContactForEdit) {
          findedContactForEdit.name = action.payload.name;
          findedContactForEdit.phone = action.payload.phone;
        }
      })
      .addCase(fetchContactEdit.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
