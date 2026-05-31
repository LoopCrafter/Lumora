import { useContext } from "react";
import { UserContextType, UserDetail } from "../_context/userDetail";

export const useUserDetail = (): UserContextType => {
  const context = useContext(UserDetail);
  if (!context) {
    throw new Error("useUserDetail must be used within a UserDetail.Provider");
  }
  return context;
};
