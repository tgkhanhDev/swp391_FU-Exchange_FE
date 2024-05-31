import { Seller } from "./user";

export interface Product {
  productId: number;
  detail: ProductDetail;
  image: Image[];
  category: Category;
  variation: Variation[];
  price: number;
}

export interface Image {
  productImageId: number;
  imageUrl: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
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