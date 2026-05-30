"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { User } from "@/src/types";
import { UserDetail } from "@/src/_context/userDetail";

type Props = {
  children: React.ReactNode;
};

const ClerkUserSyncProvider: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<User | null>(null);

  useEffect(() => {
    user && verifyUser();
  }, [user]);
  const verifyUser = async () => {
    try {
      const results = await fetch("/api/verify-user", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await results.json();
      setUserDetail(data.result);
    } catch (err) {}
  };

  return (
    <UserDetail.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetail.Provider>
  );
};

export default ClerkUserSyncProvider;
