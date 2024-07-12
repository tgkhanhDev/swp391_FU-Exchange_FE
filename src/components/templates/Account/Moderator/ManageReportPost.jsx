import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "../../../../hooks/useAccount";
import { Modal, Button, Select, Input } from 'antd';
import { format } from 'date-fns';
import { useAppDispatch } from "../../../../store"
import { useReport } from "../../../../hooks/useReport"
import { viewFilterReportPostThunk, getPostTypeReportThunk, updateStatusReportPostThunk } from "../../../../store/reportManager/thunk"

export const ManageReportPost = () => {

  const { Option } = Select;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

  const [filterName, setFilterName] = useState('');
  const [filterReportType, setFilterReportType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const { viewReportPost, reportPostType } = useReport();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { staffInfor } = useAccount();
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const truncateContent = (content, maxLength) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };


  const handleOk = (reportPostProductId) => {
    if (reportPostProductId) {
      dispatch(updateStatusReportPostThunk({ reportPostProductId: reportPostProductId, reportStatusId: 2 }));
    }
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
    dispatch(getPostTypeReportThunk())
    if (!staffInfor) {
      navigate("/*");
    } else if (staffInfor.role !== "Moderator") {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    dispatch(viewFilterReportPostThunk({ productName: filterName, reportProductTypeId: filterReportType, reportStatusId: filterStatus }))
  }, [filterName, filterReportType, filterStatus, handleOk])

  return (
    <div className="mx-auto p-4">
      <div className="text-4xl font-semibold text-center py-6">Báo cáo bài đăng</div>
      <div className="overflow-x-auto">
        <div className="my-5">
          <div className="flex justify-between items-center mb-5">
            <div className="cursor-pointer text-2xl" onClick={handleClear}>
              Bỏ lọc
            </div>
            <Input.Search
              placeholder="Tên sản phẩm"
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
              {reportPostType.map((type) => (
                <Option key={type.reportProductTypeId} value={type.reportProductTypeId}>
                  {type.reportProductTypeName}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
              <th className="py-5 px-2 text-center">Họ tên người báo cáo</th>
              <th className="py-5 px-2 text-center">Tên sản phẩm</th>
              <th className="py-5 px-2 text-center">Ngày tạo</th>
              <th className="py-5 px-2 text-center">Chi tiết</th>
              <th className="py-5 px-2 text-center">Trạng thái</th>
              <th className="py-5 px-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {viewReportPost?.map((report) => (
              <tr key={report.reportSellerId} className="hover:bg-gray-50 duration-150">
                <td className="py-5 px-2 text-center">{report.buyerName}</td>
                <td className="py-5 px-2 text-center">{truncateContent(report.postProductName, 20)}</td>
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
                      onClick={() => handleOk(report.postProductId)}
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
            <div className="my-2">Tên sản phẩm: {selectedReport.postProductName}</div>
            <div className="my-2">Loại báo cáo: {selectedReport.reportProductType.reportProductTypeName}</div>
            {selectedReport.content === "" ? (
              <div className="my-2">Nội dung: Không có</div>
            ) : (<div className="my-2">Nội dung: {selectedReport.content}</div>)}
            <div className="my-2">Trạng thái đơn báo cáo: {selectedReport.reportStatus.reportStatusName}</div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default ManageReportPost;