import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getAllStaffAccountThunk } from "../../../../store/accountManager/thunk";
import { useManageAccount } from "../../../../hooks/useManageAccount";
import { format } from 'date-fns';

export const ManageStaffAccount = () => {
  const navigate = useNavigate();
  const { staffInfor } = useAccount();
  const { account } = useManageAccount();
  const dispatch = useAppDispatch();

  const formatDay = (dateString) => {
    const day = new Date(dateString);
    return format(day, 'dd/MM/yyyy');
  };

  useEffect(() => {
    if (!staffInfor) {
      navigate('/*');
    } else if (staffInfor.role !== "Administrator") {
      navigate('/moderator');
    }
    dispatch(getAllStaffAccountThunk({ current: 5, identityCard: "" }));
  }, [staffInfor, navigate, dispatch]);

  const staffInfoList = account && Array.isArray(account.staffInforResponseList) ? account.staffInforResponseList : [];

  return (
    <div className="mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
              <th className="text-left py-3 px-4">Tên nhân viên</th>
              <th className="text-left py-3 px-4">Số CMND/CCCD</th>
              <th className="text-left py-3 px-4">Số điện thoại</th>
              <th className="text-left py-3 px-4">Địa chỉ</th>
              <th className="text-left py-3 px-4">Ngày sinh</th>
              <th className="text-left py-3 px-4">Giới tính</th>
              <th className="text-left py-3 px-4">Trạng thái</th>
              <th className="text-center py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffInfoList.map((staffInfo, index) => (
              <tr key={index} className="hover:bg-gray-50 duration-150">
                <td className="py-3 px-4">{staffInfo.staffName}</td>
                <td className="py-3 px-4">{staffInfo.identityCard}</td>
                <td className="py-3 px-4">{staffInfo.phoneNumber}</td>
                <td className="py-3 px-4">{staffInfo.address}</td>
                <td className="py-3 px-4">{formatDay(staffInfo.dob)}</td>
                <td className="py-3 px-4">{staffInfo.gender}</td>
                {staffInfo.active ? <td className="py-3 px-4 text-green-400 font-medium">
                  Hoạt động
                </td> :
                  <td className="py-3 px-4 text-red-400 font-medium">
                    Không hoạt động
                  </td>}
                <td className="py-3 px-4">
                  <button className="bg-blue-500 px-2 text-white rounded duration-150 hover:bg-blue-700">
                    Thay đổi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStaffAccount;
