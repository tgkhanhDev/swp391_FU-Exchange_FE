import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const LoginTemplate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)

  const checked = () => {
    setIsChecked(true);
    setIsRegistered(true);
  }
  return (
    <div>
      <header className='bg-[var(--color-bg-hightlight)] text-[#f6f6f6] w-full min-w-[950px] py-3 px-5 flex justify-between items-center'>
        <NavLink to={"/"}>
          <div className='inline-flex hover:opacity-80'>
            <img src="/images/icons/left_arrow.svg" className='h-6 w-6 mr-2'></img>
            <h1 className='justify-center items-center'>Trở về</h1>
          </div>
        </NavLink>
        <NavLink to={"/register"}>
          <div className='inline-flex hover:opacity-80'>
            <img src="/images/icons/question_icon.svg" className='h-6 w-6 mr-2'></img>
            <h1 className='justify-center items-center'>Lần đầu đăng nhập? Ấn vào đây</h1>
          </div>
        </NavLink>
      </header>
      <main className='flex justify-center items-center h-[92vh]'>
        <div className='grid grid-flow-col grid-cols-2 justify-center items-center gap-20 p-16 bg-white w-[80%] rounded-2xl'>
          <div>
            <div className='text-center text-3xl mb-6 text-[var(--color-primary)] font-semibold'>Đăng nhập</div>
            <form>
              <div className='mb-6 '>
                <label className='text-[#9f9f9f] mb-2'>MSSV (Mã số sinh viên)</label>
                <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border' type="text"></input>
              </div>
              {!isRegistered && (
                <button className="bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]" onClick={checked}>Kiểm tra</button>
              )}
            </form>


            {/*Mật khẩu */}
            {isChecked && (
              <form>
                <div className='mb-6 '>
                  <label className='text-[#9f9f9f] mb-2'>Mật khẩu</label>
                  <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border' type="password"></input>
                </div>
                <button className="bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]">Kiểm tra</button>
              </form>
            )}
          </div>
          {/*<div>
            <div className='mb-6 px-24'>
              <div className='text-[#9f9f9f] mb-2'>Mật khẩu</div>
              <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border'></input>
              <button >Submit</button>
            </div>
  </div>*/}
          <div>
            <NavLink to={"/"}>
              <div className='flex justify-center items-center'>
                <img src='/images/logos/fu_Ex_logo.png' className='w-[20vw]' />
              </div>
            </NavLink>
            <div className='mt-10 px-12 text-center text-[#666666]'>Secure Login with reCAPTCHA subject to
              Google <u className='text-[var(--color-primary)]'>Terms</u> & <u className='text-[var(--color-primary)]'>Privacy</u></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginTemplate