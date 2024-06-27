export interface Review {
  postProductId: number
  orderId: number
  ratingNumber: number
  description: string
}

export interface viewReview {
  totalReview: number
  totalRating: number
  reviews: Review[]
}

export interface Review {
  review: number
  postProductId: number
  orderId: number
  rating: number
  description: string
  createTime: string
}