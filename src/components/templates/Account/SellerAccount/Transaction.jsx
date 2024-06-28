import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { useOrder } from "../../../../hooks/useOrder";
import { useAppDispatch } from "../../../../store";
import { getOrderThunk } from "../../../../store/orderManager/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";

export const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentInfo } = useAccount();
  const { order } = useOrder();
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

    if (studentInfo.registeredStudentId) {
      dispatch(getOrderThunk({ registeredStudent: studentInfo.registeredStudentId }));
    }
  }, [])

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Giao dịch</div>
          
          <div className="py-10 pr-6">

          {Array.isArray(order) && order.length > 0 ? (
              order.map((ord) => (
                <div key={ord.orderId}>
                  <p>Order ID: {ord.orderId}</p>
                  <p>Create Date: {ord.createDate}</p>
                  <p>Complete Date: {ord.completeDate}</p>
                  <p>Description: {ord.description}</p>
                  <p>Payment ID: {ord.paymentId}</p>
                  <p>Registered Student: {ord.registeredStudent}</p>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}

            {/*Header*/}
            <div className="grid grid-cols-12 text-center text-lg bg-white py-5 rounded-t-md mb-5 sticky top-32 z-10 shadow-md">
              <div className="col-span-1">Order Id</div>
              <div className="col-span-2">Total Price</div>
              <div className="col-span-2">Create Date</div>
              <div className="col-span-2">Complete Date</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Action</div>
            </div>

            {/*Body */}
            <div className="grid grid-cols-12 text-center bg-white py-5 rounded-md mt-5">
              <div className="col-span-1">12</div>
              <div className="col-span-2">200,000 VNĐ</div>
              <div className="col-span-2">12-03-2024 12:02:01.12</div>
              <div className="col-span-2">12-03-2024 12:02:01.12</div>
              <div className="col-span-2">Đã xác nhận</div>
              <div className="col-span-2">Action</div>
              <div className="col-span-1">Chi tiết</div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}


export default Transaction