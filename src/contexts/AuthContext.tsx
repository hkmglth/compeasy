import React, { createContext, useEffect, useState } from "react";
import { IUserInfoDto } from "dtos/User";
import { useNavigate } from "react-router-dom";
import STORAGEKEYS from "utils/StorageKeys";
import getToken from "utils/getToken";
import { getUserByToken } from "api/AuthApi";

export type IAuthContextProps = {
  user: IUserInfoDto;
  setUser: (user: IUserInfoDto) => any;
  token: () => string;
};

export const AuthContextDefault: IAuthContextProps = {
  user: {
    surName: "",
    firstName: "",
    email: "",
    userPic: "",
    role: "",
  },
  setUser: () => {},
  token: () => "",
};

export const AuthContext = createContext<IAuthContextProps>(AuthContextDefault);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserInfoDto>(AuthContextDefault.user);

  const token = () => {
    return getToken().headers.Authorization;
  };

  const getUser = async () => {
    const response = await getUserByToken();
    if (response.success) {
      setUser(response.data);
    }
  };
  useEffect(() => {
    const checkToken = token().length !== 0;
    if (checkToken) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
