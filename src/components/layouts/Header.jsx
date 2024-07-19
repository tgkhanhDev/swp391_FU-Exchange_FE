import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined, MessageOutlined, ShrinkOutlined, ExclamationCircleOutlined, PhoneOutlined, SendOutlined, DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../store";
import {
  getAccountInfoThunk,
  getSellerInfoThunk,
} from "../../store/userManagement/thunk";
import { CSSTransition } from "react-transition-group";
import { Dropdown, Menu, Popover } from "antd";
import "./styles.css";
import { useChat } from "../../hooks/useChat"
import { viewChatRoom, sendMessage, chatRoomStS, deleteChatRoom } from "../../store/chatManager/thunk"
import { useAccount } from "../../hooks/useAccount"
import { Tooltip } from 'react-tooltip'

export const Header = () => {
  const [user, setUser] = useState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const { chatroom, chatDetail } = useChat();
  const [userDetail, setUserDetail] = useState();
  const { studentInfo } = useAccount();
  const messageEndRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [searchName, setSearchName] = useState("");

  const handleSearchName = () => {
    if (searchName.trim() !== "") {
      navigate(`/detail?search=${encodeURIComponent(searchName)}`);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearchName();
    }
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "logout":
        localStorage.removeItem("userInfo");
        navigate("/");
        window.location.reload();
        break;
      default:
        navigate(key);
        break;
    }
  };

  const registeredId = studentInfo?.registeredStudentId;

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

  const userMenu = (
    <Menu onClick={handleMenuClick} className="w-44 custome-font">
      <Menu.Item key="/authorize">Tài khoản</Menu.Item>
      <Menu.Item key="/authorize/order">Đơn hàng</Menu.Item>
      {userInfo && userInfo.role === "Seller" && user?.sellerTO?.active === 1 ? (
        <Menu.SubMenu key="seller" title="Quản lý bán hàng">
          <Menu.Item key="/dashboard" className="custome-font-child">
            Giao dịch
          </Menu.Item>
          <Menu.Item key="/dashboard/wishlist" className="custome-font-child">
            Chờ tặng
          </Menu.Item>
          <Menu.Item key="/dashboard/product" className="custome-font-child">
            Sản phẩm
          </Menu.Item>
          <Menu.Item key="/dashboard/post" className="custome-font-child">
            Bài đăng
          </Menu.Item>
        </Menu.SubMenu>
      ) : userInfo && userInfo.role !== "Seller" ? (
        <Menu.Item key="/registerSeller" className="custome-font-child">
          Trở thành người bán
        </Menu.Item>
      ) : ''}
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);

    if (userInfo && userInfo.username) {
      if (userInfo.role === "Buyer") {
        dispatch(
          getAccountInfoThunk({
            registeredStudentId: userInfo.registeredStudentId,
          })
        )
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            const info = { ...userInfo, ...data };
            setUser(info); // Kết hợp userInfo và data thành một đối tượng mới
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
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
            const info = { ...userInfo, ...data };
            setUser(info); // Kết hợp userInfo và data thành một đối tượng mới
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      }
    }
  }, []);

  //chat

  const isEmptyChatDetail = !chatDetail || Object.keys(chatDetail).length === 0 ||
    Object.keys(chatDetail).every(roomId => chatDetail[roomId].length === 0);

  const handleChat = () => {
    setShowChat(prevShowChat => !prevShowChat)
  }

  useEffect(() => {
    if (studentInfo && studentInfo.registeredStudentId) {
      dispatch(viewChatRoom(studentInfo.registeredStudentId))
    }
  }, [dispatch]);

  const studentSendIdRef = registeredId
  let studentReceiveId = null
  let chatRoomId = null
  const contentRef = useRef("")
  const [transitionKey, setTransitionKey] = useState(Date.now());

  const formatDay = (dateTimeString) => {
    if (!dateTimeString) return '';
    return dateTimeString.substring(0, 10); // Lấy từ vị trí 0 đến 10
  };

  const truncateContent = (content, maxLength) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  const handleSelectChat = (studentSendId, studentReceiveId) => {
    dispatch(chatRoomStS({ studentSendId: studentSendId, studentReceiveId: studentReceiveId }));
    if (studentReceiveId !== userInfo.registeredStudentId) {
      dispatch(getAccountInfoThunk({ registeredStudentId: studentReceiveId }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUserDetail(data);
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    } else if (studentSendId !== userInfo.registeredStudentId) {
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

  return (
    <header className="top-0 sticky w-full min-w-[950px] z-50">
      <div className="flex justify-between items-center py-3 px-2 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]">
        <div className="text-center flex-grow font-semibold">
          Chào mừng đến với FU-Exchange, nơi bạn có thể mua, bán và trao đổi
          dành cho sinh viên FPT!
        </div>
      </div>
      <div className="py-3 pl-5 pr-20 flex justify-between bg-white border-b-2 border-b-slate-300 ">
        <NavLink to={"/"}>
          <img className="h-10" src="/images/logos/fu_Ex_logo.png" data-tooltip-id="my-tooltip-1" />
        </NavLink>
        <Tooltip
          id="my-tooltip-1"
          place="bottom"
          content="Trang chủ"
          style={{ backgroundColor: "#fd7014", color: "#fff" }}
        />

        <div className="flex justify-center items-center">
          <button
            className="border border-r-0 z-10 p-3 hover:bg-[var(--color-primary)] transition duration-150 rounded-l-[35px] bg-gray-300 filter-white"
            onClick={handleSearchName}
          >
            <img
              className="inset-0  w-full h-full object-contain"
              src="/images/icons/search_icon.svg"
            />
          </button>
          <input
            className="h-4 p-5 border border-l-0 rounded-r-[35px] w-[700px] focus:outline-none"
            placeholder="Tìm kiếm"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={handleKey}
          ></input>
        </div>

        <div className="flex justify-center items-center">
          <NavLink to={"/cart"}>
            <ShoppingCartOutlined className="mr-10 cursor-pointer text-3xl" data-tooltip-id="my-tooltip-3" />
          </NavLink>
          <Tooltip
            id="my-tooltip-3"
            place="bottom"
            content="Giỏ hàng"
            style={{ backgroundColor: "#fd7014", color: "#fff" }}
          />
          {!user && (
            <NavLink to={"/login"}>
              <button className="font-semibold">Đăng nhập</button>
            </NavLink>
          )}
          {user && (
            <Dropdown
              overlay={userMenu}
              trigger={["click"]}
              overlayClassName="custom-arrow custome-font"
              placement="bottomLeft"
              arrow
              getPopupContainer={(triggerNode) => triggerNode.parentNode}  // Gắn dropdown vào phần tử cha
            >
              <button className="flex justify-between items-center pl-5">
                <div className="flex justify-center items-center text-xl">
                  <div className="flex flex-col items-center">
                    <UserOutlined className="mr-4 text-3xl" />
                  </div>
                  {(user && user.sellerTO
                    ? user.sellerTO.student.firstName + " " + user.sellerTO.student.lastName
                    : "") || (user ? user.student?.firstName + " " + user.student?.lastName : "")}
                </div>
              </button>
            </Dropdown>
          )}
          {user && (
            <div>
              <div onClick={handleChat}>
                <MessageOutlined className="ml-10 cursor-pointer text-xl" data-tooltip-id="my-tooltip-2" />
              </div>
              <Tooltip
                id="my-tooltip-2"
                place="bottom"
                content="Trò chuyện"
                style={{ backgroundColor: "#fd7014", color: "#fff" }}
              />
            </div>
          )}
        </div>
      </div>
      <CSSTransition
        key={transitionKey}
        in={showChat}
        timeout={300}
        classNames="boxchat"
        unmountOnExit
      >
        <div className="fixed bottom-0 right-2 left-[45%] top-80 bg-white z-10 rounded-t-md shadow-[0_0_10px_1px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-center py-2 px-4 text-2xl text-[var(--color-primary)] border-b-2 border-b-slate-300">
            <div className="font-semibold">Chat</div>
            <button onClick={() => setShowChat(!showChat)}><ShrinkOutlined /></button>
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
                                      <div className="text-base font-semibold">
                                        {truncateContent(
                                          (room.chatMessage[0].studentSendId === registeredId)
                                            ? `${user?.[room.chatMessage[0].studentReceiveId]?.student?.firstName || ''} ${user?.[room.chatMessage[0].studentReceiveId]?.student?.lastName || ''}`
                                            : `${user?.[room.chatMessage[0].studentSendId]?.student?.firstName || ''} ${user?.[room.chatMessage[0].studentSendId]?.student?.lastName || ''}`,
                                          8
                                        )}
                                      </div>
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
    </header>
  );
};

export default Header;
