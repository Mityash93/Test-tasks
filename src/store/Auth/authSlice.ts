import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  isLogin: localStorage.getItem('isLoggedIn') === 'true',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogin = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logOut: (state) => {
      state.isLogin = false;
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
