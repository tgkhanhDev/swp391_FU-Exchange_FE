import React from 'react'
import { NavLink } from 'react-router-dom'

export const RegisterTemplate = () => {
  return (
    <div><header className='bg-[var(--color-bg-hightlight)] text-[#f6f6f6] w-full min-w-[950px] py-3 px-5'>
      <NavLink to={"/login"}>
        <div className='inline-flex items-center hover:opacity-80'>
          <img src="/images/icons/left_arrow.svg" className='h-6 w-6 mr-2'></img>
          <h1 className='justify-center items-center'>Trở về</h1>
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

          {/*CCCD xác nhận*/}
          <div className='mb-6'>
            <div className='text-[#9f9f9f] mb-2'>Số CCCD/CMND</div>
            <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border'></input>
          </div>

          {/*Input password mới*/}
          <div className='mb-6'>
            <div className='text-[#9f9f9f] mb-2'>Mật khẩu mới</div>
            <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border'></input>
          </div>

          {/*confirm password*/}
          <div className='mb-6'>
            <div className='text-[#9f9f9f] mb-2'>Xác nhận mật khẩu</div>
            <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border'></input>
          </div>

          {/*Nút đăng kí*/}
          <div>
            <NavLink to={"/profile"}>
              <button className='bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]'>Đăng kí</button>
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RegisterTemplate