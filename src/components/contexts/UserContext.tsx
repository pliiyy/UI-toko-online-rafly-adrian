"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../IInterfaces";
import { useRouter } from "next/navigation";

const userContext = createContext<IUser>({
  id: "",
  namaLengkap: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  nip: "",
  alamat: "",
  kelurahan: "",
  kecamatan: "",
  kota: "",
  provinsi: "",
  jenisKelamin: "Laki_laki",
  role: "MARKETING",

  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  UserMenu: [],
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetch("/api/auth")
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
          } else {
            router.push("/");
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
