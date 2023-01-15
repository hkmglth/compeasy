export type ICompanyUpdateDto = {
  id: number;
  companyName: string;
  companyPhone: string;
  vatNumber: string;
  country: string;
  website: string;
  fields: string;
};

export type ICompanyDto = ICompanyUpdateDto & {
  key: number;
  companyPic: string;
};

export type ICompaniesDto = ICompanyDto[];
