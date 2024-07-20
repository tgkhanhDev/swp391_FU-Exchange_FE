import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Select, Popover, Button } from "antd";
import { UserOutlined, ShrinkOutlined, EllipsisOutlined, SendOutlined, PhoneOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './styles.css';
import { CSSTransition } from "react-transition-group";
import { useAppDispatch } from "../../../../store";
import { getOrderThunk, updateStatusOrderThunk } from "../../../../store/orderManager/thunk";
import { viewChatRoom, chatRoomStS, sendMessage, contactSeller, deleteChatRoom } from "../../../../store/chatManager/thunk"
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
  const [orders, setOrders] = useState([]);
  const { studentInfo } = useAccount();
  const [showBoxChat, setShowBoxChat] = useState(false);
  const messageEndRef = useRef(null);
  const [sortBy, setSortBy] = useState('1');
  const [user, setUser] = useState();
  const [userDetail, setUserDetail] = useState();
  const [sellerId, setSellerId] = useState();
  const [content, setContent] = useState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
      dispatch(getOrderThunk(
        studentInfo.registeredStudentId
      ));
      dispatch(viewChatRoom(studentInfo.registeredStudentId))
    }
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(order)) {
      console.error('Order is not an array:', order);
      return;
    }

    let sortedOrders = [...order];

    if (sortBy === '2') {
      sortedOrders = sortedOrders.sort((a, b) => new Date(a.order.createDate) - new Date(b.order.createDate));
    } else {
      sortedOrders = sortedOrders.sort((a, b) => new Date(b.order.createDate) - new Date(a.order.createDate));
    }

    setOrders(sortedOrders);
  }, [order, sortBy]);

  const options = [
    { value: '1', label: 'Ngày gần nhất' },
    { value: '2', label: 'Ngày xa nhất' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

  useEffect(() => {
    // Đảm bảo chatroom không rỗng và có ít nhất một phòng chat
    if (chatroom && chatroom.length > 0) {

      chatroom.forEach(room => {
        // Kiểm tra xem room.chatMessage[0].studentSendId có bằng registeredId hay không
        const studentIdToFetch = (room.chatMessage[0].studentSendId === registeredId)
          ? room.chatMessage[0].studentReceiveId
          : room.chatMessage[0].studentSendId;

        // Dispatch Thunk để lấy dữ liệu người dùng dựa trên studentIdToFetch
        dispatch(getAccountInfoThunk({ registeredStudentId: studentIdToFetch }))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            setUser((prevUser) => ({
              ...prevUser,
              [studentIdToFetch]: data  // Lưu trữ thông tin người dùng dựa trên studentIdToFetch
            }));
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      });
    }
  }, [chatroom, dispatch]);

  const registeredId = studentInfo?.registeredStudentId;

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
    dispatch(chatRoomStS({ studentSendId: studentSendId, studentReceiveId: studentReceiveId }));
    if (studentReceiveId !== userInfo?.registeredStudentId) {
      dispatch(getAccountInfoThunk({ registeredStudentId: studentReceiveId }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUserDetail(data);
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    } else if (studentSendId !== userInfo?.registeredStudentId) {
      dispatch(getAccountInfoThunk({ registeredStudentId: studentSendId }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUserDetail(data);
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }

  const handleDeleteChat = (chatRoomId) => {
    dispatch(deleteChatRoom(chatRoomId));
  }

  const isEmptyChatDetail = !chatDetail || Object.keys(chatDetail).length === 0 ||
    Object.keys(chatDetail).every(roomId => chatDetail[roomId].length === 0);

  const studentSendIdRef = registeredId
  let studentReceiveId = null
  let chatRoomId = null
  const contentRef = useRef("")
  const [transitionKey, setTransitionKey] = useState(Date.now());

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      reloadBoxChat();
    }
  };

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

  const handleChangeStatus = (orderId, orderStatusId) => {
    dispatch(updateStatusOrderThunk({ orderId: orderId, orderStatusId: orderStatusId }))
  }

  return (
    <div>
      <main className='py-10 mx-6'>
        <div className='pl-14'>
          <div className="flex justify-between items-center mb-10">
            <div className='font-bold text-4xl'>Đơn hàng của tôi</div>
            <div className="w-60">
              <Select
                className="w-60"
                defaultValue={'1'}
                options={options}
                onChange={(value) => setSortBy(value)}
              />
            </div>
          </div>

          {orders ? (
            orders.length === 0 ? (
              <div className="flex justify-center items-center text-red-500 text-2xl font-semibold">
                Chưa có đơn hàng
              </div>
            ) : (
              orders.map((item) => (
                <div
                  key={item.order.orderId}
                  className="bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300"
                >
                  <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
                    <div>
                      <div className="text-lg font-bold">Ngày đặt đơn:</div>
                      <div>{formatDate(item.order.createDate)}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Ngày cập nhật mới:</div>
                      <div>{formatDate(item.order.completeDate)}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Tổng đơn:</div>
                      <div>
                        {item.postProductInOrder
                          .reduce(
                            (total, product) => total + product.priceBought * product.quantity * 1000,
                            0
                          )
                          .toLocaleString("en-EN")}{" "}
                        VNĐ
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Trạng thái đơn hàng:</div>
                      <div>{item.order.orderStatus.orderStatusName}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Payment:</div>
                      <div>{item.order.paymentId}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Mã đơn:</div>
                      <div className="text-center">{item.order.orderId}</div>
                    </div>
                  </div>

                  {item.postProductInOrder.map((product) => (
                    <div
                      key={product.postProductId}
                      className="py-5 px-5 flex flex-row gap-4"
                    >
                      <div className="h-32 w-32">
                        {product.imageUrlProduct ? (
                          <img
                            src={product.imageUrlProduct}
                            className="h-32 w-32"
                            alt={product.productName}
                          />
                        ) : (
                          <div>No Image</div>
                        )}
                      </div>
                      <div className="w-[40%]">
                        <div className="pb-4">
                          <div className="font-semibold text-lg">{product.productName}</div>
                          <div className="flex justify-between items-center">
                            <div className="flex-1 truncate">
                              {product.firstVariation}
                            </div>
                            {product.secondVariation && (
                              <div className="flex items-center ml-2">
                                <div className="flex-1 truncate">
                                  {product.secondVariation}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-2">Số lượng: {product.quantity}</div>
                        </div>
                        <div className="flex justify-between">
                          {product.postStatusDTO.postStatusId === 4 ? (
                            <button
                              className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold"
                              onClick={() => {
                                navigate(`/detail/${product.postProductId}`);
                              }}
                            >
                              Mua lại
                            </button>
                          ) : (
                            <button className="px-14 py-3 bg-gray-200 text-gray-500 font-bold mr-5">
                              Bài đăng đã bị xóa hoặc vô hiệu hóa
                            </button>
                          )}
                          <button
                            className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold"
                            onClick={() =>
                              handleChat(product.sellerId, product.productName)
                            }
                          >
                            Liên hệ người bán
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">
                        <NavLink
                          to={`/review/${item.order.orderId}/${product.postProductId}`}
                        >
                          <div className="text-[var(--color-primary)] underline">
                            Đánh giá ngay
                          </div>
                        </NavLink>
                        <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: {(product.priceBought * product.quantity * 1000).toLocaleString("en-EN")} VNĐ</div>
                      </div>
                    </div>
                  ))}
                  {item.order.orderStatus.orderStatusId === 1 && (
                    <div className="flex justify-end mx-4">
                      <button
                        className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold mr-12"
                        onClick={() => handleChangeStatus(item.order.orderId, 4)}
                      >
                        Hủy đơn
                      </button>
                    </div>
                  )}
                  {item.order.orderStatus.orderStatusId === 3 && (
                    <div className="flex justify-end mx-4">
                      <button
                        className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold mr-12"
                        onClick={() => handleChangeStatus(item.order.orderId, 5)}
                      >
                        Đã nhận hàng
                      </button>
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            <div className="text-2xl font-semibold text-orange-500 text-center">
              Loading...
            </div>
          )}

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
                          <div>
                            <div key={room.chatRoomId} className="hover:bg-gray-100 cursor-pointer duration-200 w-full">
                              <div className="flex items-center mb-4 px-2">
                                <div className="rounded-full bg-white border border-slate-300 w-12 h-12 flex justify-center items-center">
                                  <UserOutlined className="text-3xl" />
                                </div>
                                {room.chatMessage && room.chatMessage.length > 0 && (
                                  <div key={room.chatMessage[0].messageId} className="flex flex-grow items-center justify-between ml-2">
                                    <div>
                                      <div className="text-base font-semibold">{truncateContent(
                                        (room.chatMessage[0].studentSendId === registeredId)
                                          ? `${user?.[room.chatMessage[0].studentReceiveId]?.student?.firstName || ''} ${user?.[room.chatMessage[0].studentReceiveId]?.student?.lastName || ''}`
                                          : `${user?.[room.chatMessage[0].studentSendId]?.student?.firstName || ''} ${user?.[room.chatMessage[0].studentSendId]?.student?.lastName || ''}`,
                                        8
                                      )}</div>
                                      <div>{truncateContent(room.chatMessage.slice(-1)[0].content, 14)}</div>
                                    </div>
                                    <div className="text-right text-sm">
                                      <div>{formatDay(room.chatMessage[0].timeSend)}</div>
                                      <Popover
                                        placement="bottomRight"
                                        content={(
                                          <button className="rounded flex justify-center items-center" onClick={() => handleDeleteChat(room.chatRoomId)}>
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
                              userInfo && userInfo.role === "Seller" ? (
                                message.studentSendId !== registeredId ? (
                                  studentReceiveId = message.studentSendId,
                                  <div key={message.chatMessageId} className="flex items-center my-4">
                                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                                      <UserOutlined className="text-lg" />
                                    </div>
                                    <div className="bg-slate-200 max-w-[52%] ml-2 rounded-lg px-2 py-1">
                                      {message.content}
                                    </div>
                                  </div>
                                ) : (
                                  studentReceiveId = message.studentReceiveId,
                                  <div key={message.chatMessageId} className="flex justify-end items-center my-4">
                                    <div className="bg-blue-300 max-w-[52%] mr-2 rounded-lg px-2 py-1">
                                      {message.content}
                                    </div>
                                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                                      <UserOutlined className="text-lg" />
                                    </div>
                                  </div>
                                )
                              ) : (
                                message.studentSendId !== registeredId ? (
                                  studentReceiveId = message.studentSendId,
                                  <div key={message.chatMessageId} className="flex items-center my-4">
                                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                                      <UserOutlined className="text-lg" />
                                    </div>
                                    <div className="bg-slate-200 max-w-[52%] ml-2 rounded-lg px-2 py-1">
                                      {message.content}
                                    </div>
                                  </div>
                                ) : (
                                  studentReceiveId = message.studentReceiveId,
                                  <div key={message.chatMessageId} className="flex justify-end items-center my-4">
                                    <div className="bg-blue-300 max-w-[52%] mr-2 rounded-lg px-2 py-1">
                                      {message.content}
                                    </div>
                                    <div className="rounded-full bg-white border border-slate-300 w-8 h-8 flex justify-center items-center">
                                      <UserOutlined className="text-lg" />
                                    </div>
                                  </div>
                                )
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
                  }}
                    onKeyPress={handleKeyPress} />
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
