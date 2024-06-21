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
export interface Orders {
  orderId: number;
  registeredStudent: number;
  orderStatus: OrderStatus;
  createDate: string;
  completeDate: string;
  paymentId: number;
  totalPrice: number;
}

export interface OrderStatus {
  orderStatusId: number;
  orderStatusName: string;
}

export interface ProductDetail {
  productDetailId: number;
  productName: string;
  description: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface Product {
  productId: number;
  detail: ProductDetail;
  category: Category;
  price: string;
  productStatus: boolean;
}

export interface PostType {
  postTypeId: number;
  postTypeName: string;
}

export interface Campus {
  campusId: number;
  campusName: string;
}

export interface PostStatus {
  postStatusId: number;
  postStatusName: string;
}

export interface PostProduct {
  postProductId: number;
  product: Product;
  postType: PostType;
  campus: Campus;
  postStatus: PostStatus;
  quantity: number;
  createDate: string;
  content: string;
  priceBought: number;
}

export interface PostProductInOrder {
  postProduct: PostProduct;
  quantity: number;
  firstVariation: string;
  secondVariation?: string;
}
