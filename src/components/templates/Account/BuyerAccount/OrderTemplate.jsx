import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { Select, Popover } from "antd"
import { UserOutlined, ShrinkOutlined, EllipsisOutlined, SendOutlined, PhoneOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './styles.css'
import { CSSTransition } from 'react-transition-group'; {/*Làm xong đéo hiểu gì */ }

export const OrderTemplate = () => {

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [showBoxChat, setShowBoxChat] = useState(false);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (showBoxChat && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showBoxChat]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  })

  const options = [
    { value: 'Tất cả', label: 'Tất cả' },
    { value: 'Cao đến thấp', label: 'Cao đến thấp' },
    { value: 'Thấp đến cao', label: 'Thấp đến cao' },
  ];

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

          {/*Đơn hàng */}
          <div className='bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300'>
            {/*Thông tin cơ bản đơn hàng */}
            <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
              <div className="">
                <div className="text-lg font-bold">Ngày đặt đơn: </div>
                <div>11/09/2001</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Tổng đơn: </div>
                <div>23,000 VNĐ</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Trạng thái đơn hàng: </div>
                <div>Hoàn thành</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Payment:</div>
                <div>Not yet</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Mã đơn: </div>
                <div>ABC</div>
              </div>

            </div>

            {/*Chi tiết đơn hàng */}
            <div className="py-5 px-5 flex flex-row gap-4">
              {/*Hình ảnh */}
              <div className='h-36 w-36 border-2'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2"></img>
              </div>

              <div className="w-[40%]">
                <div className="pb-4">
                  <div className="font-semibold text-lg">Iphone 11</div>
                  <div>Màu sắc: Xanh ngọc</div>
                  <div>Số lượng: 1</div>
                </div>

                <div className="flex justify-between">
                  <button className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold">Mua lại</button>
                  <button className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold" onClick={() => setShowBoxChat(!showBoxChat)}>Liên hệ người bán</button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">

                <NavLink to={'/review'}>
                  <div className="text-[var(--color-primary)] underline">Đánh giá ngay</div> {/*Hoặc xem đánh giá nếu đã đánh giá sản phẩm */}
                </NavLink>
                <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: 23,000 VNĐ</div>
              </div>
            </div>

          </div>

          <div className='bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300'>
            {/*Thông tin cơ bản đơn hàng */}
            <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
              <div className="">
                <div className="text-lg font-bold">Ngày đặt đơn: </div>
                <div>11/09/2001</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Tổng đơn: </div>
                <div>23,000 VNĐ</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Trạng thái đơn hàng: </div>
                <div>Hoàn thành</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Payment:</div>
                <div>Not yet</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Mã đơn: </div>
                <div>ABC</div>
              </div>

            </div>

            {/*Chi tiết đơn hàng */}
            <div className="py-5 px-5 flex flex-row gap-4">
              {/*Hình ảnh */}
              <div className='h-36 w-36 border-2'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2"></img>
              </div>

              <div className="w-[40%]">
                <div className="pb-4">
                  <div className="font-semibold text-lg">Iphone 11</div>
                  <div>Màu sắc: Xanh ngọc</div>
                  <div>Số lượng: 1</div>
                </div>

                <div className="flex justify-between">
                  <button className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold">Mua lại</button>
                  <button className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold" onClick={() => setShowBoxChat(!showBoxChat)}>Liên hệ người bán</button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">

                <NavLink to={'/review'}>
                  <div className="text-[var(--color-primary)] underline">Đánh giá ngay</div> {/*Hoặc xem đánh giá nếu đã đánh giá sản phẩm */}
                </NavLink>
                <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: 23,000 VNĐ</div>
              </div>
            </div>

          </div>

          <div className='bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300'>
            {/*Thông tin cơ bản đơn hàng */}
            <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
              <div className="">
                <div className="text-lg font-bold">Ngày đặt đơn: </div>
                <div>11/09/2001</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Tổng đơn: </div>
                <div>23,000 VNĐ</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Trạng thái đơn hàng: </div>
                <div>Hoàn thành</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Payment:</div>
                <div>Not yet</div>
              </div>

              <div className="">
                <div className="text-lg font-bold">Mã đơn: </div>
                <div>ABC</div>
              </div>

            </div>

            {/*Chi tiết đơn hàng */}
            <div className="py-5 px-5 flex flex-row gap-4">
              {/*Hình ảnh */}
              <div className='h-36 w-36 border-2'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2"></img>
              </div>

              <div className="w-[40%]">
                <div className="pb-4">
                  <div className="font-semibold text-lg">Iphone 11</div>
                  <div>Màu sắc: Xanh ngọc</div>
                  <div>Số lượng: 1</div>
                </div>

                <div className="flex justify-between">
                  <button className="px-14 py-3 bg-[var(--color-primary)] text-white font-bold">Mua lại</button>
                  <button className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold" onClick={() => setShowBoxChat(!showBoxChat)}>Liên hệ người bán</button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">

                <NavLink to={'/review'}>
                  <div className="text-[var(--color-primary)] underline">Đánh giá ngay</div> {/*Hoặc xem đánh giá nếu đã đánh giá sản phẩm */}
                </NavLink>
                <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: 23,000 VNĐ</div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/*Chat box */}
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
                <Popover placement="bottomRight" content={<div><ExclamationCircleOutlined className="mr-1"/>Chức năng đang trong giai đoạn phát triển</div>}>
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
  )
}


export default OrderTemplate