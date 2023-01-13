import { IProductsDto } from "dtos/Products";
import React, { createContext, useState } from "react";

export type IProductsContextProps = {
  products: IProductsDto;
  setProducts: (data: IProductsDto) => any;
};

export const ProductsContextDefault: IProductsContextProps = {
  products: [],
  setProducts: () => {},
};

export const ProductsContext = createContext<IProductsContextProps>(
  ProductsContextDefault
);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<IProductsDto>(
    ProductsContextDefault.products
  );

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
