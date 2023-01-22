import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import users from "./Users/usersSlice"
import auth from "./Auth/authSlice"


export const store = configureStore({
  reducer: {
    users,
    auth,
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
