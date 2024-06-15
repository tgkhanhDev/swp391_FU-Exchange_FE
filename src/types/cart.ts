export interface deleteItemCartType {
  cartId: number;
  postProductId: number;
  variationDetailId: number;
}

export interface updateItemCartType extends deleteItemCartType {
    quantity: number
}