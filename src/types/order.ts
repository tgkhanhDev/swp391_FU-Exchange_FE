export interface PaymentType {
  registeredStudentId: number;
  postProductToBuyRequests: PostProductToBuyRequestType[];
  paymentMethodId: number;
  description: string;
  navigate ?: any;
};

export interface PostProductToBuyRequestType {
  sttOrder: number;
  postProductId: number;
  variationDetailId: number;
  quantity: number;
  price: number;
}
