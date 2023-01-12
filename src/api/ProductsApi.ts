import { IProductsDto } from "./../dtos/Products";
import allProducts from "fakeData/products.json";

const getProductsByCompanyId = async (id: number): Promise<IProductsDto> => {
  let tempProducts = allProducts.filter((product) => product.companyId === id);
  return tempProducts;
};

const getAllProducts = async (): Promise<IProductsDto> => {
  return allProducts;
};

export { getProductsByCompanyId, getAllProducts };
