import { Post } from "./post";
import { VaritationDetail } from "./product";

export interface deleteItemCartType {
  cartId: number;
  postProductId: number;
  variationDetailId: number;
}

export interface updateItemCartType extends deleteItemCartType {
    quantity: number
}

export interface addCartItem {
  registeredStudentId: string;
  postProductId: number;
  variationDetailId: number[];
  quantity?: number;
}

export interface cartItem {
  cartPostId: deleteItemCartType;
  postProduct: Post;
  quantity: number;
  variationDetail: VaritationDetail;
  sttPostInCart: number;
}


export interface cartItemFilter {
  cartPostId: deleteItemCartType;
  postProduct: Post;
  quantity: number;
  variationDetail: VaritationDetail[];
  sttPostInCart: number;
}