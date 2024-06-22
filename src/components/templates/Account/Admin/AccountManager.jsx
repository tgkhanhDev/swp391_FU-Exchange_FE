import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";

export const AccountManager = () => {
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
      cục cức
    </div>
  )
}


export default AccountManager