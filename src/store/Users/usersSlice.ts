import { createSlice } from "@reduxjs/toolkit";
import { Status, UserState } from "./types";
import { fetchUsers } from "./userApi";

const initialState: UserState = {
  data: JSON.parse(localStorage.getItem("userData") || "{}"),
  status: Status.IDLE,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.data = action.payload;
        state.error = "";
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = Status.ERROR;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
