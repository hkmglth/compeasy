import React, { createContext, useState } from "react";
import { ICompaniesDto } from "dtos/Companies";

export type ICompaniesContextProps = {
  companies: ICompaniesDto;
  setCompanies: (data: ICompaniesDto) => any;
};

export const CompaniesContextDefault: ICompaniesContextProps = {
  companies: [],
  setCompanies: () => {},
};

export const CompaniesContext = createContext<ICompaniesContextProps>(
  CompaniesContextDefault
);

const CompaniesProvider = ({ children }: { children: React.ReactNode }) => {
  const [companies, setCompanies] = useState<ICompaniesDto>(
    CompaniesContextDefault.companies
  );

  return (
    <CompaniesContext.Provider value={{ companies, setCompanies }}>
      {children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesProvider;
