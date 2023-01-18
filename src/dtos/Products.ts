export type IProductDto = {
  key: number;
  id: number;
  companyId: number;
  companyName: string;
  productName: string;
  productAmount: number;
  productPrice: string;
  productPic: string;
  website: string;
  status: boolean;
};
export type IProductsDto = IProductDto[];
