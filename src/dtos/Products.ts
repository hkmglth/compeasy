export type IProductDto = {
  id: number;
  companyId: number;
  productName: string;
  productAmount: number;
  productPrice: string;
  productPic: string;
  website: string;
  status: boolean;
};

export type IProductsDto = IProductDto[];
