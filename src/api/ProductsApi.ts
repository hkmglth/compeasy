import { IResponseDto, ISingleResponseDto } from "./../dtos/Response";
import { IProductDto } from "./../dtos/Products";
import allProducts from "fakeData/products.json";
import BASEURLS from "utils/BaseUrls";
import axios from "axios";
import { IMultiResponseDto } from "dtos/Response";
import getToken from "utils/getToken";

const ProductsApi = axios.create({
  baseURL: BASEURLS.LOCALE + "/products",
});

const getProductsByCompanyId = async (
  companyId: number
): Promise<IMultiResponseDto<IProductDto>> => {
  try {
    const response = await ProductsApi.post(
      "/getProductsByCompanyId",
      { companyId },
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IMultiResponseDto<IProductDto> = {
      data: [],
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const getProductById = async (
  id: number
): Promise<ISingleResponseDto<IProductDto>> => {
  try {
    const response = await ProductsApi.post(
      "/getProductById",
      { id },
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: ISingleResponseDto<IProductDto> = {
      data: {} as IProductDto,
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const getAllProducts = async (): Promise<IMultiResponseDto<IProductDto>> => {
  try {
    const response = await ProductsApi.get("/getAllProducts", getToken());
    return response.data;
  } catch (error: any) {
    const newResponse: IMultiResponseDto<IProductDto> = {
      data: [],
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const deleteProductById = async (
  productIds: number[]
): Promise<IResponseDto> => {
  try {
    const response = await ProductsApi.post(
      "/deleteProductById",
      {
        productIds,
      },
      getToken()
    );
    return response.data;
  } catch (error: any) {
    const newResponse: IMultiResponseDto<IProductDto> = {
      data: [],
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const getProductsCount = async (): Promise<number> => {
  let tempProducts = allProducts.length;
  return tempProducts;
};

const addProduct = async (product: IProductDto): Promise<IResponseDto> => {
  try {
    const response = await ProductsApi.post("/addProduct", product, getToken());
    return response.data;
  } catch (error: any) {
    const newResponse: IResponseDto = {
      message: error.response.data.message!,
      success: error.response.data.success!,
    };
    return newResponse;
  }
};

const updateProduct = async (product: IProductDto): Promise<IResponseDto> => {
  try {
    const response = await ProductsApi.post(
      "/updateProduct",
      product,
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

export {
  getAllProducts,
  getProductById,
  getProductsCount,
  getProductsByCompanyId,
  deleteProductById,
  addProduct,
  updateProduct,
};
