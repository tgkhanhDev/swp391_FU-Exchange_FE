import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";

export const ManageCustomerAccount = () => {
  const navigate = useNavigate();
  const { staffInfor } = useAccount();

  useEffect(() => {
    if (!staffInfor) {
      navigate('/*');
    }
    else if (staffInfor.role !== "Administrator") {
      navigate('/moderator');
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-full gap-x-20">
      <button className="m-2 p-2 bg-[var(--color-primary)] text-white rounded hover:bg-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:border duration-200 text-lg px-2 py-2" onClick={() => {
        navigate(`/admin/accountManagement`);
      }}>Quản lí người dùng</button>
      <button className="m-2 p-2 bg-[var(--color-primary)] text-white rounded hover:bg-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:border duration-200 text-lg px-2 py-2" onClick={() => {
        navigate(`/admin/sellerRequestAcc`);
      }}>Duyệt tài khoản bán hàng</button>
      <button className="m-2 p-2 bg-[var(--color-primary)] text-white rounded hover:bg-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:border duration-200 text-lg px-2 py-2" onClick={() => {
        navigate(`/admin/sellerManagement`);
      }}>Quản lí người bán</button>
    </div>
  )
}


export default ManageCustomerAccount