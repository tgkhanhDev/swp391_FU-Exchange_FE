import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import MyComponent from './MyComponent'
import { Radio } from "antd"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Test.css";

export const ProfileTemplate = () => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Tài khoản của tôi - Chỉnh sửa</div>
          <div className='py-10 pl-10 pr-6'>
            {/*Điền tên */}
            <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0]'>
              {/*First Name */}
              <div>
                <label className='font-semibold'>Họ</label>
                <input type='text' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
              </div>
              {/*Last Name*/}
              <div>
                <label className='font-semibold'>Tên</label>
                <input type='text' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
              </div>
            </div>

            {/*SĐT + ID num */}
            <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              {/*ID Number */}
              <div>
                <label className='font-semibold'>Số CCCD/CMND</label>
                <input type='text' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
              </div>
              {/*Phone Number*/}
              <div>
                <label className='font-semibold'>Số điện thoại</label>
                <input type='tel' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
              </div>
            </div>

            {/*Location */}
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              {/*Địa chỉ chi tiết (Tên đường, số nhà) */}
              <div>
                <label className='font-semibold' htmlFor='name'>Địa chỉ cụ thể (Số nhà, tên đường)</label>
                <input type='text' id='name' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
              </div>
              <MyComponent />
            </div>
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              <div>
                <label className='font-semibold mr-40'>Giới tính</label>
                <Radio.Group>
                  <Radio value={1} className='mr-20'>Nam</Radio>
                  <Radio value={2} className='mr-20'>Nữ</Radio>
                  <Radio value={3} className='mr-20'>Khác</Radio>
                </Radio.Group>
              </div>
              <div className='mt-8'>
                <label className='font-semibold mr-40'>Ngày tháng năm sinh</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat={"dd/MM/yyyy"}
                  className="p-2 border-slate-400 focus:outline-none border rounded-md"
                />
              </div>
            </div>
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              <label className='font-semibold mr-20'>Mật khẩu</label>
              <input className="mt-2 border-slate-400 px-4 border focus:outline-none h-10 rounded-md bg-white" type="password" value="abcxyz" disabled></input>
              <button className="ml-5 w-32 h-9 px-1 py-1 bg-[var(--color-primary)] text-white rounded-md hover:opacity-90 duration-200">Thay đổi</button>
            </div>
            <div className='mt-5 flex justify-end pr-3'>
              <button className="w-24 h-12 px-1 py-1 bg-white text-[var(--color-primary)] rounded-md border border-[var(--color-primary)] hover:border-2 text-lg">Hủy</button>
              <button className="ml-5 w-64 h-12 px-1 py-1 bg-[var(--color-primary)] text-white rounded-md hover:opacity-80 duration-200 text-lg">Lưu thay đổi</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


export default ProfileTemplate