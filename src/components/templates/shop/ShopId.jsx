import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../store";
import { getPostBySellerIdThunk } from "../../../store/postManagement/thunk";
import { usePost } from "../../../hooks/usePost";
import { getSellerInfoBySellerIdThunk } from "../../../store/userManagement/thunk"

export const ShopId = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postView } = usePost();
  const { sellerId } = useParams();
  const [user, setUser] = useState();

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

  console.log(user)

  return (
    <div>
      <div class="relative h-48 w-full bg-gradient-to-t from-white to-[#FD7014] animate-gradient">
        <div class="absolute bottom-0 left-0 transform translate-x-1/2 translate-y-2/3">
          <div class="ml-10 w-40 h-40 bg-[#F59E0B] rounded-full -translate-x-1/2">
            <UserOutlined className="absolute inset-0 flex justify-center items-center text-6xl text-white" />
          </div>
        </div>
      </div>
      <div class="w-full text-3xl font-semibold px-60 mt-8 mb-16">{user?.sellerTO.student.firstName} {user?.sellerTO.student.lastName}</div>
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
    </div>
  )
}


export default ShopId