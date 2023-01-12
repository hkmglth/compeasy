import allCountries from "fakeData/countries.json";
export type ICountryDto = {
  name: string;
  flag: string;
};

export type ICountriesDto = ICountryDto[];

export const countries: ICountryDto[] = allCountries;
