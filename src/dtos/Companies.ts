export type ICompanyDto =   {
  id: number,
  companyName: string,
  companyPhone: string,
  companyPic: string,
  vatNumber: string,
  country: string,
  website: string,
  fields: string
}

export type ICompaniesDto = ICompanyDto[];
