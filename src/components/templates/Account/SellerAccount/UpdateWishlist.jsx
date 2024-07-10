import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { getSellerInfoThunk, getAccountInfoTypeThunk } from "../../../../store/userManagement/thunk";
import { useAppDispatch } from "../../../../store";
import { useWishlist } from "../../../../hooks/useWishlist"
import { viewWishlistThunk } from "../../../../store/wishlistManager/thunk"
import { updateStatusWishlistThunk } from "../../../../store/wishlistManager/thunk"
import { format } from 'date-fns';
import { Modal, Button, Select } from 'antd';
import { contactSeller, contactStudent } from "../../../../store/chatManager/thunk";

export const UpdateWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postProductId } = useParams();
  const { studentInfo } = useAccount();
  const [user, setUser] = useState(null); // Khởi tạo với giá trị null hoặc một giá trị mặc định khác
  const { view } = useWishlist();
  const [userDetail, setUserDetail] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [contentTemp, setContentTemp] = useState();

  useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
    } else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    } else {
      dispatch(
        getSellerInfoThunk({
          sellerTO: {
            RegisteredStudent: {
              Student: {
                studentId: studentInfo.username
              }
            }
          }
        })
      )
        .then((action) => {
          const { payload } = action;
          const { data } = payload;
          setUserDetail(data); // Kết hợp userInfo và data thành một đối tượng mới
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);


  useEffect(() => {
    if (userDetail && (userDetail.sellerTO?.active === 2 || userDetail.sellerTO?.active === 0)) {
      navigate('/*');
    }
  });

  useEffect(() => {
    if (postProductId) {
      dispatch(viewWishlistThunk(parseInt(postProductId)));
    }
    if (view && view.length > 0) {
      const ids = view.map(item => item.registeredStudentId);

      ids.forEach(id => {
        dispatch(getAccountInfoTypeThunk(id))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            setUser(prevUser => ({
              ...prevUser,
              [id]: data, // Assuming you want to store the data indexed by id
            }));
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      });
    }
  }, [dispatch]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy HH:mm:ss');
  };

  const [selectedStudent, setSelectedStudent] = useState();

  const showModal = (wishListId, contentCreate, registeredStudentId) => {
    setSelectedId(wishListId);
    setIsModalVisible(true);
    setContentTemp(contentCreate)
    setSelectedStudent(registeredStudentId)
  };

  const handleOk = () => {
    if (userDetail?.sellerTO?.sellerId) {
      let content = '';
      if (selectedStatus === 1) {
        content = `Tôi tặng cho bạn sản phẩm này: ${contentTemp}`;
        dispatch(updateStatusWishlistThunk({active: 1, wishListId: selectedId}));
        dispatch(contactStudent({ registeredStudentId: selectedStudent, sellerId: userDetail.sellerTO.sellerId, content }));
      } else if (selectedStatus === 0) {
        content = `Tôi không muốn tặng cho bạn sản phẩm này nữa: ${contentTemp}`;
        dispatch(contactStudent({ registeredStudentId: selectedStudent, sellerId: userDetail.sellerTO.sellerId, content }));
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Duyệt người dùng được tặng</div>
          <table className="min-w-full bg-white mt-5">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
                <th className="py-5 px-2 text-center">Họ và tên</th>
                <th className="py-5 px-2 text-center">Thời gian đăng kí</th>
                <th className="py-5 px-2 text-center">Số lượng</th>
                <th className="py-5 px-2 text-center">Trạng thái hiện tại</th>
                <th className="py-5 px-2 text-center">Thao tác</th>
              </tr>
            </thead>
            {view && view.length > 0 && (
              <tbody>
                {view.map(item => (
                  <tr key={item.registeredStudentId} className="hover:bg-gray-50 duration-150">
                    <td className="py-5 px-2 text-center">
                      {user && user[item.registeredStudentId] && user[item.registeredStudentId]?.student &&
                        `${user[item.registeredStudentId]?.student.firstName} ${user[item.registeredStudentId]?.student.lastName}`}
                    </td>
                    <td className="py-5 px-2 text-center">{formatDate(item.createTime)}</td>
                    <td className="py-5 px-2 text-center">{item.quantity}</td>
                    {item.active ? (
                      <td className="py-5 text-green-500 font-semibold text-center">Đã được tặng</td>
                    ) : (
                      <td className="py-5 text-red-500 font-semibold text-center">Đang chờ được tặng</td>
                    )}
                    <td className="py-5 px-2 text-center">
                      <button
                        className="bg-blue-500 px-2 py-1 text-white rounded duration-150 hover:bg-blue-700"
                        onClick={() => showModal(item.wishListId, item.postProductResponse.productResponse.productDetailResponse.productName, item.registeredStudentId)}
                      >
                        Thay đổi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          <div className="mt-4">
            <Button type="primary" onClick={() => navigate(`/dashboard/wishlist`)}>Trở về</Button>
          </div>

        </div>
      </main>
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
          value={selectedStatus}
        >
          <Option value={1}>Tặng</Option>
          <Option value={0}>Chưa tặng</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default UpdateWishlist;
