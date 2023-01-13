import React, { createContext, useEffect, useState } from "react";
import { IUserDto } from "dtos/User";
import { useNavigate } from "react-router-dom";
import STORAGEKEYS from "utils/StorageKeys";

export type IAuthContextProps = {
  user: IUserDto;
  setUser: (user: IUserDto) => any;
  token: string | undefined | null;
};

export const AuthContextDefault: IAuthContextProps = {
  user: {
    surName: "Hekimoglu",
    firstName: "Taha",
    email: "tahahkmgl@gmail.com",
    userPic: "https://robohash.org/dolorutquisquam.png?size=120x120&set=set1",
    password: "admin",
    token: "",
    role: "Admin",
  },
  setUser: () => {},
  token: "",
};

export const AuthContext = createContext<IAuthContextProps>(AuthContextDefault);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserDto>(AuthContextDefault.user);

  const token = localStorage.getItem(STORAGEKEYS.__TOKEN)
    ? localStorage.getItem(STORAGEKEYS.__TOKEN)
    : sessionStorage.getItem(STORAGEKEYS.__TOKEN);

  const navigate = useNavigate();
  const checkAuth = () => {
    setUser({ ...user, token: token! });
    token && token.length === 0 && navigate("/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
