import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getAllStaffAccountThunk, setStatusStaffThunk } from "../../../../store/accountManager/thunk";
import { useManageAccount } from "../../../../hooks/useManageAccount";
import { format, formatDate } from 'date-fns';
import { Modal, Button, Select } from 'antd';
import { getPostThunk } from "../../../../store/postManagement/thunk";
import { usePost } from "../../../../hooks/usePost";

const { Option } = Select;

export const ManagePostProduct = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const { posts } = usePost();

  useEffect(() => {
    // if (!studentInfo) {
    //   navigate('/login');
    // }
    // else if (studentInfo.role !== "Seller") {
    //   navigate('/authorize');
    // }

    dispatch(getPostThunk({ current: 100, campusId: "", name: "", postTypeId: "" }))

  }, [])


  return (
    <div className="mx-auto p-4">
      <div className="text-4xl font-semibold text-center py-6">
        Quản Lý Bài Đăng
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
              <th className="py-5 px-2 text-center">Post Id</th>
              <th className="py-5 px-2 text-center">Seller Name</th>
              <th className="py-5 px-2 text-center">Product Name</th>
              <th className="py-5 px-2 text-center">Price</th>
              <th className="py-5 px-2 text-center">Post Type</th>
              {/* ban, tang, trao doi  */}
              <th className="py-5 px-2 text-center">Campus</th>
              <th className="py-5 px-2 text-center">Quantity</th>
              <th className="py-5 px-2 text-center">Create Date</th>
              <th className="py-5 px-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.data.map((post, index) => {
              return (
                <tr key={index} className="hover:bg-gray-50 duration-150">
                  <td className="py-5 px-2 text-center">{post.postProductId}</td>
                  <td className="py-5 px-2 text-center">{post.product.seller.student.firstName}{" "}{post.product.seller.student.lastName}</td>
                  <td className="py-5 px-2 text-center">{post.product.detail.productName}</td>
                  <td className="py-5 px-2 text-center">{post.product.price}</td>
                  <td className="py-5 px-2 text-center">{post.postType.postTypeName}</td>
                  <td className="py-5 px-2 text-center">{post.campus.campusName}</td>
                  <td className="py-5 px-2 text-center">
                    {post.quantity}
                  </td>
                  <td className="py-5 px-2 text-center">
                    {/* {formatDate("string" ,post.createDate)} */}
                    {format(new Date(post.createDate), 'MMMM dd, yyyy')}
                  </td>
                  {post.postStatus.postStatusId == 1 ? <td className="py-5 px-2 text-center bg-cyan-700 text-white">{post.postStatus.postStatusName}</td> : null}
                  {post.postStatus.postStatusId == 2 ? <td className="py-5 px-2 text-center bg-orange-700 text-white">{post.postStatus.postStatusName}</td> : null}
                  {post.postStatus.postStatusId == 3 ? <td className="py-5 px-2 text-center bg-red-500 text-white">{post.postStatus.postStatusName}</td> : null}
                  {post.postStatus.postStatusId == 4 ? <td className="py-5 px-2 text-center bg-green-500 text-white">{post.postStatus.postStatusName}</td> : null}
                  {post.postStatus.postStatusId == 5 ? <td className="py-5 px-2 text-center bg-gray-300 line-through">{post.postStatus.postStatusName}</td> : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* <Modal
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
          style={{ width: "100%" }}
          value={selectedStatus} // Add this line to bind the selectedStatus to the dropdown
        >
          <Option value="1">Hoạt động</Option>
          <Option value="0">Không hoạt động</Option>
        </Select>
      </Modal> */}
    </div>
  );
}


export default ManagePostProduct