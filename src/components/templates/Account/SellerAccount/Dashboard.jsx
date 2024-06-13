import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    else if (userInfo.role !== "Seller") {
      navigate('/authorize');
    }
  })

  return (
    <div>
      Hi
    </div>
  )
}


export default Dashboard