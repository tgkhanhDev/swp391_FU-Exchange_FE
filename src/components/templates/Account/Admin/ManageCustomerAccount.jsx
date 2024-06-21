import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";

export const ManageCustomerAccount = () => {
  const navigate = useNavigate();
  const { staffInfor  } = useAccount();

  useEffect(() => {
    if (!staffInfor ) {
      navigate('/*');
    }
    else if (staffInfor.role !== "Administrator") {
      navigate('/moderator');
    }
  })

  return (
    <div>
      Quản lí tài khoản customer
    </div>
  )
}


export default ManageCustomerAccount