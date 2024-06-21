import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Select, Popover } from "antd";
import { UserOutlined, ShrinkOutlined, EllipsisOutlined, SendOutlined, PhoneOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './styles.css';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch } from "../../../../store";
import { getOrderThunk, getOrderDetailThunk } from "../../../../store/orderManager/thunk";
import { getPostByIdThunk } from "../../../../store/postManagement/thunk";
import { viewChatRoom } from "../../../../store/chatManager/thunk"
import { usePost } from "../../../../hooks/usePost";
import { useOrder } from "../../../../hooks/useOrder";
import { useAccount } from "../../../../hooks/useAccount";
import { format } from 'date-fns';
import console from "console";

export const OrderTemplate = () => {
  const { order } = useOrder();
  const { postDetail } = usePost();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [chatRoomData, setChatRoomData] = useState();
  const { studentInfo } = useAccount();
  const [showBoxChat, setShowBoxChat] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (showBoxChat && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showBoxChat]);

  useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
      return;
    }

    if (studentInfo.registeredStudentId) {
      dispatch(getOrderThunk({
        registeredStudent: studentInfo.registeredStudentId
      }));
      dispatch(viewChatRoom(studentInfo.registeredStudentId))
        .then((data) => {
          // Sau khi nhận được dữ liệu từ action, gán vào state chatRoomData
          setChatRoomData(data);
        })
    }
  }, [dispatch]);

  const options = [
    { value: 'Tất cả', label: 'Tất cả' },
    { value: 'Cao đến thấp', label: 'Cao đến thấp' },
    { value: 'Thấp đến cao', label: 'Thấp đến cao' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

  useEffect(() => {
    order.forEach(async (item) => {
      const response = await dispatch(getOrderDetailThunk({
        registeredStudent: item.registeredStudent,
        orderId: item.orderId,
        orderStatus: { orderStatusId: item.orderStatus.orderStatusId }
      }));

      const orderDetail = response.payload;
      // Lưu trữ chi tiết đơn hàng bằng setOrderDetails
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        [item.orderId]: orderDetail
      }));

      if (Array.isArray(orderDetail.postProductInOrder)) {
        orderDetail.postProductInOrder.forEach(async (detail) => {
          const postResponse = await dispatch(getPostByIdThunk(detail.postProduct.postProductId));
          const postProductDetail = postResponse.payload.data;
          // Lưu trữ postDetail vào postDetails theo postProductId
          setPostDetails(prevPostDetails => ({
            ...prevPostDetails,
            [detail.postProduct.postProductId]: postProductDetail
          }));
        });
      }
    });
  }, [dispatch, order]);

  return (
    <div>
      <main className='py-10 mx-6'>
        <div className='pl-14'>
          <div className="flex justify-between items-center mb-10">
            <div className='font-bold text-4xl'>Đơn hàng của tôi</div>
            <div className="w-40">
              <Select
                className="custom-select"
                defaultValue="Tất cả"
                options={options}
              />
            </div>
          </div>

          {order.map(item =>
            <div key={item.orderId} className='bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300'>
              <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
                <div className="">
                  <div className="text-lg font-bold">Ngày đặt đơn:</div>
                  <div>{formatDate(item.createDate)}</div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Tổng đơn: </div>
                  <div>{item.totalPrice.toLocaleString('en-US')} VNĐ</div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Trạng thái đơn hàng:</div>
                  <div>{item.orderStatus.orderStatusName}</div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Payment:</div>
                  <div>Not yet</div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Mã đơn: </div>
                  <div className="text-center">{item.orderId}</div>
                </div>
              </div>

              {orderDetails[item.orderId] && Array.isArray(orderDetails[item.orderId].postProductInOrder) && orderDetails[item.orderId].postProductInOrder.map(detail =>
                <div key={detail.postProduct.postProductId} className="py-5 px-5 flex flex-row gap-4">
                  <div className='h-32 w-32'>
                    {postDetails[detail.postProduct.postProductId]?.product?.image ? (
                      <img src={postDetails[detail.postProduct.postProductId].product.image[0].imageUrl} alt={postDetails[detail.postProduct.postProductId].product.detail.productName} className="h-32 w-32" />
                    ) : (
                      <div>No Image</div>
                    )}
                  </div>
                  <div className="w-[40%]">
                    <div className="pb-4">
                      <div className="font-semibold text-lg">{detail.postProduct.product.detail.productName}</div>
                      <div className="flex justify-between items-center">
                        <div>{detail.firstVariation}</div>
                        {detail.secondVariation && (
                          <>
                            <div>&#x2022;</div>
                            <div>{detail.secondVariation}</div>
                          </>
                        )}
                      </div>
                      <div className="mt-2">Số lượng: {detail.quantity}</div>
                    </div>
                    <div className="flex justify-between">
                      <button className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold">Mua lại</button>
                      <button className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold" onClick={() => setShowBoxChat(!showBoxChat)}>Liên hệ người bán</button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">
                    <NavLink to={'/review'}>
                      <div className="text-[var(--color-primary)] underline">Đánh giá ngay</div>
                    </NavLink>
                    <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: {detail.postProduct.priceBought.toLocaleString('en-US')}VNĐ</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <CSSTransition
        in={showBoxChat}
        timeout={300}
        classNames="boxchat"
        unmountOnExit
      >
        <div className="fixed bottom-0 right-2 left-[45%] top-80 bg-white z-10 rounded-t-md shadow-[0_0_10px_1px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-center py-2 px-4 text-2xl text-[var(--color-primary)] border-b-2 border-b-slate-300">
            <div className="font-semibold">Chat</div>
            <button onClick={() => setShowBoxChat(!showBoxChat)}><ShrinkOutlined /></button>
          </div>

          <div className="flex h-[calc(100%-50px)]">
            {/*Bên trái */}
            <div className="w-[60%] border-r-2 border-r-slate-300 py-3">
              {/*Chat */}
              <div className="flex items-center mb-4 px-2">
                <div className="rounded-full bg-white border border-slate-300 w-12 h-12 flex justify-center items-center">
                  <UserOutlined className="text-3xl" />
                </div>

                <div className="flex flex-grow items-center justify-between">
                  <div className="ml-2">
                    <div className="text-lg font-semibold">User A</div>
                    <div>Hi</div>
                  </div>

                  <div className="text-right">
                    <div>12-11-2023</div>
                    <Popover
                      placement="bottomRight"
                      content={(
                        <button className="rounded flex justify-center items-center" onClick={() => console.log('success')}>
                          <DeleteOutlined className="text-xl mr-2" />Delete
                        </button>
                      )}
                      trigger="click"
                    >
                      <button><EllipsisOutlined className="text-3xl" /></button>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            {/*Bên phải */}
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-between items-center border-b-2 border-b-slate-300 py-2 px-4 text-lg text-[var(--color-primary)]">
                <div className="font-semibold">Name</div>
                <Popover placement="bottomRight" content={<div><ExclamationCircleOutlined className="mr-1" />Chức năng đang trong giai đoạn phát triển</div>}>
                  <button><PhoneOutlined /></button>
                </Popover>
              </div>

              <div className="flex-grow overflow-y-auto">
                <div className="px-2 py-2">
                  {/*Bên kia */}
                  <div className="flex items-center my-4">
                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                      <UserOutlined className="text-lg" />
                    </div>
                    <div className="bg-slate-200 max-w-[52%] ml-2 rounded-lg px-2 py-1">
                      Hi
                    </div>
                  </div>

                  <div className="flex items-center my-4">
                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                      <UserOutlined className="text-lg" />
                    </div>
                    <div className="bg-slate-200 max-w-[52%] ml-2 rounded-lg px-2 py-1">
                      Cho tôi hỏi một chút được không ạ?
                    </div>
                  </div>

                  {/*Bên đây */}
                  <div className="flex justify-end items-center my-4">
                    <div className="bg-blue-300 max-w-[52%] mr-2 rounded-lg px-2 py-1">
                      Được bạn cứ hỏi, bên mình sẵn sàng trả lời
                    </div>
                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                      <UserOutlined className="text-lg" />
                    </div>
                  </div>

                  {/*Bên kia */}
                  <div className="flex items-center my-4">
                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                      <UserOutlined className="text-lg" />
                    </div>
                    <div className="bg-slate-200 max-w-[52%] ml-2 rounded-lg px-2 py-1">
                      Bạn có người yêu chưa? 😘
                    </div>
                  </div>

                  {/*Bên đây */}
                  <div className="flex justify-end items-center my-4">
                    <div className="bg-blue-300 max-w-[52%] mr-2 rounded-lg px-2 py-1">
                      ????
                    </div>
                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                      <UserOutlined className="text-lg" />
                    </div>
                  </div>

                  <div className="flex justify-end items-center my-4">
                    <div className="bg-blue-300 max-w-[52%] mr-2 rounded-lg px-2 py-1">
                      Đùa à??
                    </div>
                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                      <UserOutlined className="text-lg" />
                    </div>
                  </div>

                  {/* Thêm phần tử cuối cùng để cuộn tới đây */}
                  <div ref={messageEndRef}></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t-2 border-t-slate-300 py-2 px-4">
                <input type="text" placeholder="Gửi gì đó đi..." className="w-full focus:outline-none pr-3" />
                <button><SendOutlined className="text-[var(--color-primary)]" /></button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default OrderTemplate;
