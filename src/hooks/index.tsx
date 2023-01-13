import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { MessageContext } from "contexts/MessageContext";
import { CompaniesContext } from "contexts/CompaniesContext";
import { ProductsContext } from "contexts/ProductsContext";

const useAuth = () => useContext(AuthContext);
const useMessage = () => useContext(MessageContext);
const useCompanies = () => useContext(CompaniesContext);
const useProducts = () => useContext(ProductsContext);
export { useAuth, useMessage, useCompanies, useProducts };
