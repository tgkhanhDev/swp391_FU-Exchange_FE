import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";

export const ManagePostProduct = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();

  /*useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
    }
    else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
  })*/

  return (
    <div>
      Bài post
    </div>
  )
}


export default ManagePostProduct