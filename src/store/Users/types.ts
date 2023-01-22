export enum Status {
  LOADING = "loading",
  IDLE = "idle",
  ERROR = "failed",
}

export type UserItem = {
  name: string;
  username: string;
  email: string;
  avatar: string;
  id: string;
};

export interface UserState {
  data: UserItem;
  status: Status;
  error: string | undefined;
}
