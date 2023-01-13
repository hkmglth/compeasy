import { IProductDto, IProductsDto } from "./../dtos/Products";
import allProducts from "fakeData/products.json";

const getProductsByCompanyId = async (id: number): Promise<IProductsDto> => {
  let tempProducts = allProducts.filter((product) => product.companyId === id);
  return tempProducts;
};

const getProductById = async (id: number): Promise<IProductDto> => {
  let tempProducts = allProducts.find((product) => product.id === id);
  return tempProducts ? tempProducts : ({} as IProductDto);
};

const getAllProducts = async (): Promise<IProductsDto> => {
  return allProducts;
};

export { getProductsByCompanyId, getAllProducts, getProductById };
