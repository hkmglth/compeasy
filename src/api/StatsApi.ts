import getToken from "utils/getToken";
import { IStatsDto } from "dtos/Stats";
import { ISingleResponseDto } from "./../dtos/Response";
import axios from "axios";
import BASEURLS from "utils/BaseUrls";

const StatsApi = axios.create({
  baseURL: BASEURLS.LOCALE + "/stats",
});

const getAllStats = async (): Promise<ISingleResponseDto<IStatsDto>> => {
  try {
    const response = StatsApi.get("/getAllStats", getToken());
    return (await response).data;
  } catch (error: any) {
    const newResponse: ISingleResponseDto<IStatsDto> = {
      data: {} as IStatsDto,
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

export { getAllStats };
