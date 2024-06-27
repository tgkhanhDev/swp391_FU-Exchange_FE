export interface viewWishlist {
  wishListId: number
  registeredStudentId: number
  postProductResponse: PostProductResponse
  quantity: number
  createTime: string
  active: boolean
}

export interface PostProductResponse {
  postProductId: number
  quantity: number
  createDate: string
  content: string
  productResponse: ProductResponse
}

export interface ProductResponse {
  price: number
  productDetailResponse: ProductDetailResponse
  postProductId: number
}

export interface ProductDetailResponse {
  productName: string
  description: string
}



export interface createWishlist {
  postProductId: number
  registeredStudentId: number
  quantity: number
}

export interface updateStatusWishlist {
  wishListId: number
  active: number
}

export interface updateQuantityWishlist {
  wishListId: number
  quantity: number
}

