import { Button, Select, Modal, Input, Form, } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { UserOutlined, WarningOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../store";
import { getPostBySellerIdThunk } from "../../../store/postManagement/thunk";
import { usePost } from "../../../hooks/usePost";
import { getSellerInfoBySellerIdThunk } from "../../../store/userManagement/thunk"
import { useAccount } from "../../../hooks/useAccount"
import { useReport } from "../../../hooks/useReport"
import { getSellerTypeReportThunk, sendReportSellerThunk } from "../../../store/reportManager/thunk"

export const ShopId = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postView } = usePost();
  const { sellerId, postProductId } = useParams();
  const [user, setUser] = useState();
  const { studentInfo } = useAccount();
  const { reportSellerType } = useReport();

  const { Option } = Select;

  useEffect(() => {
    dispatch(getPostBySellerIdThunk(parseInt(sellerId)));

    dispatch(getSellerInfoBySellerIdThunk(parseInt(sellerId)))
      .then((action) => {
        const { payload } = action;
        const { data } = payload;
        setUser(data); // Kết hợp userInfo và data thành một đối tượng mới
      })
      .catch((error) => {
        console.error("Error fetching account information:", error);
      });
  }, [dispatch])

  const [isModalReport, setIsModalReport] = useState(false);

  useEffect(() => {
    dispatch(getSellerTypeReportThunk());
  }, [dispatch])

  const [reportTypeId, setReportTypeId] = useState();

  const handleSelectChange = (value) => {
    setReportTypeId(value)
  };

  const showReportModal = () => {
    setIsModalReport(true);
  };


  const reportContent = useRef("");

  const handleReportOk = () => {
    if (reportTypeId && reportContent) {
      dispatch(sendReportSellerThunk({ registeredStudentId: studentInfo?.registeredStudentId, sellerId: parseInt(sellerId), reportSellerTypeId: reportTypeId, content: reportContent.current }))
      setIsModalReport(false);
    }
  };

  const handleReportCancel = () => {
    setIsModalReport(false);
  };

  return (
    <div>
      <button className="w-24 hover:w-28 duration-500 fixed z-10 bg-[var(--color-primary)] text-white rounded-r-full px-2 py-2 bottom-5" onClick={() => navigate(`/detail/${postProductId}`)}>Trở về</button>
      <div class="relative h-48 w-full bg-gradient-to-t from-white to-[#FD7014] animate-gradient">
        <div class="absolute bottom-0 left-0 transform translate-x-1/2 translate-y-2/3">
          <div class="ml-10 w-40 h-40 bg-[#F59E0B] rounded-full -translate-x-1/2">
            <UserOutlined className="absolute inset-0 flex justify-center items-center text-6xl text-white" />
          </div>
        </div>
      </div>
      <div className="flex gap-x-8">
        <div class="text-3xl font-semibold pl-60 mt-8 mb-16">{user?.sellerTO.student.firstName} {user?.sellerTO.student.lastName}</div>
        <div className="mt-10 mb-16 cursor-pointer" onClick={showReportModal}>
          <WarningOutlined className="text-xl" />
        </div>
      </div>
      <div class="text-center text-4xl font-bold text-[#FD7014] mb-5">Các sản phẩm</div>
      <div className="grid grid-cols-3 gap-10 mt-10 mb-20">
        {postView?.map((item) => {
          return (
            <button
              key={item.postProductId}
              className="flex flex-col m-auto w-[250px] hover:cursor-pointer border border-[var(--color-primary)] hover:-translate-y-5 transition-all ease-in-out"
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "15px",
              }}
              onClick={() => {
                navigate(`/detail/${item.postProductId}`);
              }}
            >
              <img
                src={item.product.image[0].imageUrl}
                alt=""
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "15px 15px 0 0",
                }}
              />
              <div className="flex flex-col items-start px-2 w-full">
                <div className="text-xl font-semibold flex items-center h-[100px]">
                  {item.product.detail.productName.length > 60
                    ? item.product.detail.productName.substring(0, 60) +
                    "..."
                    : item.product.detail.productName}
                </div>
                <div className="flex w-full justify-between">
                  <div className="italic">Còn lại: {item.quantity}</div>
                  <div className="font-bold text-xl">
                    {item.product.price}VND
                  </div>
                </div>
                <div>{item.campus.campusName}</div>
              </div>
            </button>
          );
        })}
      </div>

      <Modal
        title="Báo cáo người bán"
        visible={isModalReport}
        onOk={handleReportOk}
        onCancel={handleReportCancel}
        footer={[
          <Button key="back" onClick={handleReportCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleReportOk}>
            Lưu
          </Button>,
        ]}
      >
        <Form>
          <Form.Item>
            <div className="mt-2">
              <div className="mb-2">Loại báo cáo:</div>
              <Select
                className="w-full"
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
          </Form.Item>
          <Form.Item>
            <div className="mt-2">
              <div className="mb-2">Nội dung: </div>
              <Input.TextArea
                className="h-8 rounded-md px-4"
                defaultValue=""
                onChange={(e) => {
                  reportContent.current = e.target.value;
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}


export default ShopId