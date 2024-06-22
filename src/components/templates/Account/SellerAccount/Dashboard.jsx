import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../../../store";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: userInfo.username
            }
          }
        }
      })
    )
      .then((action) => {
        const { payload } = action;
        const { data } = payload;
        setUser(data); // Kết hợp userInfo và data thành một đối tượng mới
      })
      .catch((error) => {
        console.error("Error fetching account information:", error);
      });

    if (!userInfo) {
      navigate('/login');
    }
    else if (userInfo.role !== "Seller") {
      navigate('/authorize');
    }
  })


  useEffect(() => {
    if (user && user.sellerTO?.active === 2) {
      navigate('/*');
    }
  }, [user, navigate]);

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