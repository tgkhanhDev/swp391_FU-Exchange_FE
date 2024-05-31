import React, { useState } from 'react'
import { Button, Input } from "antd";
import { NavLink } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';

export const RegisterTemplate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)

  const checked = () => {
    setIsChecked(true);
    setIsRegistered(true);
  }

  return (
    <div><header className='bg-[var(--color-bg-hightlight)] text-[#f6f6f6] w-full min-w-[950px] py-3 px-5'>
      <NavLink to={"/login"}>
        <div className="hover:opacity-80 inline-block">
          <div className="text-lg flex justify-center"><ArrowLeftOutlined className="text-xl mr-2" />Trở về</div>
        </div>
      </NavLink>
    </header>
      <main className='flex flex-col justify-center items-center'>
        <div className='text-center mt-4 mb-8'>
          <div className='font-semibold text-[var(--color-primary)] text-5xl'>Đăng kí</div>
        </div>
        <div className='w-[70vw] bg-white p-5 rounded-3xl '>
          {/*Tiêu đề*/}
          <div className='flex items-center'>
            <div className='w-6 h-6 bg-[var(--color-primary)] rounded-full mr-2'></div>
            <div className='text-[var(--color-primary)] font-medium text-3xl'>Đây có phải lần đầu bạn đăng nhập?</div>
          </div>
          <div className='text-[#666666] mt-3 mb-7'>
            Chào mừng bạn đến với thế giới rộng lớn của FU-Exchange! Chỉ cần điền các thông tin bên dưới, và bạn sẽ sẵn sàng khám phá ngay thôi! 😉
          </div>

          {/*MSSV */}
          <form>
            <div className='mb-6'>
              <label className='text-[#9f9f9f] mb-2' htmlFor="MSSV">MSSV</label>
              <Input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2' type="text" id="MSSV" name="MSSV"></Input>
            </div>

            {/*CCCD xác nhận*/}
            <div className='mb-6'>
              <label className='text-[#9f9f9f] mb-2' htmlFor="CCCD">Số CCCD/CMND</label>
              <Input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2' type="text" id="CCCD" name="CCCD"></Input>
            </div>
            {!isRegistered && (
              <button className="bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]" onClick={checked}>Kiểm tra</button>
            )}
          </form>

          {isChecked && (
            <div>
              {/*Input password mới*/}
              <div className='mb-6'>
                <label className='text-[#9f9f9f] mb-2'>Mật khẩu mới</label>
                <Input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2' type="password"></Input>
              </div>

              {/*confirm password*/}
              <div className='mb-6'>
                <label className='text-[#9f9f9f] mb-2'>Xác nhận mật khẩu</label>
                <Input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2' type="password"></Input>
              </div>

              {/*Nút đăng kí*/}
              <div>
                <NavLink to={"/authorize"}>
                  <button className='bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]'>Đăng kí</button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default RegisterTemplate