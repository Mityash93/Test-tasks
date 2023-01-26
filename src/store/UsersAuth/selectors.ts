import { RootState } from "../store";

export const selectUserData = (state: RootState) => state.usersAuth.data;
export const selectUser = (state: RootState) => state.usersAuth;

