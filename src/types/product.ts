import { Seller } from "./user";

export interface Product {
  productId: number;
  ProductDetail: ProductDetail[];
  Seller: Seller[];
  Variation: Variation[];
}

export type ProductDetail = {
  productDetailId: number,
  productName : string,
  description: string,
};
export type Variation = {
  variationId: number,
  variationName: string,
  description: string,
}; 
