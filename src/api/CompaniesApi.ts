import { DefaultOptionType } from "antd/es/select";
import { ICompanyUpdateDto } from "./../dtos/Companies";
import getToken from "utils/getToken";
import {
  IMultiResponseDto,
  IResponseDto,
  ISingleResponseDto,
} from "./../dtos/Response";
import { ICompanyDto } from "dtos/Companies";
import { CompanyFieldsAsArray, IMultipleFieldStats } from "./../dtos/Fields";
import allCompanies from "fakeData/companies.json";
import { countries } from "dtos/Countries";
import axios from "axios";
import BASEURLS from "utils/BaseUrls";

const CompaniesApi = axios.create({
  baseURL: BASEURLS.LOCALE + "/companies",
});

const getAllCompanies = async (): Promise<IMultiResponseDto<ICompanyDto>> => {
  try {
    const response = await CompaniesApi.get("/getAllCompanies", getToken());
    return response.data;
  } catch (error: any) {
    const newResponse: IMultiResponseDto<ICompanyDto> = {
      data: [],
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const getLastActionCompanies = async (): Promise<
  IMultiResponseDto<ICompanyDto>
> => {
  try {
    const response = await CompaniesApi.get(
      "/getLastActionCompanies",
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IMultiResponseDto<ICompanyDto> = {
      data: [],
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const addCompany = async (company: ICompanyDto): Promise<IResponseDto> => {
  try {
    const response = await CompaniesApi.post(
      "/addCompany",
      company,
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IResponseDto = {
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const deleteCompanies = async (ids: number[]): Promise<IResponseDto> => {
  try {
    const response = await CompaniesApi.post(
      "/deleteCompanies",
      {
        ids,
      },
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IResponseDto = {
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const updateCompany = async (
  company: ICompanyUpdateDto
): Promise<IResponseDto> => {
  try {
    const response = await CompaniesApi.post(
      "/updateCompany",
      {
        companyData: company,
      },
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IResponseDto = {
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
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

const getAllCountryStats = async (): Promise<IMultipleFieldStats> => {
  let stats: IMultipleFieldStats = [];
  let indexStats: number = 0;
  allCompanies.map((company) => {
    countries.map((country, index) => {
      if (company.country === country.name) {
        let tempStat: number = -1;
        stats.find((stat, index) => {
          if (stat.type === company.country) {
            tempStat = index;
          }
        });
        if (stats[tempStat] !== undefined) {
          stats[tempStat].value += 1;
        } else {
          stats[indexStats] = { type: company.country, value: 1 };
          indexStats++;
        }
      }
    });
  });
  return stats;
};

const getCompanyById = async (
  id: number
): Promise<ISingleResponseDto<ICompanyDto>> => {
  try {
    const response = await CompaniesApi.post(
      "/getCompanyById",
      { id },
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: ISingleResponseDto<ICompanyDto> = {
      data: {} as ICompanyDto,
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const getCompanyByIdLocale = async (id: number): Promise<ICompanyDto> => {
  let company: ICompanyDto | undefined = allCompanies.find(
    (item) => item.id === id
  );
  return company ? company : ({} as ICompanyDto);
};

const getCompaniesCount = async (): Promise<number> => {
  let company = allCompanies.length;

  return company;
};

const getCompaniesDropdown = async (): Promise<
  IMultiResponseDto<DefaultOptionType>
> => {
  try {
    const response = await CompaniesApi.get(
      "/getCompaniesDropdown",
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IMultiResponseDto<DefaultOptionType> = {
      data: [] as DefaultOptionType[],
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

export {
  getAllCompanies,
  getLastActionCompanies,
  getAllFieldStats,
  getCompanyById,
  getAllCountryStats,
  getCompaniesCount,
  addCompany,
  deleteCompanies,
  updateCompany,
  getCompanyByIdLocale,
  getCompaniesDropdown,
};
