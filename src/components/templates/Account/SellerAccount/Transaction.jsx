import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { useOrder } from "../../../../hooks/useOrder";
import { useAppDispatch } from "../../../../store";
import { getOrderBySellerIdThunk, updateStatusOrderThunk } from "../../../../store/orderManager/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { Button, Select } from "antd";
import { format } from 'date-fns';

const { Option } = Select;

export const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentInfo } = useAccount();
  const { orderSeller } = useOrder();
  const [user, setUser] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [status, setStatus] = useState('0');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const sortOrders = (orders) => {
    const ordersCopy = [...orders]; // Create a copy of the array
    return ordersCopy.sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  };

  const handleSortStatus = (value) => {
    setStatus(value);
  }

  useEffect(() => {
    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: studentInfo?.username
            }
          }
        }
      })
    )
      .then((action) => {
        const { payload } = action;
        const { data } = payload;
        setUser(data); // Combine userInfo and data into a new object
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
  }, []);

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

  const handleChangeStatus = (orderId, orderStatusId) => {
    dispatch(updateStatusOrderThunk({ orderId: orderId, orderStatusId: orderStatusId }));
  };

  const sortedOrders = sortOrders(orderSeller);


  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Giao dịch</div>
          <div className="py-10 pr-6">

            {/* Sorting Filter */}
            <div className="mb-4 flex justify-between">
              <Select defaultValue="0" className="w-40" onChange={handleSortStatus}>
                <Option value="0">Tất cả</Option>
                <Option value="1">Chưa xác nhận</Option>
                <Option value="2">Đã xác nhận</Option>
                <Option value="3">Đang giao hàng</Option>
                <Option value="4">Đã hủy</Option>
                <Option value="5">Hoàn thành</Option>
              </Select>

              <Select defaultValue="newest" onChange={handleSortChange}>
                <Option value="newest">Ngày gần nhất</Option>
                <Option value="oldest">Ngày xa nhất</Option>
              </Select>
            </div>

            {/* Header */}
            <div className="grid grid-cols-12 text-center text-lg bg-white py-5 rounded-t-md mb-5 sticky top-32 z-10 shadow-md">
              <div className="col-span-1">Mã đơn</div>
              <div className="col-span-1">Payment</div>
              <div className="col-span-2">Ngày tạo</div>
              <div className="col-span-2">Ngày kết thúc</div>
              <div className="col-span-3">Trạng thái</div>
              <div className="col-span-1">Chi tiết</div>
              <div className="col-span-2">Thao tác</div>
            </div>

            {/* Body */}
            {sortedOrders.map(order => (
              (status == 0 || order.orderStatus.orderStatusId == status) && (
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
                    <Button type="link" className="text-base font-medium" onClick={() => navigate(`/dashboard/detail/${order.orderId}`)}>Chi tiết</Button>
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
                      null // Do not display any buttons
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transaction;
