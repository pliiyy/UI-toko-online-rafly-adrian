"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IUserContext } from "../IInterfaces";

const userContext = createContext<IUserContext>({
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
  getUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserContext>({
    id: "",
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "KASIR",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    getUser: async () => await getUser(),
    image: "",
    address: "",
  });
  const getUser = async () => {
    await fetch("/api/auth")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUser({ ...res.data, getUser: async () => await getUser() });
        }
        return {
          ...res.data,
          getUser: async () => await getUser(),
        } as IUserContext;
      })
      .catch((err) =>
        setUser({
          id: "",
          fullname: "",
          username: "",
          email: "",
          password: "",
          phone: "",
          role: "KASIR",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          getUser: async () => await getUser(),
          image: "",
          address: "",
        })
      );
  };
  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, []);
  return (
    <userContext.Provider value={user as IUserContext}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
