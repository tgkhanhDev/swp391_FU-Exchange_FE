import { Product } from "./product";

export interface PostProduct {
  postProductId: number;
  Product: Product;
  PostType: PostType;
  Campus: Campus;
  PostStatus: PostStatus;
  quantity: number,
  createDate: Date,
  content: string,
};

export interface PostType {
  postTypeId: number;
  postName: string;
}

export type Campus = {
    campusId: number,
    campusName: string,
}

export type PostStatus = {
  postStatusId: number;
  postStatusName: string;
}; 