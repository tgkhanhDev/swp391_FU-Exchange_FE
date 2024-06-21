import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { Radio, Button } from "antd";
import { useAppDispatch } from "../../../../store";
import {
  getStaffInfoThunk,
} from "../../../../store/userManagement/thunk";
import { format } from 'date-fns';

export const ProfileTemplateAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { staffInfor } = useAccount();
  const [userInfo, setUserInfo] = useState();
  const formatDay = (dayString) => {
    if (!dayString) return '';
    const day = new Date(dayString);
    return format(day, 'dd-MM-yyyy'); // Định dạng theo yêu cầu 'dd-MM-yyyy HH:mm:ss'
  };

  useEffect(() => {
    if (!staffInfor) {
      navigate('/');
    } else if (staffInfor.role !== "Administrator") {
      navigate('/moderator');
    }
  });

  useEffect(() => {

    if (staffInfor) {
      dispatch(getStaffInfoThunk(
        staffInfor.staffId
      ))
        .then((action) => {
          const { payload } = action;
          setUserInfo(payload);
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  return (
    <div>
      <div className="text-4xl mt-4 font-bold text-center">Tài khoản</div>
      <div className='py-10 pl-10 pr-6'>
        <div className='pb-10 border-b-2 border-b-[#d0d0d0]'>
          <label className='font-semibold'>Họ và Tên</label>
          <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' defaultValue={userInfo?.staffName} readOnly />
        </div>

        <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
          <div>
            <label className='font-semibold'>Số CCCD/CMND</label>
            <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' defaultValue={userInfo?.identityCard} readOnly />
          </div>
          <div>
            <label className='font-semibold'>Số điện thoại</label>
            <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' defaultValue={userInfo?.phoneNumber} readOnly />
          </div>
        </div>

        <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
          <div>
            <label className='font-semibold'>Địa chỉ cụ thể (Số nhà, tên đường)</label>
            <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' defaultValue={userInfo?.address} readOnly />
          </div>
        </div>

        <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
          <div>
            <label className='font-semibold mr-40'>Giới tính</label>
            <Radio.Group value={userInfo?.gender}>
              <Radio value='Nam'>Nam</Radio>
              <Radio value='Nữ'>Nữ</Radio>
              <Radio value='Khác'>Khác</Radio>
            </Radio.Group>
          </div>
          <div className='mt-8'>
            <label className='font-semibold mr-20'>Ngày tháng năm sinh</label>
            <input className='border-slate-400 focus:outline-none border px-4 h-10 rounded-md bg-white' defaultValue={formatDay(userInfo?.dob)} readOnly />
          </div>
          <div className='mt-8'>
            <label className='font-semibold mr-20'>Mật khẩu</label>
            <input className='border-slate-400 focus:outline-none border px-4 h-10 rounded-md bg-white' defaultValue={formatDay(userInfo?.dob)} readOnly />
          </div>
        </div>
        <div className="flex justify-end my-5">
          <NavLink to={'/admin/profile/update'}>
            <Button type="primary" className="text-base font-semibold rounded-sm flex justify-center items-center px-2 py-5">
              Thay đổi thông tin
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplateAdmin;
