import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useAppDispatch } from "../../../../store";

export const Post = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentInfo } = useAccount();
  const [user, setUser] = useState('');

  useEffect(() => {
    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: studentInfo.username
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

    if (!studentInfo) {
      navigate('/login');
    }
    else if (studentInfo.role !== "Seller") {
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
          <div className='font-bold text-4xl'>Bài đăng</div>
          
          <div className="py-10 pr-6">

          </div>
        </div>
      </main>
    </div>
  )
}


export default Post