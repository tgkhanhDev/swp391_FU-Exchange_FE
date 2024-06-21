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
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Thống kê</div>
          
          <div className="py-10 pr-6">

          </div>
        </div>
      </main>
    </div>
  )
}


export default Dashboard