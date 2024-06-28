import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { getAllRequestSellerAcc, setStatusSellerThunk } from "../../../../store/accountManager/thunk"
import { useAppDispatch } from "../../../../store";
import { Modal, Button, Select, Input } from 'antd';
import { format } from 'date-fns';

const { Option } = Select;

export const SellerAccountManager = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { staffInfor } = useAccount();
  const [requestSeller, setRequestSeller] = useState();

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [selectedAcc, setSelectedAcc] = useState(null);
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedAccId, setSelectedAccId] = useState();
  const [isModalStatusVisible, setIsModalStatusVisible] = useState(false);

  const formatDay = (dateString) => {
    const day = new Date(dateString);
    return format(day, 'dd/MM/yyyy');
  };

  useEffect(() => {
    if (!staffInfor) {
      navigate('/*');
    }
    else if (staffInfor.role !== "Administrator") {
      navigate('/moderator');
    }
  })

  useEffect(() => {
    dispatch(getAllRequestSellerAcc())
      .then((action) => {
        const { payload } = action;
        const { data } = payload;
        setRequestSeller(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching account information:", error);
      });
  }, [dispatch])

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = requestSeller.filter((seller) => {
      const fullName = `${seller.student.firstName} ${seller.student.lastName}`.toLowerCase();
      return fullName.includes(query);
    });
    setFilteredUsers(filteredData);
  };

  const showInforModal = (student) => {
    setSelectedAcc(student);
    setIsModalInfoVisible(true);
  };

  const handleInfoCancel = () => {
    setIsModalInfoVisible(false);
  };

  const showStatusModal = (registeredStudentId) => {
    setSelectedAccId(registeredStudentId);
    setIsModalStatusVisible(true);
  };

  const handleOk = () => {
    if (selectedAccId !== null && selectedStatus !== null) {
      dispatch(setStatusSellerThunk({ sellerId: selectedAccId, isActive: selectedStatus }))
        .then(() => {
          // Refetch the user data
          dispatch(getAllRequestSellerAcc())
            .then((action) => {
              const { payload } = action;
              const { data } = payload;
              setRequestSeller(data);
              setFilteredUsers(data);
            })
            .catch((error) => {
              console.error("Error fetching account information:", error);
            });
        });
      setIsModalStatusVisible(false);
    } else {
      console.error("Staff ID or selected status is null");
    }
  };

  const handleCancel = () => {
    setIsModalStatusVisible(false);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <div className="mx-auto p-4">
      <div className="text-4xl font-semibold text-center py-6">Duyệt người bán</div>
      <div className="overflow-x-auto">
        <div className="flex justify-end my-5">
          <Input.Search
            placeholder="Họ tên"
            className="w-80"
            onChange={handleSearch}
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
              <th className="py-5 px-2 text-center">Họ và tên</th>
              <th className="py-5 px-2 text-center">Số CMND/CCCD</th>
              <th className="py-5 px-2 text-center">Số điện thoại</th>
              <th className="py-5 px-2 text-center">Chi tiết</th>
              <th className="py-5 px-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
          {filteredUsers?.map((request) => (
              <tr key={request.sellerId} className="hover:bg-gray-50 duration-150">
                <td className="py-5 px-2 text-center">{`${request.student?.firstName} ${request.student?.lastName}`}</td>
                <td className="py-5 px-2 text-center">{request.student?.identityCard}</td>
                <td className="py-5 px-2 text-center">{request.student?.phoneNumber}</td>
                <td className="py-5 px-2 text-center">
                  <Button type="link" className="font-semibold" onClick={() => showInforModal(request)}>
                    Chi tiết
                  </Button>
                </td>
                <td className="py-5 px-2 text-center">
                  <button
                    className="bg-blue-500 px-2 py-1 text-white rounded duration-150 hover:bg-blue-700"
                    onClick={() => showStatusModal(request.sellerId)}
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
        visible={isModalStatusVisible}
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
          style={{ width: '100%' }}
          onChange={handleStatusChange}
          value={selectedStatus}
        >
          <Option value={1}>Hoạt động</Option>
          <Option value={0}>Không hoạt động</Option>
        </Select>
      </Modal>

      <Modal
        title="Thông tin chi tiết"
        visible={isModalInfoVisible}
        onCancel={handleInfoCancel}
        footer={[
          <Button key="back" onClick={handleInfoCancel}>
            Ok
          </Button>,
        ]}
      >
        {selectedAcc && (
          <div>
            <div className="my-2">Họ và tên: {`${selectedAcc.student.firstName} ${selectedAcc.student.lastName}`}</div>
            <div className="my-2">Địa chỉ: {selectedAcc.student.address}</div>
            <div className="my-2">Ngày sinh: {formatDay(selectedAcc.student.dob)}</div>
            <div className="my-2">Giới tính: {selectedAcc.student.gender}</div>
            <div className="my-2">MSSV: {selectedAcc.student.studentId}</div>
            <div className="my-2">Tên ngân hàng: {selectedAcc.bankingName}</div>
            <div className="my-2">Mã số ngân hàng: {selectedAcc.bankingNumber}</div>
          </div>
        )}
      </Modal>
      
    </div>
  )
}


export default SellerAccountManager