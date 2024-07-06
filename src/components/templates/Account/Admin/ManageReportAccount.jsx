import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../../hooks/useAccount";
import { Modal, Button, Select, Input } from 'antd';
import { format } from 'date-fns';
import { useAppDispatch } from "../../../../store"
import { useReport } from "../../../../hooks/useReport"
import { viewFilterReportSellerThunk, getSellerTypeReportThunk, updateStatusReportSellerThunk } from "../../../../store/reportManager/thunk"

export const ManageReportAccount = () => {

  const { Option } = Select;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

  const [filterName, setFilterName] = useState('');
  const [filterReportType, setFilterReportType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const { viewReportSeller, reportSellerType } = useReport();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { staffInfor } = useAccount();
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);


  const handleOk = (reportSellerId) => {
    if (reportSellerId) {
      dispatch(updateStatusReportSellerThunk({ reportSellerId: reportSellerId, reportStatusId: 2 }));
    }
    setIsModalStatusVisible(false)
  };

  const showInforModal = (report) => {
    setSelectedReport(report);
    setIsModalInfoVisible(true);
  };

  const handleInfoCancel = () => {
    setIsModalInfoVisible(false);
  };

  const handleSearch = (e) => {
    setFilterName(e.target.value);
  };

  const handleSelectChange = (value) => {
    setFilterReportType(value)
  };

  const handleReportStatus = (value) => {
    setFilterStatus(value)
  }

  const handleClear = () => {
    setFilterName('');
    setFilterReportType('');
    setFilterStatus('');
  }

  useEffect(() => {
    dispatch(getSellerTypeReportThunk())
    if (!staffInfor) {
      navigate("/*");
    } else if (staffInfor.role !== "Administrator") {
      navigate("/moderator");
    }
  }, []);

  useEffect(() => {
    dispatch(viewFilterReportSellerThunk({ sellerName: filterName, reportSellerTypeId: filterReportType, reportStatusId: filterStatus }))
  }, [filterName, filterReportType, filterStatus, handleOk])

  return (
    <div className="mx-auto p-4">
      <div className="text-4xl font-semibold text-center py-6">Báo cáo tài khoản</div>
      <div className="overflow-x-auto">
        <div className="my-5">
          <div className="flex justify-between items-center mb-5">
            <div className="cursor-pointer text-2xl" onClick={handleClear}>
              Bỏ lọc
            </div>
            <Input.Search
              placeholder="Họ tên người bán"
              className="w-80"
              onChange={handleSearch}
            />
          </div>

          <div className="flex justify-between items-center">
            <Select
              className="w-[20%]"
              placeholder="Chọn trạng thái"
              onChange={handleReportStatus}
            >
              <Option value={1}>Chưa xác nhận</Option>
              <Option value={2}>Đã xác nhận</Option>
            </Select>

            <Select
              className="w-[50%]"
              placeholder="Chọn loại báo cáo"
              onChange={handleSelectChange}
            >
              {reportSellerType.map((type) => (
                <Option key={type.reportSellerTypeId} value={type.reportSellerTypeId}>
                  {type.reportTypeName}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
              <th className="py-5 px-2 text-center">Họ tên người báo cáo</th>
              <th className="py-5 px-2 text-center">Họ tên người bán</th>
              <th className="py-5 px-2 text-center">Ngày tạo</th>
              <th className="py-5 px-2 text-center">Chi tiết</th>
              <th className="py-5 px-2 text-center">Trạng thái</th>
              <th className="py-5 px-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {viewReportSeller?.map((report) => (
              <tr key={report.reportSellerId} className="hover:bg-gray-50 duration-150">
                <td className="py-5 px-2 text-center">{report.buyerName}</td>
                <td className="py-5 px-2 text-center">{report.sellerName}</td>
                <td className="py-5 px-2 text-center">{formatDate(report.createTime)}</td>
                <td className="py-5 px-2 text-center">
                  <Button type="link" className="font-semibold" onClick={() => showInforModal(report)}>
                    Chi tiết
                  </Button>
                </td>
                <td className={`py-5 px-2 text-center font-semibold ${report.reportStatus.reportStatusId === 2 ? 'text-green-500' : 'text-red-500'}`}>
                  {report.reportStatus.reportStatusName}
                </td>
                <td className="py-5 px-2 text-center">
                  {report.reportStatus.reportStatusId === 2 ? (
                    // Bạn có thể hiển thị một thông báo hoặc phần tử khác khi nút bị vô hiệu hóa
                    <button className="bg-gray-500 px-2 py-1 text-white rounded duration-150 hover:bg-gray-700">Đã xác nhận</button>
                  ) : (
                    <button
                      className="bg-blue-500 px-2 py-1 text-white rounded duration-150 hover:bg-blue-700"
                      onClick={() => handleOk(report.reportSellerId)}
                      disabled={report.reportStatus.reportStatusId === 2}
                    >
                      Xác nhận
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        {selectedReport && (
          <div>
            <div className="my-2">Người báo cáo: {selectedReport.buyerName}</div>
            <div className="my-2">Người bị báo cáo: {selectedReport.sellerName}</div>
            <div className="my-2">Loại báo cáo: {selectedReport.reportSellerType.reportTypeName}</div>
            <div className="my-2">Nội dung: {selectedReport.content}</div>
            <div className="my-2">Trạng thái đơn báo cáo: {selectedReport.reportStatus.reportStatusName}</div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default ManageReportAccount;