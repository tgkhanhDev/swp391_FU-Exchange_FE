export interface CodPayment {
  registeredStudentId: number;
  postProductToBuyRequests: PostProductToBuyRequest[];
  paymentMethodId: number;
  description: string;
};

export interface PostProductToBuyRequest {
  postProductId: number;
  variationDetailId: number;
  quantity: number;
  price: number;
}
