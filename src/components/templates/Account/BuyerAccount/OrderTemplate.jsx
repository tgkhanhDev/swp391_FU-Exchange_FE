import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { Select } from "antd"
import './styles.css'

export const OrderTemplate = () => {

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
                  <button className="px-8 py-3 border-2 border-current bg-white text-[var(--color-primary)] font-bold">Liên hệ người bán</button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">
                <div className="text-[var(--color-primary)] underline">Đánh giá ngay</div> {/*Hoặc xem đánh giá nếu đã đánh giá sản phẩm */}
                <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: 23,000 VNĐ</div>
              </div>
            </div>

          </div>
          
        </div>
      </main>
    </div>
  )
}


export default OrderTemplate