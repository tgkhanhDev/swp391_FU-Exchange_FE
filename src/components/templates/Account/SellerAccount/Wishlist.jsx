import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccount } from "../../../../hooks/useAccount";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { getPostBySellerIdThunk } from "../../../../store/postManagement/thunk";
import { useAppDispatch } from "../../../../store";
import { usePost } from "../../../../hooks/usePost";

export const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentInfo } = useAccount();
  const [user, setUser] = useState(null); // Khởi tạo với giá trị null hoặc một giá trị mặc định khác
  const { postView } = usePost();

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
          setUser(data); // Kết hợp userInfo và data thành một đối tượng mới
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    } else if (user && user.sellerTO?.sellerId) {
      dispatch(getPostBySellerIdThunk(user.sellerTO.sellerId));
    }
  }, [user,dispatch]);

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Danh sách bài đăng Tặng</div>
          <div className="grid grid-cols-3 gap-10 mt-10">
            {postView?.map((item) => (
              // Kiểm tra item.postType tồn tại và postTypeId === 1 trước khi render
              item.postType && item.postType.postTypeId === 1 && (
                <button
                  key={item.postProductId}
                  className="flex flex-col m-auto w-[250px] hover:cursor-pointer border border-[var(--color-primary)] hover:-translate-y-2 transition-all ease-in-out"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    navigate(`/dashboard/wishlist/${item.postProductId}`);
                  }}
                >
                  <img
                    src={item.product.image[0]?.imageUrl || 'placeholder.jpg'} // Kiểm tra và sử dụng ảnh placeholder khi không có ảnh
                    alt=""
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "15px 15px 0 0",
                    }}
                  />
                  <div className="flex flex-col items-start px-2 w-full">
                    <div className="text-xl font-semibold flex items-center h-[50px]">
                      {item.product.detail.productName.length > 60
                        ? item.product.detail.productName.substring(0, 60) +
                          "..."
                        : item.product.detail.productName}
                    </div>
                    <div className="flex w-full justify-between pb-4">
                      <div className="italic">Còn lại: {item.quantity}</div>
                      <div className="font-bold">{item.campus.campusName}</div>
                    </div>
                  </div>
                </button>
              )
            ))}
          </div>
          <div className="py-10 pr-6">
            {/* Nội dung bổ sung */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
