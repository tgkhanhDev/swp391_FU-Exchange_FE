export interface ReportPostType {
  reportProductTypeId: number
  reportProductTypeName: string
  description: string
}

export interface SendReport {
  registeredStudentId: number
  postProductId: number
  reportProductTypeId: number
  content: string
}

export interface SendReportSeller {
  registeredStudentId: number
  sellerId: number
  reportSellerTypeId: number
  content: string
}

export interface ReportSellerType {
  reportSellerTypeId: number
  reportTypeName: string
}

export interface ReportSeller {
  reportSellerId: number
  buyerId: number
  buyerName: string
  sellerId: number
  sellerName: string
  reportSellerType: ReportSellerType
  reportStatus: ReportStatus
  createTime: string
  content: string
}

export interface ReportStatus {
  reportStatusId: number
  reportStatusName: string
}

export interface FilterSellerReport {
  sellerName?: string
  reportSellerTypeId?: number
  reportStatusId?: number
}

export interface UpdateStatusReportSeller {
  reportSellerId: number
  reportStatusId: number
}

export interface FilterPostReport {
  productName?: string
  reportProductTypeId?: number
  reportStatusId?: number
}

export interface ReportPost {
  reportPostProductId: number
  buyerId: number
  buyerName: string
  postProductId: number
  postProductName: string
  reportProductType: ReportPostType
  reportStatus: ReportStatus
  content: string
  createTime: string
}

export interface ReportProductType {
  reportProductTypeId: number
  reportProductTypeName: string
  description: string
}

export interface UpdateStatusReportPost {
  reportPostProductId: number
  reportStatusId: number
}