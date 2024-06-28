import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { format } from 'date-fns';
import { Button, Select, Input, Dropdown, MenuProps, Pagination, Popover } from 'antd';
import { getPostThunk } from "../../../../store/postManagement/thunk";
import { usePost } from "../../../../hooks/usePost";
import { getAllPostByModeratorThunk, updateStatusPostProductThunk } from "../../../../store/moderatorManager/thunk";
import { Post } from "../../../../types/post";
import { utilsResponse } from "../../../../types/utils";
import { useView } from "../../../../hooks/useView";
import { PostStatus } from "../../../../types/order";

const { Option } = Select;

export const ManagePostProduct = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const { postStatus } = useView();

  const [postStt, setPostStt] = useState<PostStatus>({
    postStatusId: 0,
    postStatusName: "Toàn bộ"
  });
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<any>(null);
  const [filterName, setFilterName] = useState<string>("");
  // ref 
  let filterNameRef = useRef<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };
  //end Ref

  //Get all Campus list
  const postStatusList: MenuProps["items"] = [
    {
      key: 0,
      label: (
        <button
          onClick={() => {
            setPostStt({
              postStatusId: 0,
              postStatusName: "Toàn bộ"
            });
          }}
        >
          Toàn bộ
        </button>
      ),
    },
  ].concat(
    postStatus?.map((item) => {
      return {
        key: item.campusId,
        label: (
          <button
            onClick={() => {
              setPostStt(item);
            }}
          >
            {item.postStatusName}
          </button>
        ),
      };
    })
  );


  useEffect(() => {
    // if (!studentInfo) {
    //   navigate('/login');
    // }
    // else if (studentInfo.role !== "Seller") {
    //   navigate('/authorize');
    // }    
    dispatch(getAllPostByModeratorThunk({ page: page, sellerName: filterName, postStatus: postStt.postStatusId })).then((item: any) => {
      setPostList(item.payload.data)
    })

  }, [page, postStt, filterName])


  //?Popover 
  const PopOverStatusChoice = ({ postProductId, statusId }) => {
    const { postStatus } = useView();
    const dispatch = useAppDispatch();
    return (
      <div className="flex flex-col">
        {postStatus?.map(item => {
          return (
            <Button onClick={() => {
              dispatch(updateStatusPostProductThunk({ postProductId: postProductId, postStatusId: item.postStatusId }))
              dispatch(getAllPostByModeratorThunk({ page: page, sellerName: filterName, postStatus: postStt.postStatusId })).then((item: any) => {
                setPostList(item.payload.data)
              })
            }}
              disabled={item.postStatusId == statusId} className={(item.postStatusId == statusId) ? `bg-slate-100` : ""}>{item.postStatusName}</Button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mx-auto p-4">
      <div className="text-4xl font-semibold text-center py-6">
        Quản Lý Bài Đăng
      </div>
      {/* filter  */}
      <Input onChange={handleSearch} placeholder="Tìm kiếm theo tên..." />
      <div className="flex justify-end mr-10">
        <Dropdown menu={{ items: postStatusList }} placement="bottom" arrow>
          <Button>Lọc theo: {postStt?.postStatusName} </Button>
        </Dropdown>
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
            {postList && postList.map((post, index) => {
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
                  {post.postStatus.postStatusId == 1 ? <td className="py-5 px-2 text-center"><Popover content={<PopOverStatusChoice postProductId={post.postProductId} statusId={post.postStatus.postStatusId} />} trigger="click"><div className="bg-cyan-700 text-white m-5 rounded">{post.postStatus.postStatusName}</div></Popover></td> : null}
                  {post.postStatus.postStatusId == 2 ? <td className="py-5 px-2 text-center"><Popover content={<PopOverStatusChoice postProductId={post.postProductId} statusId={post.postStatus.postStatusId} />} trigger="click"><div className="bg-orange-700 text-white m-5 rounded">{post.postStatus.postStatusName}</div></Popover></td> : null}
                  {post.postStatus.postStatusId == 3 ? <td className="py-5 px-2 text-center"><Popover content={<PopOverStatusChoice postProductId={post.postProductId} statusId={post.postStatus.postStatusId} />} trigger="click"><div className="bg-red-500 text-white m-5 rounded">{post.postStatus.postStatusName}</div></Popover></td> : null}
                  {post.postStatus.postStatusId == 4 ? <td className="py-5 px-2 text-center"><Popover content={<PopOverStatusChoice postProductId={post.postProductId} statusId={post.postStatus.postStatusId} />} trigger="click"><div className="bg-green-500 text-white m-5 rounded">{post.postStatus.postStatusName}</div></Popover></td> : null}
                  {post.postStatus.postStatusId == 5 ? <td className="py-5 px-2 text-center"><Popover content={<PopOverStatusChoice postProductId={post.postProductId} statusId={post.postStatus.postStatusId} />} trigger="click"><div className="bg-gray-300 line-through m-5 rounded">{post.postStatus.postStatusName}</div></Popover></td> : null}
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination onChange={(page, pageSize) => {
          setPage(page)
        }} defaultCurrent={1} defaultPageSize={6} total={50} />
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