import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { useEffect, useState } from "react";

export const useReport = () => {
  const { reportPostType, reportSellerType, viewReportSeller, viewReportPost } = useSelector(
    (state: RootState) => state.manageReport
  );

  return { reportPostType, reportSellerType, viewReportSeller, viewReportPost };
};
