import React, { useRef } from "react";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { getLoginStaffThunk } from "../../../store/userManagement/thunk";
import { useAccount } from "../../../hooks/useAccount";
import { toast } from "react-toastify";

export const LoginStaff = () => {

  const dispatch = useAppDispatch();
  const phoneNumRef = useRef("");
  const pwdRef = useRef("");
  const { isAuthorize } = useAccount();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        getLoginStaffThunk({ numberPhone: phoneNumRef.current, password: pwdRef.current })
      );
      if (isAuthorize) window.location.href = "/admin";
    } catch (error) {
      // Handle the error here
      console.error("Error in handleSignIn:", error);
      // You can also show an error message to the user
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <div><header className='bg-[var(--color-bg-hightlight)] text-[#f6f6f6] w-full min-w-[950px] py-3 px-5'>
      <NavLink to={"/"}>
        <div className="hover:opacity-80 inline-block">
          <div className="text-lg flex justify-center"><ArrowLeftOutlined className="text-xl mr-2" />Trở về</div>
        </div>
      </NavLink>
    </header>
      <main className='flex flex-col justify-center items-center'>
        <div className='text-center mt-4 mb-8'>
          <div className='font-semibold text-[var(--color-primary)] text-5xl'>Đăng nhập của Nhân Viên</div>
        </div>
        <div className='w-[70vw] bg-white p-5 rounded-3xl '>
          {/*Tiêu đề*/}
          <div className='flex items-center'>
            <div className='w-6 h-6 bg-[var(--color-primary)] rounded-full mr-2'></div>
            <div className='text-[var(--color-primary)] font-medium text-3xl'>Bạn muốn trở thành người Nhân viên của tháng?</div>
          </div>
          <div className='text-[#666666] mt-3 mb-7'>
            Vậy thì hãy điền các thông tin bên dưới, và bạn sẽ được gia nhập vào thế giới tư bản! 🥰🥳
          </div>
          <form>
            <div className='mb-6'>
              <label className='text-[#9f9f9f] mb-2' htmlFor="CCCD">Số điện thoại</label>
              <Input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2'
                onChange={(e) => {
                  phoneNumRef.current = e.target.value;
                }}
              >
              </Input>
            </div>
            {/*Input password mới*/}
            <div className='mb-6'>
              <label className='text-[#9f9f9f] mb-2'>Mật khẩu</label>
              <Input.Password className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2'
                onChange={(e) => (pwdRef.current = e.target.value)}
              >
              </Input.Password >
            </div>

            {/*Nút đăng nhập*/}
            <button className='bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]'
              onClick={handleSignIn}
            >Đăng Nhập
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default LoginStaff;
