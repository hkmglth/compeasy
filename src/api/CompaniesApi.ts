import { ICompanyDto } from "dtos/Companies";
import ICompanyFields, {
  CompanyFieldsAsArray,
  IMultipleFieldStats,
} from "./../dtos/Fields";
import { ICompaniesDto } from "dtos/Companies";
import allCompanies from "fakeData/companies.json";

const getAllCompanies = async (): Promise<ICompaniesDto> => {
  return allCompanies;
};

const getLastActionCompanies = async (): Promise<ICompaniesDto> => {
  let lastCompanies = allCompanies.slice(-5, -1);
  return lastCompanies;
};

const getAllFieldStats = async (): Promise<IMultipleFieldStats> => {
  let stats: IMultipleFieldStats = [];
  allCompanies.map((company) => {
    CompanyFieldsAsArray.map((field, index) => {
      if (company.fields === field) {
        if (stats[index] !== undefined) {
          stats[index].value += 1;
        } else {
          stats[index] = { type: field, value: 1 };
        }
      }
    });
  });
  return stats;
};

const getCompanyById = async (id: number): Promise<ICompanyDto> => {
  let company: ICompanyDto | undefined = allCompanies.find(
    (item) => item.id === id
  );
  return company ? company : ({} as ICompanyDto);
};

export {
  getAllCompanies,
  getLastActionCompanies,
  getAllFieldStats,
  getCompanyById,
};
