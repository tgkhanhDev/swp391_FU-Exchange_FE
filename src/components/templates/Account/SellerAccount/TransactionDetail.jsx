import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { getOrderDetailBySellerIdThunk } from "../../../../store/orderManager/thunk"
import { useOrder } from "../../../../hooks/useOrder"
import { Button } from "antd"

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
      dispatch(getOrderDetailBySellerIdThunk({ sellerId: user.sellerTO.sellerId, orderId: orderId }))
    }
  }, [user])

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  console.log(orderDetailSeller)

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Chi tiết giao dịch</div>
          <div className="flex justify-start ml-5 my-4">
            <Button type="primary" className="flex justify-center items-center py-5 px-8 text-lg"
              onClick={() => {
                navigate(`/dashboard`);
              }}
            >Trở về</Button>
          </div>
          <div className="py-10 pr-6">
            {orderDetailSeller.postProductInOrder && orderDetailSeller.postProductInOrder.length > 0 && (
              orderDetailSeller.postProductInOrder.map((product, index) => (
                <div key={index}>
                  <div>{product.firstVariation}</div>
                  <div>{product.secondVariation}</div>
                  <div>{product.quantity}</div>
                  <div><img src={product.postProduct.product.detail.productImage[0].imageUrl} /></div>
                </div>
              ))
            )}

            {/*Đơn hàng */}

            <div className='bg-white rounded-3xl w-full h-full py-3 mb-8 border-2 border-slate-300'>
              {/*Thông tin cơ bản đơn hàng */}
              <div className="flex flex-row justify-around w-full border-b-2 border-b-slate-300 pb-3 mb-2">
                <div className="">
                  <div className="text-lg font-bold">Ngày đặt đơn: </div>
                  <div></div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Tổng đơn: </div>
                  <div> VNĐ</div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Trạng thái đơn hàng: </div>
                  <div></div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Payment:</div>
                  <div>Not yet</div>
                </div>

                <div className="">
                  <div className="text-lg font-bold">Mã đơn: </div>
                  <div className="text-center"></div>
                </div>

              </div>

              {/*Chi tiết đơn hàng */}
              <div className="py-5 px-5 flex flex-row gap-4">
                {/*Hình ảnh */}
                <div className='h-36 w-36 border-2'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2"></img>
                </div>

                <div className="w-[40%]">
                  <div className="pb-4">
                    <div className="font-semibold text-lg"></div>
                    <div>Màu sắc: Xanh ngọc</div>
                    <div>Số lượng: 1</div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end flex-grow text-lg font-medium">
                  <div className="text-[var(--color-tertiary)]">Tổng giá trị sản phẩm: 23,000 VNĐ</div>
                </div>
              </div>

            </div>


          </div>
        </div>
      </main>
    </div>
  )
}


export default TransactionDetail