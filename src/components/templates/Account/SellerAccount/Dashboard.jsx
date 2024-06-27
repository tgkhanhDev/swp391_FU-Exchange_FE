import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../../../store";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { getOrderPostProductThunk } from "../../../../store/orderManager/thunk";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const [orderPost, setOrderPost] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userInfo.role !== "Seller") {
      navigate('/authorize');
    } else {
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

          // Sau khi có thông tin user, lấy sellerId và gọi API thứ hai
          const sellerId = data.sellerTO?.sellerId;
          if (sellerId) {
            dispatch(getOrderPostProductThunk(sellerId))
              .then((action) => {
                const { payload } = action;
                setOrderPost(payload); // Cập nhật state orderPost

                const total = payload.reduce((acc, item) => acc + item.totalpriceBought * 1000, 0);
                setTotalPrice(total);
              })
              .catch((error) => {
                console.error("Error fetching order post product information:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    else if (userInfo.role !== "Seller") {
      navigate('/authorize');
    }
  })

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  console.log(totalPrice)

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