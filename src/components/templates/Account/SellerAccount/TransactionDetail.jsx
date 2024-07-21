import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { getOrderDetailBySellerIdThunk } from "../../../../store/orderManager/thunk"
import { useOrder } from "../../../../hooks/useOrder"
import { Button } from "antd"
import { format } from 'date-fns';

export const TransactionDetail = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const { orderId } = useParams();
  const { orderDetailSeller } = useOrder();

  useEffect(() => {

    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: studentInfo?.username
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

    if (!studentInfo) {
      navigate('/login');
    }
    else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(getOrderDetailBySellerIdThunk({ sellerId: user.sellerTO?.sellerId, orderId: orderId }))
    }
  }, [user])

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss');
  };

  return (
    <div>
      <main className="py-10">
        <div className="pl-14">
          <div className="font-bold text-4xl">Chi tiết giao dịch</div>
          <div className="flex my-4">
            <Button
              type="primary"
              className="flex justify-center items-center py-5 px-8 text-lg"
              onClick={() => {
                navigate(`/dashboard`);
              }}
            >
              Trở về
            </Button>
          </div>
          <div className="pr-6">
            {/*Đơn hàng */}
            {orderDetailSeller.map((detail, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300"
              >
                {/*Thông tin cơ bản đơn hàng */}
                <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
                  <div className="">
                    <div className="text-lg font-bold">Ngày đặt đơn: </div>
                    <div>{formatDate(detail.order.createDate)}</div>
                  </div>

                  <div>
                    <div className="text-lg font-bold">Ngày cập nhật mới:</div>
                    <div>{formatDate(detail.order.completeDate)}</div>
                  </div>

                  <div className="">
                    <div className="text-lg font-bold">Tổng đơn: </div>
                    <div>
                      {detail.postProductInOrder
                        .reduce(
                          (total, product) =>
                            total +
                            product.priceBought * product.quantity * 1000,
                          0
                        )
                        .toLocaleString("de-DE")}{" "}
                      VNĐ
                    </div>
                  </div>

                  <div className="">
                    <div className="text-lg font-bold">
                      Trạng thái đơn hàng:{" "}
                    </div>
                    <div>{detail.order.orderStatus.orderStatusName}</div>
                  </div>

                  <div className="">
                    <div className="text-lg font-bold">Payment:</div>
                    <div>{detail.order.paymentId}</div>
                  </div>

                  <div className="">
                    <div className="text-lg font-bold">Mã đơn: </div>
                    <div className="text-center">{detail.order.orderId}</div>
                  </div>
                </div>

                {/*Chi tiết đơn hàng */}
                {detail.postProductInOrder.map((product, prodIndex) => (
                  <div className="py-5 px-5 flex flex-row gap-4">
                    {/*Hình ảnh */}
                    <div className="h-36 w-36 border-2">
                      <img src={product.imageUrlProduct}></img>
                    </div>

                    <div className="w-[40%]">
                      <div className="pb-4">
                        <div className="font-semibold text-lg">
                          {product.productName}
                        </div>
                        <div className="flex-1 truncate">
                          {product.firstVariation}
                        </div>
                        {product.secondVariation && (
                          <div className="flex-1 truncate">
                            {product.secondVariation}
                          </div>
                        )}
                        <div className="mt-2">Số lượng: {product.quantity}</div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-end flex-grow text-lg font-medium">
                      <div className="text-[var(--color-tertiary)]">
                        Tổng giá trị sản phẩm:{" "}
                        {(
                          product.priceBought *
                          product.quantity *
                          1000
                        ).toLocaleString("de-DE")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


export default TransactionDetail