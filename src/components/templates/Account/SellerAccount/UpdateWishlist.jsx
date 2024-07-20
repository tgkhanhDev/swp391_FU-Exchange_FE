import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { getSellerInfoThunk, getAccountInfoTypeThunk } from "../../../../store/userManagement/thunk";
import { useAppDispatch } from "../../../../store";
import { useWishlist } from "../../../../hooks/useWishlist"
import { viewWishlistThunk, updateStatusWishlistThunk } from "../../../../store/wishlistManager/thunk"
import { format } from 'date-fns';
import { Button } from 'antd';
import { contactStudent } from "../../../../store/chatManager/thunk";

export const UpdateWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postProductId } = useParams();
  const { studentInfo } = useAccount();
  const [user, setUser] = useState(null);
  const { view } = useWishlist();
  const [userDetail, setUserDetail] = useState();
  const hasFetchedData = useRef(false); // ref to check if data has been fetched

  useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
    } else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    } else if (!hasFetchedData.current) {
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
          setUserDetail(data);
          hasFetchedData.current = true; // Mark data as fetched
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch, studentInfo, navigate]);

  useEffect(() => {
    if (userDetail && (userDetail.sellerTO?.active === 2 || userDetail.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [userDetail, navigate]);

  useEffect(() => {
    if (postProductId) {
      dispatch(viewWishlistThunk(parseInt(postProductId)));
    }
  }, [postProductId, dispatch]);

  useEffect(() => {
    if (view && view.length > 0) {
      const ids = view.map(item => item.registeredStudentId);

      ids.forEach(id => {
        dispatch(getAccountInfoTypeThunk(id))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            setUser(prevUser => ({
              ...prevUser,
              [id]: data,
            }));
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      });
    }
  }, [view, dispatch]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy HH:mm:ss');
  };

  const handleOk = async (wishListId, contentCreate, registeredStudentId, selectedStatus) => {
    if (userDetail?.sellerTO?.sellerId) {
      let content = '';
      if (selectedStatus === 1) {
        content = `Tôi tặng cho bạn sản phẩm này: ${contentCreate}`;
        const result = await dispatch(updateStatusWishlistThunk({ active: 1, wishListId: wishListId }));
        if (result.payload.status === 200) {
          dispatch(contactStudent({ registeredStudentId: registeredStudentId, sellerId: userDetail.sellerTO.sellerId, content }));
        }
      } else if (selectedStatus === 0) {
        content = `Tôi không muốn tặng cho bạn sản phẩm này nữa: ${contentCreate}`;
        const result = await dispatch(updateStatusWishlistThunk({ active: 0, wishListId: wishListId }));
        if (result.payload.status === 200) {
          dispatch(contactStudent({ registeredStudentId: registeredStudentId, sellerId: userDetail.sellerTO.sellerId, content }));
        }
      }
    }
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
            {view && view.length > 0 ? (
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
                      {item.active ? (
                        <button
                          className="bg-red-500 px-4 py-1 text-white rounded duration-150 hover:bg-red-700"
                          onClick={() => handleOk(item.wishListId, item.postProductResponse.productResponse.productDetailResponse.productName, item.registeredStudentId, 0)}
                        >
                          Không tặng
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 px-4 py-1 text-white rounded duration-150 hover:bg-green-700"
                          onClick={() => handleOk(item.wishListId, item.postProductResponse.productResponse.productDetailResponse.productName, item.registeredStudentId, 1)}
                        >Tặng</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>

          <div className="mt-4">
            <Button type="primary" onClick={() => navigate(`/dashboard/wishlist`)}>Trở về</Button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UpdateWishlist;
