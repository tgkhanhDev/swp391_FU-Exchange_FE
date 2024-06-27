import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { Radio, Button, Modal, Form, Input, Select } from "antd"
import { useAppDispatch } from "../../../../store";
import { getAccountInfoThunk, updatePasswordThunk, getSellerInfoThunk, updateBankingThunk, updateDeliveryAddressThunk } from "../../../../store/userManagement/thunk";
import { format } from 'date-fns';

export const ProfileTemplate = () => {

  const formatDay = (dayString) => {
    if (!dayString) return '';
    const day = new Date(dayString);
    return format(day, 'dd-MM-yyyy'); // Định dạng theo yêu cầu 'dd-MM-yyyy HH:mm:ss'
  };

  const [user, setUser] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const idRef = useRef("");
  const pwdOldRef = useRef("");
  const pwdNewRef = useRef("");
  const pwdNewConfirmRef = useRef("");

  const sellIdRef = useRef("");
  const bankNumRef = useRef("");
  const bankNameRef = useRef("");

  const deliverAddressRef = useRef("");

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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate('/login');
      return; // Thêm return để ngăn việc tiếp tục thực thi đoạn mã
    }

    setUser(userInfo);

    if (userInfo.registeredStudentId) {
      idRef.current = userInfo.registeredStudentId;
    }

    if (userInfo && userInfo.username) {
      if (userInfo.role === "Buyer") {
        dispatch(getAccountInfoThunk({
          registeredStudentId: userInfo.registeredStudentId
        }))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            const info = { ...userInfo, ...data };
            setUser(info); // Kết hợp userInfo và data thành một đối tượng mới
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      }
      else {
        dispatch(getSellerInfoThunk({
          sellerTO: {
            RegisteredStudent: {
              Student: {
                studentId: userInfo.username
              }
            }
          }
        }))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            const info = { ...userInfo, ...data };
            setUser(info); // Kết hợp userInfo và data thành một đối tượng mới
            if (data && data.sellerId) {
              sellIdRef.current = data.sellerId;
            }
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      }
    }
  }, [dispatch]);

  const [isModalPassOpen, setIsModalPassOpen] = useState(false);

  const showPassModal = () => {
    setIsModalPassOpen(true);
  };

  const handlePassCancel = () => {
    setIsModalPassOpen(false);
  };

  const [isModalBankOpen, setIsModalBankOpen] = useState(false);

  const showBankModal = () => {
    setIsModalBankOpen(true);
  };

  const handleBankCancel = () => {
    setIsModalBankOpen(false);
  };

  const [isModalDeliverOpen, setIsModalDeliverOpen] = useState(false);

  const showDeliverModal = () => {
    setIsModalDeliverOpen(true);
  };

  const handleDeliverCancel = () => {
    setIsModalDeliverOpen(false);
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
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={(user && user.sellerTO ? user.sellerTO.student.firstName : '') || (user ? user.student?.firstName : '')}></input>
              </div>
              {/*Last Name*/}
              <div>
                <label className='font-semibold'>Tên</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={(user && user.sellerTO ? user.sellerTO.student.lastName : '') || (user ? user.student?.lastName : '')}></input>
              </div>
            </div>

            {/*SĐT + ID num */}
            <div className='grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              {/*ID Number */}
              <div>
                <label className='font-semibold'>Số CCCD/CMND</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={(user && user.sellerTO ? user.sellerTO.student.identityCard : '') || (user ? user.student?.identityCard : '')}></input>
              </div>
              {/*Phone Number*/}
              <div>
                <label className='font-semibold'>Số điện thoại</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={(user && user.sellerTO ? user.sellerTO.student.phoneNumber : '') || (user ? user.student?.phoneNumber : '')}></input>
              </div>
            </div>

            {/*Location */}
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              {/*Địa chỉ chi tiết (Tên đường, số nhà) */}
              <div>
                <label className='font-semibold' htmlFor='name'>Địa chỉ nhà</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={(user && user.sellerTO ? user.sellerTO.student.address : '') || (user ? user.student?.address : '')}></input>
              </div>

              <div className="mt-8">
                <label className='font-semibold' htmlFor='name'>Địa chỉ nhận hàng (Số nhà, tên đường)</label>
                <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={user.deliveryAddress ? user.deliveryAddress : 'Không có'}></input>
                <div className="mt-4 flex justify-end">
                  <Button type="primary" onClick={showDeliverModal}>Cập nhật địa chỉ nhận hàng</Button>
                </div>
              </div>
            </div>
            
            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              <div>
                <label className='font-semibold mr-40'>Giới tính</label>
                <Radio.Group value={(user && user.sellerTO ? user.sellerTO.student.gender : '') || (user ? user.student?.gender : '')}>
                  <Radio value={'Nam'} className='mr-20'>Nam</Radio>
                  <Radio value={'Nữ'} className='mr-20'>Nữ</Radio>
                  <Radio value={'Khác'} className='mr-20'>Khác</Radio>
                </Radio.Group>
              </div>
              <div className='mt-8'>
                <label className='font-semibold mr-20'>Ngày tháng năm sinh</label>
                <input className=" border-slate-400 focus:outline-none border px-4 h-10 rounded-md bg-white" readOnly defaultValue={(user && user.sellerTO ? formatDay(user.sellerTO.student.dob) : '') || (user ? formatDay(user.student?.dob) : '')}></input>
              </div>
            </div>

            {user.sellerTO && user.role === 'Seller' && user.sellerTO?.active !== 2 && (
              <div className="border-b-[#d0d0d0] mt-10 pb-10 border-b-2">
                <div className='grid grid-cols-2 gap-8'>
                  {/*First Name */}
                  <div>
                    <label className='font-semibold'>Tên ngân hàng</label>
                    <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={user.sellerTO ? user.sellerTO.bankingName : ''}></input>
                  </div>
                  {/*Last Name*/}
                  <div>
                    <label className='font-semibold'>Số tài khoản ngân hàng</label>
                    <input className='border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white' readOnly defaultValue={user ? user.sellerTO.bankingNumber : ''}></input>
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <Button type="primary" className="w-32 h-9 px-1 py-1 bg-[var(--color-primary)] items text-white rounded-md" onClick={showBankModal}>Thay đổi</Button>
                </div>
                <Modal title={<span className="text-2xl">Cập nhật tài khoản ngân hàng</span>} className='text-center ' open={isModalBankOpen} onOk={() =>
                  dispatch(
                    updateBankingThunk({
                      sellerId: sellIdRef.current,
                      bankingNumber: bankNumRef.current,
                      bankingName: bankNameRef.current,
                    })
                  )
                } onCancel={handleBankCancel}>
                  <Form>
                    <Form.Item>
                      <div className="grid grid-cols-2">
                        <span className="text-left">Chọn tên ngân hàng mới:</span>
                        <Select
                          className="text-left"
                          defaultValue="Ngân hàng"
                          options={options}
                          onChange={(selectedOption) => {
                            bankNameRef.current = selectedOption;
                          }}
                        />
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <div className="grid grid-cols-2">
                        <span className="text-left">Nhập mã số tài khoản ngân hàng mới:</span>
                        <Input
                          className="h-8 rounded-md px-4"
                          onChange={(e) => {
                            bankNumRef.current = e.target.value;
                          }}
                        />
                      </div>
                    </Form.Item>
                  </Form>
                </Modal>

              </div>
            )}

            <div className='pb-10 border-b-2 border-b-[#d0d0d0] mt-10'>
              <label className='font-semibold mr-12'>Mật khẩu</label>

              {/*Modal Đổi mật khẩu */}
              <Button type="primary" className="w-32 h-9 px-1 py-1 bg-[var(--color-primary)] text-white rounded-md" onClick={showPassModal}>Thay đổi</Button>

              <Modal title={<span className="text-2xl">Đổi Mật khẩu</span>} className='text-center ' open={isModalPassOpen} onOk={() => {
                dispatch(
                  updatePasswordThunk({
                    idWantUpdate: idRef.current,
                    oldPassword: pwdOldRef.current,
                    newPassword: pwdNewRef.current,
                    confirmNewPassword: pwdNewConfirmRef.current,
                  })
                );
              }} onCancel={handlePassCancel}>
                <Form>
                  <Form.Item>
                    <div className="grid grid-cols-2">
                      <span className="text-left">Nhập mật khẩu hiện tại:</span>
                      <Input.Password
                        className="h-8 rounded-md px-4"
                        onChange={(e) => {
                          pwdOldRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <div className="grid grid-cols-2">
                      <span className="text-left">Nhập mật khẩu mới:</span>
                      <Input.Password
                        className="h-8 rounded-md px-4"
                        onChange={(e) => {
                          pwdNewRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <div className="grid grid-cols-2">
                      <span className="text-left">Xác nhận mật khẩu mới:</span>
                      <Input.Password
                        className="h-8 rounded-md px-4"
                        onChange={(e) => {
                          pwdNewConfirmRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </Form.Item>
                </Form>
              </Modal>

            </div>

            <Modal title={<span className="text-2xl">Cập nhật địa chỉ nhận hàng</span>} open={isModalDeliverOpen} onOk={() => {
                dispatch(
                  updateDeliveryAddressThunk({
                    registeredStudentId: idRef.current,
                    deliveryAddress: deliverAddressRef.current,
                  })
                );
              }} onCancel={handleDeliverCancel}>
                <Form>
                  <Form.Item>
                    <div className="mt-2">
                      <div className="mb-2">Địa chỉ nhận hàng mới: </div>
                      <Input.TextArea
                        className="h-8 rounded-md px-4"
                        onChange={(e) => {
                          deliverAddressRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </Form.Item>
                </Form>
              </Modal>

          </div>
        </div>
      </main>
    </div>
  )
}


export default ProfileTemplate