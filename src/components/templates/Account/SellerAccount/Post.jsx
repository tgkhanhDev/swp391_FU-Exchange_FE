import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";

export const Post = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();

  useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
    }
    else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
  })

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Bài đăng</div>
          
          <div className="py-10 pr-6">

          </div>
        </div>
      </main>
    </div>
  )
}


export default Post