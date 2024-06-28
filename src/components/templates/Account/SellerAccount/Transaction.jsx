import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { useOrder } from "../../../../hooks/useOrder";
import { useAppDispatch } from "../../../../store";
import { getOrderBySellerIdThunk, updateStatusOrderThunk } from "../../../../store/orderManager/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { Button } from "antd"
import { format } from 'date-fns';

export const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentInfo } = useAccount();
  const { orderSeller } = useOrder();
  const [user, setUser] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

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
  }, [])

  useEffect(() => {
    if (user.sellerTO && user.sellerTO.sellerId) {
      dispatch(getOrderBySellerIdThunk(user.sellerTO.sellerId));
    }
  }, [dispatch, user.sellerTO]);

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  console.log(orderSeller)

  const handleChangeStatus = (orderId, orderStatusId) => {
    dispatch(updateStatusOrderThunk({ orderId: orderId, orderStatusId: orderStatusId }))
  }


  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Giao dịch</div>

          <div className="py-10 pr-6">

            {/*Header*/}
            <div className="grid grid-cols-12 text-center text-lg bg-white py-5 rounded-t-md mb-5 sticky top-32 z-10 shadow-md">
              <div className="col-span-1">Mã đơn</div>
              <div className="col-span-1">Payment</div>
              <div className="col-span-2">Ngày tạo</div>
              <div className="col-span-2">Ngày kết thúc</div>
              <div className="col-span-3">Trạng thái</div>
              <div className="col-span-1">Chi tiết</div>
              <div className="col-span-2">Thao tác</div>
            </div>

            {/*Body */}
            {orderSeller.map(order => (
              <div key={order.orderId} className="grid grid-cols-12 text-center bg-white py-5 rounded-md mt-5">
                <div className="col-span-1">{order.orderId}</div>
                <div className="col-span-1">{order.paymentId}</div>
                <div className="col-span-2">{formatDate(order.createDate)}</div>
                <div className="col-span-2">{formatDate(order.completeDate)}</div>
                <div className={`col-span-3 
                ${order.orderStatus.orderStatusId === 1 ? 'text-yellow-400' :
                    order.orderStatus.orderStatusId === 2 ? 'text-green-400' :
                      order.orderStatus.orderStatusId === 3 ? 'text-blue-400' :
                        order.orderStatus.orderStatusId === 4 ? 'text-red-400' :
                          order.orderStatus.orderStatusId === 5 ? 'text-orange-400' : 'bg-gray-400'
                  } font-semibold text-lg`}>
                  {order.orderStatus.orderStatusName}
                </div>
                <div className="col-span-1">
                  <Button type="link" className="text-base font-medium">Chi tiết</Button>
                </div>
                <div className="col-span-2">
                  {order.orderStatus.orderStatusId === 1 && (
                    <div className="flex justify-between items-center px-2">
                      <Button onClick={() => handleChangeStatus(order.orderId, 2)}>Đã xác nhận</Button>
                      <Button onClick={() => handleChangeStatus(order.orderId, 4)}>Hủy</Button>
                    </div>
                  )}
                  {order.orderStatus.orderStatusId === 2 && (
                    <div className="flex flex-col justify-between items-center gap-y-2">
                      <Button onClick={() => handleChangeStatus(order.orderId, 3)}>Đang giao hàng</Button>
                      <Button onClick={() => handleChangeStatus(order.orderId, 4)}>Hủy</Button>
                    </div>
                  )}
                  {(order.orderStatus.orderStatusId === 3 || order.orderStatus.orderStatusId === 4 || order.orderStatus.orderStatusId === 5) && (
                    null // Không hiển thị bất kỳ nút nào
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


export default Transaction