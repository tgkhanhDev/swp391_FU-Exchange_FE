import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Select, Popover } from "antd";
import { UserOutlined, ShrinkOutlined, EllipsisOutlined, SendOutlined, PhoneOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './styles.css';
import { CSSTransition } from "react-transition-group";
import { useAppDispatch } from "../../../../store";
import { getOrderThunk, getOrderDetailThunk } from "../../../../store/orderManager/thunk";
import { getPostByIdThunk } from "../../../../store/postManagement/thunk";
import { viewChatRoom, chatRoomStS, sendMessage, contactSeller } from "../../../../store/chatManager/thunk"
import { getAccountInfoThunk } from "../../../../store/userManagement/thunk"
import { useOrder } from "../../../../hooks/useOrder";
import { useAccount } from "../../../../hooks/useAccount";
import { useChat } from "../../../../hooks/useChat";
import { format } from 'date-fns';

export const OrderTemplate = () => {
  const { order } = useOrder();
  const { chatroom, chatDetail } = useChat();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const { studentInfo } = useAccount();
  const [showBoxChat, setShowBoxChat] = useState(false);
  const messageEndRef = useRef(null);
  const [sortBy, setSortBy] = useState();
  const [user, setUser] = useState();
  const [userDetail, setUserDetail] = useState();
  const [sellerId, setSellerId] = useState();
  const [content, setContent] = useState();

  const formatDay = (dateTimeString) => {
    if (!dateTimeString) return '';
    return dateTimeString.substring(0, 10); // Lấy từ vị trí 0 đến 10
  };

  const truncateContent = (content, maxLength) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };


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
    }
  }, [dispatch]);

  useEffect(() => {
    // Sắp xếp mảng order từ originalOrder và sortBy
    let sortedOrders = [...order];

    if (sortBy === '2') {
      sortedOrders = sortedOrders.sort((a, b) => {
        return new Date(a.createDate) - new Date(b.createDate);
      });
    } else {
      sortedOrders = sortedOrders.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);
      });
    }

    setOrders(sortedOrders);
  }, [order, sortBy]);

  useEffect(() => {
    // Sắp xếp mảng order theo createDate giảm dần
    const sortedOrders = [...order].sort((a, b) => {
      return new Date(b.createDate) - new Date(a.createDate);
    });

    // Cập nhật lại state order với mảng đã sắp xếp
    setOrders(sortedOrders);
  }, [order]);

  const options = [
    { value: '1', label: 'Giảm dần theo ngày' },
    { value: '2', label: 'Tăng dần theo ngày' },
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

  useEffect(() => {
    // Đảm bảo chatroom không rỗng và có ít nhất một phòng chat
    if (chatroom && chatroom.length > 0) {
      // Lặp qua các phòng chat để lấy thông tin người dùng từ studentReceiveId
      chatroom.forEach(room => {
        const registeredId = room.chatMessage[0].studentReceiveId;

        // Dispatch Thunk để lấy dữ liệu người dùng dựa trên registeredId
        dispatch(getAccountInfoThunk({ registeredStudentId: registeredId }))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            setUser((prevUser) => ({
              ...prevUser,
              [registeredId]: data  // Lưu trữ thông tin người dùng dựa trên registeredId
            }));
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      });
    }
  }, [chatroom, dispatch]);

  const registeredId = studentInfo.registeredStudentId;

  const handleChat = (sellerId, content) => {
    setShowBoxChat(true); // Mở box chat khi nhấn vào nút
    setSellerId(sellerId); // Đặt sellerId vào state
    setContent(content);
  }

  const contentCreate = `Tôi muốn trao đổi về sản phẩm này: ${content}`;

  useEffect(() => {
    if (sellerId && registeredId && showBoxChat) {
      dispatch(contactSeller({ registeredStudentId: registeredId, sellerId: sellerId, content: contentCreate }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;

          if (data?.studentReceiveId && data?.studentSendId) {
            dispatch(chatRoomStS({ studentSendId: data.studentSendId, studentReceiveId: data.studentReceiveId }));
          }
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch, sellerId, registeredId, showBoxChat, contentCreate]);

  const handleSelectChat = (studentSendId, studentReceiveId) => {
    dispatch(chatRoomStS({ studentSendId: studentSendId, studentReceiveId: studentReceiveId }))
    dispatch(getAccountInfoThunk({ registeredStudentId: studentReceiveId }))
      .then((action) => {
        const { payload } = action;
        const { data } = payload;
        setUserDetail(data);
      })
      .catch((error) => {
        console.error("Error fetching account information:", error);
      });
  }

  const isEmptyChatDetail = !chatDetail || Object.keys(chatDetail).length === 0 ||
    Object.keys(chatDetail).every(roomId => chatDetail[roomId].length === 0);

  const studentSendIdRef = registeredId
  let studentReceiveId = null
  let chatRoomId = null
  const contentRef = useRef("")
  const [transitionKey, setTransitionKey] = useState(Date.now());

  const reloadBoxChat = () => {
    if (chatDetail && chatroom) {
      dispatch(
        sendMessage({
          studentSendId: studentSendIdRef, // Assuming studentSendIdRef is correctly defined elsewhere
          studentReceiveId: studentReceiveId,
          chatRoomId: chatRoomId,
          content: contentRef.current,
        })
      );

      // Force render by changing a state variable or key
      setTransitionKey(Date.now()); // Assuming transitionKey is a state variable in your component
    }
  };

  return (
    <div>
      <main className='py-10 mx-6'>
        <div className='pl-14'>
          <div className="flex justify-between items-center mb-10">
            <div className='font-bold text-4xl'>Đơn hàng của tôi</div>
            <div className="w-60">
              <Select
                className="w-60"
                defaultValue={'Giảm dần theo ngày'}
                options={options}
                onChange={(value) => setSortBy(value)}
              />
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="flex justify-center items-center text-red-500 text-2xl font-semibold">Chưa có đơn hàng</div>
          ) : (orders.map(item =>
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
                  <div>{item.paymentId}</div>
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
                      <button className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold"
                        onClick={() => {
                          navigate(`/detail/${detail.postProduct.postProductId}`);
                        }}
                      >Mua lại</button>
                      <button className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold" onClick={() => handleChat(postDetails[detail.postProduct.postProductId].product.seller.sellerId, detail.postProduct.product.detail.productName)}>Liên hệ người bán</button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">
                    <NavLink to={`/review/${item.orderId}/${detail.postProduct.postProductId}`}>
                      <div className="text-[var(--color-primary)] underline">Đánh giá ngay</div>
                    </NavLink>
                    <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: {detail.postProduct.priceBought.toLocaleString('en-US')}VNĐ</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <CSSTransition
        key={transitionKey}
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
              {/*Chat tổng*/}
              <div className="flex items-center mb-4 px-2">
                {chatroom && chatroom.length > 0 && (
                  <div className="w-full">
                    {chatroom.map(room => (
                      room?.active === true && (
                        <div onClick={() => handleSelectChat(room.chatMessage[0].studentSendId, room.chatMessage[0].studentReceiveId)}>
                          <div key={room.chatRoomId} className="hover:bg-gray-100 cursor-pointer duration-200 w-full">
                            <div className="flex items-center mb-4 px-2">
                              <div className="rounded-full bg-white border border-slate-300 w-12 h-12 flex justify-center items-center">
                                <UserOutlined className="text-3xl" />
                              </div>
                              {room.chatMessage && room.chatMessage.length > 0 && (
                                <div key={room.chatMessage[0].messageId} className="flex flex-grow items-center justify-between ml-2">
                                  <div>
                                    <div className="text-base font-semibold">{truncateContent(`${user?.[room.chatMessage[0].studentReceiveId]?.student?.firstName} ${user?.[room.chatMessage[0].studentReceiveId]?.student?.lastName}`, 8)}</div>
                                    <div>{truncateContent(room.chatMessage.slice(-1)[0].content, 14)}</div>
                                  </div>
                                  <div className="text-right text-sm">
                                    <div>{formatDay(room.chatMessage[0].timeSend)}</div>
                                    <Popover
                                      placement="bottomRight"
                                      content={(
                                        <button className="rounded flex justify-center items-center">
                                          <DeleteOutlined className="text-xl mr-2" />Delete
                                        </button>
                                      )}
                                      trigger="click"
                                    >
                                      <button><EllipsisOutlined className="text-3xl" /></button>
                                    </Popover>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/*Bên phải */}
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-between items-center border-b-2 border-b-slate-300 py-2 px-4 text-lg text-[var(--color-primary)]">
                <div className="font-semibold">{userDetail?.student?.firstName} {userDetail?.student?.lastName}</div>
                <Popover placement="bottomRight" content={<div><ExclamationCircleOutlined className="mr-1" />Chức năng đang trong giai đoạn phát triển</div>}>
                  <button><PhoneOutlined /></button>
                </Popover>
              </div>

              <div className="flex-grow overflow-y-auto">
                {/*Tổng đoạn chat chi tiết */}
                <div className="px-2 py-2">
                  {/*Bên kia */}
                  {isEmptyChatDetail ? (
                    <div className="text-center text-gray-500 mt-4">Không có tin nhắn nào.</div>
                  ) : (
                    chatRoomId = chatDetail.chatRoomId,
                    <div>
                      {Object.keys(chatDetail).map(roomId => (
                        <div key={roomId}>
                          {chatDetail[roomId].length > 0 && (
                            chatDetail[roomId].map(message => (
                              studentReceiveId = message.studentSendId,
                              message.studentSendId !== registeredId ? (
                                <div key={message.messageId} className="flex items-center my-4">
                                  <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                                    <UserOutlined className="text-lg" />
                                  </div>
                                  <div className="bg-slate-200 max-w-[52%] ml-2 rounded-lg px-2 py-1">
                                    {message.content}
                                  </div>
                                </div>
                              ) : (
                                <div key={message.messageId} className="flex justify-end items-center my-4">
                                  <div className="bg-blue-300 max-w-[52%] mr-2 rounded-lg px-2 py-1">
                                    {message.content}
                                  </div>
                                  <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                                    <UserOutlined className="text-lg" />
                                  </div>
                                </div>
                              )
                            ))
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Thêm phần tử cuối cùng để cuộn tới đây */}
                  <div ref={messageEndRef}></div>
                </div>
              </div>
              {chatDetail && !isEmptyChatDetail && (
                <div className="flex justify-between items-center border-t-2 border-t-slate-300 py-2 px-4">
                  <input type="text" placeholder="Gửi gì đó đi..." className="w-full focus:outline-none pr-3" onChange={(e) => {
                    contentRef.current = e.target.value;
                  }} />
                  <button onClick={reloadBoxChat}><SendOutlined className="text-[var(--color-primary)]" /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default OrderTemplate;
