import { Product } from "./product";

export interface PostLoadMore {
  responseObject: ResponseObject;
  meta: Meta;
  data: Post[];
}

export interface ResponseObject {
  status: number;
  message: string;
}

export interface Meta {
  total: number;
  current: number;
}

export interface Post {
  postProductId: number;
  product: Product;
  postType: PostType;
  campus: Campus;
  postStatus: PostStatus;
  quantity: number;
  createDate: string;
  content: string;
}

// export interface Product {
//   productId: number;
//   detail: Detail;
//   image: Image[];
//   category: Category;
//   variation: Variation[];
//   price: number;
// }

export interface Detail {
  productDetailId: number;
  productName: string;
  description: string;
}

export interface Image {
  productImageId: number;
  imageUrl: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  imageUrl?: string;
}

export interface PostType {
  postTypeId: number;
  postTypeName: string;
}

export interface Campus {
  campusId: number;
  campusName: string;
  imageUrl?: string;
}

export interface PostStatus {
  postStatusId: number;
  postStatusName: string;
}

export interface PostFilter_API {
  current: number;
  campusId?: number | "";
  postTypeId?: number | "";
  name?: string;
}
