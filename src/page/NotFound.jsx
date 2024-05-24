import React from 'react'
import MyComponent from './location'
import { Radio } from "antd";

export const NotFound = () => {
  return (
    <div>
      {/*<div className='flex flex-col justify-center items-center bg-gradient-to-b from-[#EFF2F6] to-[#393E46] fixed top-0 left-0 w-full h-full text-white space-y-5'>
      <div className='font-bold text-[300px] h-[370px]'>
        404
      </div>
      <div className='text-4xl font-bold'>Oops! This Page is Not Found!</div>
      <div className='text-xl font-normal'>The requested page does not exist!</div>
      <button className='px-14 py-3 bg-[#E9ECEF] text-[#232D42] text-base font-semibold rounded-md hover:bg-opacity-85'>Back to Home</button>
  </div>*/}
      {/*Header trở về*/}
      <main className='mt-[120px] py-10'>
        <div className='grid grid-cols-[auto_1fr] '>
          <nav className='w-60'>
            {/*My Profile */}
            <div className='bg-slate-300 w-full rounded-r-[30px] h-16 mb-2 grid grid-cols-[1fr_auto] cursor-pointer duration-500 hover:bg-slate-200'>
              <div className='flex justify-center items-center pl-5'>
                <img src='/images/icons/user_icon.svg' className='w-5 h-5'></img>
                <div className='ml-2 text-xl'>Tài khoản</div>
              </div>
              <div className='flex items-center justify-end pr-5'>
                <img src='/images/icons/triangle_pointer_icon.svg' className='w-5 h-5'></img>
              </div>
            </div>
            {/*My order*/}
            <div className='rounded-r-[30px] w-52 h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer hover:bg-slate-200 hover:w-full duration-500'>
              <div className='flex justify-center items-center pl-5'>
                <img src='/images/icons/history.svg' className='w-5 h-5'></img>
                <div className='ml-2 text-xl'>Đơn hàng</div>
              </div>
              <div className='flex items-center justify-end pr-5'>
                <img src='/images/icons/triangle_pointer_icon.svg' className='w-5 h-5'></img>
              </div>
            </div>
            {/*Transaction History*/}
            <div className='rounded-r-[30px] w-52 h-16 grid grid-cols-[1fr_auto] items-center mb-2 cursor-pointer hover:bg-slate-200   hover:w-full duration-500'>
              <div className='flex justify-center items-center pl-5'>
                <img src='/images/icons/transaction.svg' className='w-5 h-5'></img>
                <div className='ml-2 text-xl'>Giao dịch</div>
              </div>
              <div className='flex items-center justify-end pr-5'>
                <img src='/images/icons/triangle_pointer_icon.svg' className='w-5 h-5 justify-end'></img>
              </div>
            </div>
          </nav>
          <div className='pl-14'>
            <div className='font-bold text-4xl'>Tài khoản của tôi</div>
            <div className='py-10 pl-10 pr-6'>
              {/*Điền tên */}
              <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0]'>
                {/*First Name */}
                <div>
                  <label className='text-xl font-semibold'>Họ</label>
                  <input type='text' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
                </div>
                {/*Last Name*/}
                <div>
                  <label className='text-xl font-semibold'>Tên</label>
                  <input type='text' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
                </div>
              </div>

              {/*SĐT + ID num */}
              <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
                {/*ID Number */}
                <div>
                  <label className='text-xl font-semibold'>Số CCCD/CMND</label>
                  <input type='text' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
                </div>
                {/*Phone Number*/}
                <div>
                  <label className='text-xl font-semibold'>Số điện thoại</label>
                  <input type='tel' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
                </div>
              </div>

              {/*Location */}
              <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
                <MyComponent />
                {/*Địa chỉ chi tiết (Tên đường, số nhà) */}
                <div className='mt-8'>
                  <label className='text-xl font-semibold' htmlFor='name'>Địa chỉ cụ thể (Số nhà, tên đường)</label>
                  <input type='text' id='name' className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2'></input>
                </div>
              </div>
              <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
                <div>
                  <label className='text-xl font-semibold'>Giới tính</label>
                  <Radio.Group>
                    <Radio value={1}>Nam</Radio>
                    <Radio value={2}>Nữ</Radio>
                    <Radio value={3}>Khác</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFound