import { Status } from "../Users/types";

export type List = {
    id: string;
    name: string;
    phone: string;
  };
  
  export interface ContactState {
    list: List[];
    status: Status;
    error: string | undefined;
  }