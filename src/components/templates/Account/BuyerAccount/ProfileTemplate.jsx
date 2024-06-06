import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { Radio, Button, Modal, Form, Input } from "antd"
import { useAppDispatch } from "../../../../store";
import { getAccountInfoThunk } from "../../../../store/userManagement/thunk";

export const ProfileTemplate = () => {

  const [user, setUser] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo::: ", userInfo);
    setUser(userInfo);

    if (userInfo && userInfo.username) {
      dispatch(getAccountInfoThunk({ studentId: userInfo.username }))
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUser({...userInfo, ...data}); // Kết hợp userInfo và data thành một đối tượng mới
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Tài khoản của tôi</div>
          <div className='py-10 pl-10 pr-6'>
            {/*Điền tên */}
            <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0]'>
              {/*First Name */}
              <div>
                <label className='font-semibold'>Họ</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' disabled value={user?.firstName}></input>
              </div>
              {/*Last Name*/}
              <div>
                <label className='font-semibold'>Tên</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' disabled value={user?.lastName}></input>
              </div>
            </div>

            {/*SĐT + ID num */}
            <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              {/*ID Number */}
              <div>
                <label className='font-semibold'>Số CCCD/CMND</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' disabled value={user?.identityCard}></input>
              </div>
              {/*Phone Number*/}
              <div>
                <label className='font-semibold'>Số điện thoại</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' disabled value={user?.phoneNumber}></input>
              </div>
            </div>

            {/*Location */}
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              {/*Địa chỉ chi tiết (Tên đường, số nhà) */}
              <div>
                <label className='font-semibold' htmlFor='name'>Địa chỉ cụ thể (Số nhà, tên đường)</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' disabled value={user?.address}></input>
              </div>
            </div>
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              <div>
                <label className='font-semibold mr-40'>Giới tính</label>
                <Radio.Group value={user?.gender}>
                  <Radio value={'Nam'} className='mr-20' disabled>Nam</Radio>
                  <Radio value={'Nữ'} className='mr-20' disabled>Nữ</Radio>
                  <Radio value={'Khác'} className='mr-20' disabled>Khác</Radio>
                </Radio.Group>
              </div>
              <div className='mt-8'>
                <label className='font-semibold mr-20'>Ngày tháng năm sinh</label>
                <input className=" border-slate-400 focus:outline-none border px-4 h-10 rounded-md bg-white" disabled value={user?.dob}></input>
              </div>
            </div>
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              <label className='font-semibold mr-20'>Mật khẩu</label>
              <input className="mt-2 border-slate-400 px-4 border focus:outline-none h-10 rounded-md bg-white" type="password" value="abcxyz" disabled></input>

              {/*Modal Đổi mật khẩu */}
              <Button type="primary" className="ml-5 w-32 h-9 px-1 py-1 bg-[var(--color-primary)] text-white rounded-md" onClick={showModal}>Thay đổi</Button>

              <Modal title={<span className="text-2xl">Đổi Mật khẩu</span>} className='text-center ' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                  <Form.Item label='Nhập mật khẩu hiện tại'>
                    <Input.Password className="h-8 rounded-md px-4"></Input.Password>
                  </Form.Item>

                  <Form.Item label='Nhập mật khẩu mới'>
                    <Input.Password className="h-8 rounded-md px-4"></Input.Password>
                  </Form.Item>

                  <Form.Item label='Xác nhận mật khẩu mới'>
                    <Input.Password className="h-8 rounded-md px-4"></Input.Password>
                  </Form.Item>
                </Form>
              </Modal>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


export default ProfileTemplate