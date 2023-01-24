import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import users from "./Users/usersSlice";
import auth from "./Auth/authSlice";
import contacts from "./Contacts/contactSlice";

export const store = configureStore({
  reducer: {
    users,
    auth,
    contacts,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
