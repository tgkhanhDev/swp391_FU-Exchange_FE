import React, { useState, useRef, useEffect } from 'react'
import { Input, Select } from "antd";
import { NavLink } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { registerSellerThunk } from '../../../store/userManagement/thunk';
import { useAppDispatch } from "../../../store";
import './styles.css'

export const RegisterSeller = () => {

  const mssvRef = useRef("");
  const pwdRef = useRef("");
  const bankNumRef = useRef("");
  const bankNameRef = useRef("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Lấy chuỗi JSON từ localStorage
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const userObject = JSON.parse(userData);
      // Gán giá trị registeredStudentId cho mssvRef.current
      if (userObject.registeredStudentId) {
        mssvRef.current = userObject.registeredStudentId;
      }
    }
  }, []);

  const options = [
    { value: 'VIETCAPITALBANK', label: 'VIETCAPITALBANK' },
    { value: 'SCB', label: 'SCB' },
    { value: 'NCB', label: 'NCB' },
    { value: 'SacomBank', label: 'SacomBank' },
    { value: 'EximBank', label: 'EximBank' },
    { value: 'MSBANK', label: 'MSBANK' },
    { value: 'NamABank', label: 'NamABank' },
    { value: 'Vietinbank', label: 'VietinBank' },
    { value: 'VCB', label: 'VCB' },
    { value: 'HDBank', label: 'HDBank' },
    { value: 'Dong A', label: 'Dong A' },
    { value: 'TPBank', label: 'TPBank' },
    { value: 'OceanBank', label: 'OceanBank' },
    { value: 'BIDV', label: 'BIDV' },
    { value: 'Techcombank', label: 'Techcombank' },
    { value: 'VPBank', label: 'VPBank' },
    { value: 'Agribank', label: 'Agribank' },
    { value: 'MBBank', label: 'MBBank' },
    { value: 'ACB', label: 'ACB' },
    { value: 'OCB', label: 'OCB' },
    { value: 'IVB', label: 'IVB' },
    { value: 'SHB', label: 'SHB' },
  ];

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
          <div className='font-semibold text-[var(--color-primary)] text-5xl'>Đăng kí trở thành người bán hàng</div>
        </div>
        <div className='w-[70vw] bg-white p-5 rounded-3xl '>
          {/*Tiêu đề*/}
          <div className='flex items-center'>
            <div className='w-6 h-6 bg-[var(--color-primary)] rounded-full mr-2'></div>
            <div className='text-[var(--color-primary)] font-medium text-3xl'>Bạn muốn trở thành người bán hàng?</div>
          </div>
          <div className='text-[#666666] mt-3 mb-7'>
            Chỉ cần điền các thông tin bên dưới, và bạn sẽ được nâng lên tầm cao mới! 😎🗿
          </div>

          {/*MSSV */}

          <div className='mb-6'>
            <label className='text-[#9f9f9f] mb-2'>Tên ngân hàng</label>
            <Select
              defaultValue="Ngân hàng"
              className="custom-select"
              options={options}
              onChange={(selectedOption) => {
                bankNameRef.current = selectedOption;
                console.log(bankNameRef.current);
              }}
            />
          </div>

          {/*className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 border mt-2'*/}

          {/*CCCD xác nhận*/}
          <div className='mb-6'>
            <label className='text-[#9f9f9f] mb-2' htmlFor="CCCD">Số tài khoản ngân hàng</label>
            <Input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2' type="text"
              onChange={(e) => {
                bankNumRef.current = e.target.value;
                console.log(bankNumRef.current);
              }}
            >
            </Input>
          </div>
          {/*Input password mới*/}
          <div className='mb-6'>
            <label className='text-[#9f9f9f] mb-2'>Mật khẩu mới</label>
            <Input.Password className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2'
              onChange={(e) => {
                pwdRef.current = e.target.value;
                console.log(pwdRef.current);
              }}
            ></Input.Password >
          </div>

          {/*Nút đăng kí*/}
          <div>
            <button className='bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]'
              onClick={() =>
                dispatch(
                  registerSellerThunk({
                    registeredStudentId: mssvRef.current,
                    password: pwdRef.current,
                    bankingNumber: bankNumRef.current,
                    bankingName: bankNameRef.current,
                  })
                )
              }
            >Đăng kí
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RegisterSeller