import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { MessageContext } from "contexts/MessageContext";
import { CompaniesContext } from "contexts/CompaniesContext";

const useAuth = () => useContext(AuthContext);
const useMessage = () => useContext(MessageContext);
const useCompanies = () => useContext(CompaniesContext);
export { useAuth, useMessage, useCompanies };
