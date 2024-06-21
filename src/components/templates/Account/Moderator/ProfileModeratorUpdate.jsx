import React, { useEffect, useState, useRef } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { Radio, Button, DatePicker } from "antd";
import { useAppDispatch } from "../../../../store";
import { getStaffInfoThunk } from "../../../../store/userManagement/thunk";
import { updateMProfileThunk } from "../../../../store/accountManager/thunk";
import { format } from 'date-fns';
import dayjs from 'dayjs';

export const ProfileModeratorUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { staffInfor } = useAccount();
  const [userInfo, setUserInfo] = useState(null);

  // Initialize state with staffInfor values
  const [firstName, setFirstName] = useState(staffInfor?.firstName || "");
  const [lastName, setLastName] = useState(staffInfor?.lastName || "");
  const [identityCard, setIdentityCard] = useState(staffInfor?.identityCard || "");
  const [phoneNumber, setPhoneNumber] = useState(staffInfor?.phoneNumber || "");
  const [address, setAddress] = useState(staffInfor?.address || "");
  const [gender, setGender] = useState(staffInfor?.gender || "");
  const [selectedDate, setSelectedDate] = useState(staffInfor?.dob ? new Date(staffInfor.dob) : null);

  // Initialize refs with staffInfor values
  const staffIdRef = useRef(staffInfor?.staffId || "");
  const firstNameRef = useRef(staffInfor?.firstName || "");
  const lastNameRef = useRef(staffInfor?.lastName || "");
  const identityCardRef = useRef(staffInfor?.identityCard || "");
  const addressRef = useRef(staffInfor?.address || "");
  const phoneNumberRef = useRef(staffInfor?.phoneNumber || "");
  const dobRef = useRef(staffInfor?.dob || "");

  const handleDateChange = (date) => {
    const newDate = date ? date.toDate() : null;
    setSelectedDate(newDate);
    dobRef.current = newDate ? format(newDate, 'yyyy-MM-dd') : "";
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (!staffInfor) {
      navigate('/');
    } else if (staffInfor.role !== "Moderator") {
      navigate('/admin');
    }
  }, [staffInfor, navigate]);

  useEffect(() => {
    if (staffInfor) {
      dispatch(getStaffInfoThunk(staffInfor.staffId))
        .then((action) => {
          const { payload } = action;
          setUserInfo(payload);
          // Initialize state with fetched data
          if (payload) {
            setFirstName(payload.firstName || "");
            setLastName(payload.lastName || "");
            setIdentityCard(payload.identityCard || "");
            setAddress(payload.address || "");
            setPhoneNumber(payload.phoneNumber || "");
            setGender(payload.gender || "");
            setSelectedDate(payload.dob ? new Date(payload.dob) : null);

            // Update refs if the user has not changed the input fields
            if (!firstNameRef.current) firstNameRef.current = payload.firstName || "";
            if (!lastNameRef.current) lastNameRef.current = payload.lastName || "";
            if (!identityCardRef.current) identityCardRef.current = payload.identityCard || "";
            if (!addressRef.current) addressRef.current = payload.address || "";
            if (!phoneNumberRef.current) phoneNumberRef.current = payload.phoneNumber || "";
            if (!dobRef.current) dobRef.current = payload.dob || "";
          }
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch, staffInfor]);

  const handleUpdate = () => {
    dispatch(
      updateMProfileThunk({
        staffId: staffIdRef.current,
        firstName: firstNameRef.current,
        lastName: lastNameRef.current,
        gender: gender,
        identityCard: identityCardRef.current,
        address: addressRef.current,
        phoneNumber: phoneNumberRef.current,
        dob: dobRef.current,
      })
    );
  };

  return (
    <div>
      <div className="text-4xl mt-4 font-bold text-center">Chỉnh sửa</div>
      <div className='py-10 pl-10 pr-6'>
        <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0]'>
          <div>
            <label className='font-semibold'>Họ</label>
            <input
              className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white'
              placeholder={firstName}
              defaultValue={staffInfor?.firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                firstNameRef.current = e.target.value;
              }}
            />
          </div>
          <div>
            <label className='font-semibold'>Tên</label>
            <input
              className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white'
              placeholder={lastName}
              defaultValue={staffInfor?.lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                lastNameRef.current = e.target.value;
              }}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
          <div>
            <label className='font-semibold'>Số CCCD/CMND</label>
            <input
              className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white'
              placeholder={identityCard}
              defaultValue={staffInfor?.identityCard}
              onChange={(e) => {
                setIdentityCard(e.target.value);
                identityCardRef.current = e.target.value;
              }}
            />
          </div>
          <div>
            <label className='font-semibold'>Số điện thoại</label>
            <input
              className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white'
              placeholder={phoneNumber}
              defaultValue={staffInfor?.phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                phoneNumberRef.current = e.target.value;
              }}
            />
          </div>
        </div>

        <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
          <div>
            <label className='font-semibold'>Địa chỉ cụ thể (Số nhà, tên đường)</label>
            <input
              className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white'
              placeholder={address}
              defaultValue={staffInfor?.address}
              onChange={(e) => {
                setAddress(e.target.value);
                addressRef.current = e.target.value;
              }}
            />
          </div>
        </div>

        <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
          <div>
            <label className='font-semibold mr-40'>Giới tính</label>
            <Radio.Group
              onChange={handleGenderChange}
              value={gender}
            >
              <Radio value='Nam'>Nam</Radio>
              <Radio value='Nữ'>Nữ</Radio>
              <Radio value='Khác'>Khác</Radio>
            </Radio.Group>
          </div>
          <div className="mt-8">
            <label className="font-semibold mr-20">Ngày tháng năm sinh</label>
            <DatePicker
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={handleDateChange}
              className="border-slate-400 w-60 focus:outline-none border px-4 h-10 rounded-md bg-white"
              placeholder="Chọn ngày tháng năm sinh"
            />
          </div>
        </div>
        <div className="flex justify-end my-5">
          <div className="flex space-x-4">
            <NavLink to={'/moderator/profile'}>
              <Button className="text-base font-semibold rounded-sm flex justify-center items-center px-2 py-5">
                Trở về
              </Button>
            </NavLink>
            <Button
              type="primary"
              className="text-base font-semibold rounded-sm flex justify-center items-center px-2 py-5"
              onClick={handleUpdate}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModeratorUpdate;
