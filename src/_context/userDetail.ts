import { User } from "@/src/types";
import { createContext } from "react";

export type UserContextType = {
  userDetail: User | null;
  setUserDetail: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserDetail = createContext<UserContextType | null>(null);
