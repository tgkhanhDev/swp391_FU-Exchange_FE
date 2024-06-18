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

export interface Orders {
  orderId: number;
  registeredStudent: number;
  orderStatus: OrderStatus;
  createDate: string;
  completeDate: string;
  description: string | null;
  paymentId: number;
}

export interface OrderStatus {
  orderStatusId: number;
  orderStatusName: string;
}
