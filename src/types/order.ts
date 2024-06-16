export interface CodPayment {
  registeredStudentId: number;
  postProductToBuyRequests: PostProductToBuyRequestType[];
  paymentMethodId: number;
  description: string;
};

export interface PostProductToBuyRequestType {
  postProductId: number;
  variationDetailId: number;
  quantity: number;
  price: number;
}
