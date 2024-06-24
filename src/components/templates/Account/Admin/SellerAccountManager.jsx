import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";

export const SellerAccountManager = () => {
  const navigate = useNavigate();
  const { staffInfor } = useAccount();

  useEffect(() => {
    if (!staffInfor) {
      navigate('/*');
    }
    else if (staffInfor.role !== "Administrator") {
      navigate('/moderator');
    }
  })

  return (
    <div>
      
    </div>
  )
}


export default SellerAccountManager