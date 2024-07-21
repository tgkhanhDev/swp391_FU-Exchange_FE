import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Checkbox, InputNumber, Button } from "antd";
import "./styles.css";
import { useAppDispatch } from "../../../store";
import { manageProductActions, setPayCart, setProductEmpty } from "../../../store/productManagement/slice";
import { useProduct } from "../../../hooks/useProduct";
import { getProductByIdThunk } from "../../../store/productManagement/thunk";
import { PATH } from "../../../constants/config";
import { PaymentType, PostProductToBuyRequestType } from "../../../types/order";
import { postPayCodThunk, postPayVnPayThunk } from "../../../store/orderManager/thunk";
import TextArea from "antd/es/input/TextArea";
import { useAccount } from "../../../hooks/useAccount";
import { toast } from "react-toastify";

export interface PaymentItem {
  productId: number;
  variationList: number[];
  quantity: number;
}
[];


export const Payment = () => {
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { productView, productQuantity, payCart } = useProduct();
  const { studentInfo } = useAccount()
  const navigate = useNavigate();
  const location = useLocation();
  const { postProductId } = location.state || {};

  useEffect(() => {
    if (!studentInfo) {
      navigate(-1)
      toast.error("Vui lòng đăng nhập để tiếp tục!")
    }

    window.addEventListener('unload', (e) => {
      e.preventDefault()
      navigate(-1)
    });

  }, [studentInfo, productView])

  useEffect(() => {    
    console.log("payCart:::", payCart);
    
    let price = 0;
    productView.forEach(product => {
      let prdPrice = parseInt(product.product.price) * product.quantity * 1000
      price += prdPrice
    });
    setTotalPrice(price);//Db need to * 1000 :D
  }, [productView]);

  const onPurchase = () => {
    if (payCart){
      dispatch(setPayCart(
        {
          ...payCart,
          paymentMethodId : 1,
          description : (document.getElementById("description") as HTMLInputElement).value
        }
      ))
    }


    dispatch(postPayCodThunk(payCart)).then(item => {
      if (item.payload.status == 400) {
        toast.error(item.payload.content)
      } else {
        toast.success(item.payload.content)
      }
    })
  }


  const onPurchaseVnPay = () => {
    if (payCart) {
      dispatch(setPayCart(
        {
          ...payCart,
          paymentMethodId: 2,
          description: (document.getElementById("description") as HTMLInputElement).value
        }
      ))
    }
    dispatch(postPayVnPayThunk(payCart)).then((response) => {
      window.location.href = response.payload.paymentUrl;
    });

  }

  return (
    <div>
      {/*Tựa đề */}
      <div className="mb-8 pt-8 pl-32">
        <div className="text-3xl font-bold">Xác nhận thanh toán</div>
        <div className="text-lg mt-2">
          Chưa sẵn sàng? &nbsp;
          <NavLink
            to={"/detail"}
            className={
              "underline text-[var(--color-primary)] duration-200 hover:text-black"
            }
            onClick={() => dispatch(setProductEmpty())}
          >
            Trở về
          </NavLink>
        </div>
      </div>

      {/*Thông tin */}

      <div className="grid grid-cols-2 gap-32 px-32 pb-12">
        <div className="row">
          {productView.map((product) => {
            return (
              <div key={product.product.productId} className="flex flex-row gap-4 border-b-2 border-slate-300 pb-5 mb-5">
                <div className="w-32 border-2">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                    src={product.product.image[0].imageUrl}
                  ></img>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-2xl">
                      {product.product.detail?.productName}
                    </div>
                    {product.variation.map(variation =>
                      <div><span className="mr-1 font-bold">{variation.variationName}</span>:{variation.variationDetail.description}</div>
                    )}
                    <div><span className="mr-1 font-bold">Số lượng:</span> {product.quantity ||
                    productQuantity[product.product.productId]}</div>
                  </div>
                  <div className="font-medium text-lg"><span className="mr-1 font-bold">Giá: </span>{product?.product.price}</div>
                </div>
              </div>
            );
          })}
        </div>


        {/*Thanh toán */}
        <div>
          <div className="text-2xl font-semibold">Tổng đơn hàng</div>
          <div className="text-lg">
            <div className="py-5 border-b-2 border-black">
              {productView.map((product, index) => {
                return (
                  <div className="flex justify-between items-center">
                    <div>Tổng giá trị sản phẩm ({index + 1})</div>
                    <div>{parseInt(product.product.price) * product.quantity * 1000} VNĐ</div>
                  </div>
                )
              })}

            </div>
            <div className="flex justify-between items-center py-5">
              <div>Tổng</div>
              <div>{totalPrice} VNĐ</div>
              
            </div>
          </div>
          {/* Description  */}
          <div className="my-5">
            <div className="text-with-lines">LỜI NHẮN CHO ĐƠN VỊ VẬN CHUYỂN</div>
            <TextArea id="description" rows={4} showCount maxLength={255} />
          </div>

          {/*Các nút */}
          <div>
            <div className="text-with-lines">TRẢ TIỀN KHI NHẬN HÀNG</div>
            <button onClick={onPurchase} className="px-12 py-3 font-medium bg-[var(--color-primary)] my-4 flex justify-center items-center text-white w-full hover:bg-white hover:text-[var(--color-primary)] duration-200">
              Đặt hàng
            </button>
            <div className="text-with-lines">HOẶC</div>
            <button onClick={onPurchaseVnPay} className="px-12 py-3 font-medium bg-white flex my-4 gap-5 justify-between items-center hover:bg-slate-50 w-full duration-200">
              Trả bằng VNPAY <img src="/images/logos/VNPAY.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;