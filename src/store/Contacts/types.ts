import { Status } from "../UsersAuth/types";

export type ListItem = {
  id: string;
  name: string;
  phone: string;
};

export interface ContactState {
  list: ListItem[];
  status: Status;
  error: string | undefined;
}

export type SearchType = {
  search: string;
};
