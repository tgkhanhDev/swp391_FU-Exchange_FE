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
  productDetailId: number;
  productName: string;
  description: string;
};
export type Variation = {
  variationId: number;
  variationName: string;
  variationDetail: {
    variationDetailId: number;
    description: string;
  }[];
};

export interface ProductPaymentType {
  product: {
    productId: number;
    detail: ProductDetail;
    image: Image[];
    category: Category;
    price: string;
    productStatus: boolean;
  };
  variation: {
    variationId: number;
    variationName: string;
    variationDetail: {
      variationDetailId: number;
      description: string;
    };
  }[];
}

export type createProductType = {
  productName: string;
  productDescription: string;
  studentId: number;
  categoryId: number;
  price: number;
  productStatus: true;
  variationList: {
    variationName: string;
    variationDetailRequestList: {
      description: string;
    }[];
  }[];
  productImageRequestsList: {
    imageUrl: string;
  }[];
};

export type filterGetProductById = {
  current: number,
  name ?: string,
  studentId: string,
}

export type warehouseType = {
  productId: number;
  seller: Seller;
  detail: ProductDetail;
  image: Image[];
  category: Category;
  variation: Variation[];
  price: string;
  productStatus: boolean;
};