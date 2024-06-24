export interface viewWishlist {
  registeredStudentId: number
  quantity: number
  createTime: string
  active: boolean
}

export interface createWishlist {
  postProductId: number
  registeredStudentId: number
  quantity: number
}

