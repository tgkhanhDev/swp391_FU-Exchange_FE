import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Checkbox, InputNumber, Button } from "antd"
import './styles.css'
import { useAppDispatch } from '../../../store'
import { manageProductActions } from '../../../store/productManagement/slice'
import { useProduct } from "../../../hooks/useProduct";
import { getProductByIdThunk } from '../../../store/productManagement/thunk'

export interface PaymentItem {
  productId: number;
  variationList: number[];
  quantity: number;
}[]

export const Payment = () => {
  const dispatch =  useAppDispatch()
  const {products} = useProduct();

  useEffect(() => {
    // dispatch(manageProductActions.setProductEmpty());
    const paymentItem: PaymentItem = JSON.parse(
      localStorage.getItem("paymentItem") || ""
    );

  }, []);

  useEffect(() => {
    console.log("Product: ", products);
  }, [products]);


  return (
    <div>
      {/*Tựa đề */} 
      <div className='mb-8 pt-8 pl-32'>
        <div className='text-3xl font-bold'>Xác nhận thanh toán</div>
        <div className='text-lg mt-2'>Chưa sẵn sàng? &nbsp;<NavLink to={'/detail'} className={'underline text-[var(--color-primary)] duration-200 hover:text-black'}>Trở về</NavLink></div>
      </div>


      <div className='grid grid-cols-2 gap-32 px-32 pb-12'>

        {/*Thông tin */}
        <div>
          <div className='flex flex-row gap-4 border-b-2 border-slate-300 pb-5 mb-5'>
            <div className='h-32 w-32 border-2'>
              <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2"></img>
            </div>

            <div className='flex flex-col justify-between'>
              <div>
                <div className="font-semibold text-2xl">Iphone 11</div>
                <div>Màu sắc: Xanh ngọc</div>
                <div>Số lượng: 1</div>
              </div>
              <div className="font-medium text-lg">23,000 VNĐ</div>
            </div>

            <div className='flex flex-col justify-between items-end flex-grow '>
              <div className='flex flex-grow items-center justify-end w-full'>byVendorName</div>
              <div className='flex justify-end gap-10 text-lg'>
                <button className='underline text-[var(--color-primary)] duration-200 hover:text-black'>Chỉnh sửa</button>
                <button className='underline text-[var(--color-primary)] duration-200 hover:text-black'>Xóa</button>
              </div>
            </div>
          </div>
        </div>

        {/*Thanh toán */}
        <div>
          <div className='text-2xl font-semibold'>Tổng đơn hàng</div>
          <div className='text-lg'>
            <div className='py-5 border-b-2 border-black'>
              <div className='flex justify-between items-center'>
                <div>Tổng giá trị sản phẩm (1)</div>
                <div>23,000 VNĐ</div>
              </div>
              <div className='flex justify-between items-center'>
                <div>Phụ thu</div>
                <div>5,000 VNĐ</div>
              </div>
            </div>
            <div className='flex justify-between items-center py-5'>
              <div>Tổng</div>
              <div>28,000 VNĐ</div>
            </div>
          </div>

          {/*Các nút */}
          <div>
            <div className='text-with-lines'>TRẢ TIỀN KHI NHẬN HÀNG</div>
            <button className='px-12 py-3 font-medium bg-[var(--color-primary)] my-4 flex justify-center items-center text-white w-full hover:bg-white hover:text-[var(--color-primary)] duration-200'>Đặt hàng</button>
            <div className='text-with-lines'>HOẶC</div>
            <button className='px-12 py-3 font-medium bg-white flex my-4 gap-5 justify-between items-center hover:bg-slate-50 w-full duration-200'>Trả bằng QR VNPAY <img src='/images/logos/VNPAY.png'/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment