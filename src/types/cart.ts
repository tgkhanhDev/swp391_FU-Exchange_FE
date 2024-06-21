export interface deleteItemCartType {
  cartId: number;
  postProductId: number;
  variationDetailId: number;
}

export interface updateItemCartType extends deleteItemCartType {
    quantity: number
}

export interface addCartItem {
  studentId: string ;
  postProductId: number;
  variationDetailId: number[];
  quantity: number;
}