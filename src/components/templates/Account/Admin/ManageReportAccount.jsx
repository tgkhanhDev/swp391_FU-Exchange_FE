import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../../hooks/useAccount";

export const ManageReportAccount = () => {
  const navigate = useNavigate();
  const { staffInfor } = useAccount();

  useEffect(() => {
    if (!staffInfor) {
      navigate("/*");
    } else if (staffInfor.role !== "Administrator") {
      navigate("/moderator");
    }
  }, []);

  return <div>Quản lí report tài khoản</div>;
};

export default ManageReportAccount;
