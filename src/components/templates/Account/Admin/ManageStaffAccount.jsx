import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getAllStaffAccountThunk, setStatusStaffThunk } from "../../../../store/accountManager/thunk";
import { useManageAccount } from "../../../../hooks/useManageAccount";
import { format } from 'date-fns';
import { Modal, Button, Select } from 'antd';

const { Option } = Select;

export const ManageStaffAccount = () => {
  const navigate = useNavigate();
  const { staffInfor } = useAccount();
  const { account } = useManageAccount();
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

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

  const showModal = (staffId) => {
    setSelectedStaffId(staffId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedStaffId !== null && selectedStatus !== null) {
      dispatch(setStatusStaffThunk({ staffId: selectedStaffId, active: selectedStatus }));
      setIsModalVisible(false);
    } else {
      // Handle error case where staffId or selectedStatus is null
      console.error("Staff ID or selected status is null");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <div className="mx-auto p-4">
      <div className="text-4xl font-semibold text-center py-6">Tài khoản nhân viên</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
              <th className="py-5 px-2 text-center">Tên nhân viên</th>
              <th className="py-5 px-2 text-center">Số CMND/CCCD</th>
              <th className="py-5 px-2 text-center">Số điện thoại</th>
              <th className="py-5 px-2 text-center">Địa chỉ</th>
              <th className="py-5 px-2 text-center">Ngày sinh</th>
              <th className="py-5 px-2 text-center">Giới tính</th>
              <th className="py-5 px-2 text-center">Trạng thái</th>
              <th className="py-5 px-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffInfoList.map((staffInfo, index) => (
              <tr key={index} className="hover:bg-gray-50 duration-150">
                <td className="py-5 px-2 text-center">{staffInfo.staffName}</td>
                <td className="py-5 px-2 text-center">{staffInfo.identityCard}</td>
                <td className="py-5 px-2 text-center">{staffInfo.phoneNumber}</td>
                <td className="py-5 px-2 text-center">{staffInfo.address}</td>
                <td className="py-5 px-2 text-center">{formatDay(staffInfo.dob)}</td>
                <td className="py-5 px-2 text-center">{staffInfo.gender}</td>
                {staffInfo.active ? (
                  <td className="py-5 text-green-500 font-semibold text-center">Hoạt động</td>
                ) : (
                  <td className="py-5 px-2 text-red-500 font-semibold text-center">Không hoạt động</td>
                )}
                <td className="py-5 px-2 text-center">
                  <button
                    className="bg-blue-500 px-2 py-1 text-white rounded duration-150 hover:bg-blue-700"
                    onClick={() => showModal(staffInfo.staffId)}
                  >
                    Thay đổi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Thay đổi trạng thái"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu
          </Button>,
        ]}
      >
        <Select
          placeholder="Chọn trạng thái"
          onChange={handleStatusChange}
          style={{ width: '100%' }}
          value={selectedStatus} // Add this line to bind the selectedStatus to the dropdown
        >
          <Option value="1">Hoạt động</Option>
          <Option value="0">Không hoạt động</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ManageStaffAccount;
