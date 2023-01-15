import { IResponseDto, ISingleResponseDto } from "./../dtos/Response";
import axios from "axios";
import { IRegisterDto, ILoginDto, ITokenDto } from "dtos/Auth";
import getToken from "utils/getToken";
import { IUserInfoDto } from "dtos/User";
import BASEURLS from "utils/BaseUrls";

const AuthApi = axios.create({
  baseURL: BASEURLS.LOCALE + "/auth",
});

const register = async (user: IRegisterDto): Promise<IResponseDto> => {
  try {
    const response = await AuthApi.post("/register", user);
    return response.data;
  } catch (error: any) {
    const newResponse: IResponseDto = {
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const login = async (
  user: ILoginDto
): Promise<ISingleResponseDto<ITokenDto>> => {
  try {
    const response = await AuthApi.post("/login", user);
    return response.data;
  } catch (error: any) {
    const newResponse: ISingleResponseDto<ITokenDto> = {
      data: {
        token: "",
      },
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const getUserByToken = async (): Promise<ISingleResponseDto<IUserInfoDto>> => {
  try {
    const response = await AuthApi.get("/getUserByToken", getToken());
    return response.data;
  } catch (error: any) {
    const newResponse: ISingleResponseDto<IUserInfoDto> = {
      data: {} as IUserInfoDto,
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

export { register, login, getUserByToken };
