import { RootState } from "../store";

export const selectUserData = (state: RootState) => state.users.data;
export const selectUser = (state: RootState) => state.users;

