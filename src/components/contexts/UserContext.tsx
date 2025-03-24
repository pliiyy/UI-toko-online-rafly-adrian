"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../IInterfaces";

const userContext = createContext<IUser>({
  id: "",
  fullname: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  address: "",
  role: "PELANGGAN",
  image: "",

  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      await fetch("/api/auth")
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
          }
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  return (
    <userContext.Provider value={user as IUser}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
