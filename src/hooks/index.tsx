import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { MessageContext } from "contexts/MessageContext";

const useAuth = () => useContext(AuthContext);
const useMessage = () => useContext(MessageContext);
export { useAuth, useMessage };
