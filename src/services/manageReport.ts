import { apiInstance } from "../constants/apiInstance";
import { utilsResponse } from "../types/utils";
import { ReportPostType, SendReport, ReportSellerType, SendReportSeller, FilterSellerReport, UpdateStatusReportSeller, FilterPostReport, UpdateStatusReportPost } from "../types/report"

const apiA = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/report-post-product",
});

const apiB = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/report-seller",
});

const apiC = apiInstance({
  baseURL: "http://trangiangkhanh.site:8090/moderator",
});

export const manageReport = {
  getAllReportPostType: () => apiA.get<utilsResponse<ReportPostType[]>>(`/all-type`),

  sendReportPost: (payload: SendReport) => 
    apiA.post<utilsResponse<any>>(`/send-report`, payload),

  getAllReportSellerType: () => apiB.get<utilsResponse<ReportSellerType[]>>(`/all-type`),

  sendReportSeller: (payload: SendReportSeller) => 
    apiB.post<utilsResponse<any>>(`/send-report`, payload),

  viewFilterReportSeller: (payload: FilterSellerReport) => 
    apiB.get<utilsResponse<any>>(`/filter?sellerName=${payload.sellerName}&reportProductTypeId=${payload.reportSellerTypeId}&reportStatusId=${payload.reportStatusId}`),

  updateStatusReportSeller: (payload: UpdateStatusReportSeller) => 
    apiC.put<utilsResponse<any>>(`/update-status-report-seller`, payload),

  viewFilterReportPost: (payload: FilterPostReport) => 
    apiA.get<utilsResponse<any>>(`/filter?productName=${payload.productName}&reportProductTypeId=${payload.reportProductTypeId}&reportStatusId=${payload.reportStatusId}`),

  updateStatusReportPost: (payload: UpdateStatusReportPost) => 
    apiC.put<utilsResponse<any>>(`/update-status-report-post`, payload),
};
