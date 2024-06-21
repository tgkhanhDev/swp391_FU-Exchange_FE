export interface CodPayment {
  registeredStudentId: number;
  postProductToBuyRequests: PostProductToBuyRequestType[];
  paymentMethodId: number;
  description: string;
};

export interface PostProductToBuyRequestType {
  sttOrder: number;
  postProductId: number;
  variationDetailId: number;
  quantity: number;
  price: number;
}

export interface VnPayPayment {
  registeredStudentId: number;
  postProductToBuyRequests: PostProductToBuyRequest[];
  paymentMethodId: number;
  description: string;
}

export interface PostProductToBuyRequest {
  postProductId: number;
  variationDetailId: number;
  variationId: number;
  quantity: number;
  price: number;
}