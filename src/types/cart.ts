export interface deleteItemCartType {
  cartId: number;
  postProductId: number;
  variationDetailId: number;
}

export interface updateItemCartType extends deleteItemCartType {
    quantity: number
}

export type viewItemCart = {
  studentId: string;
  itemCart: ItemCart;
}

export type ItemCart = {
  cartPostId: CartPostId;
  cart: Cart;
  postProduct: PostProduct;
  variationDetail: VariationDetail;
  quantity: number;
}

export type CartPostId = {
  cartId: number;
  postProductId: number;
  variationDetailId: number;
}

export type Cart = {
  cartId: number;
  registeredStudentId: number;
}

export type PostProduct = {
  postProductId: number;
  product: Product;
  postType: PostType;
  campus: Campus;
  postStatus: PostStatus;
  quantity: number;
  createDate: string;
  content: string;
}

export type Product = {
  productId: number;
  seller: Seller;
  detail: ProductDetail;
  image: ProductImage[];
  category: Category;
  variation: Variation[];
  price: string;
  productStatus: boolean;
}

export type Seller = {
  sellerId: number;
  student: Student;
  bankingName: string;
  bankingNumber: string;
  active: number;
}

export type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
  identityCard: string;
  address: string;
  phoneNumber: string;
  gender: string;
  dob: string;
}

export type ProductDetail = {
  productDetailId: number;
  productName: string;
  description: string;
}

export type ProductImage = {
  productImageId: number;
  imageUrl: string;
}

export type Category = {
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export type Variation = {
  variationId: number;
  variationName: string;
  variationDetail: VariationDetail[];
}

export type VariationDetail = {
  variationDetailId: number;
  description: string;
}

export type PostType = {
  postTypeId: number;
  postTypeName: string;
}

export type Campus = {
  campusId: number;
  campusName: string;
  imageUrl: string;
}

export type PostStatus = {
  postStatusId: number;
  postStatusName: string;
}