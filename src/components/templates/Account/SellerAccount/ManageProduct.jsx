import React, { useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { Button } from "antd"
import { PlusOutlined } from '@ant-design/icons';

export const ManageProduct = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    else if (userInfo.role !== "Seller") {
      navigate('/authorize');
    }
  })

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Sản phẩm</div>
          <div className="flex justify-end mr-5">
            <NavLink to={'/dashboard/product/create'}>
            <Button type="primary" className="flex justify-center items-center py-5 px-4 text-lg">Tạo sản phẩm mới <PlusOutlined /></Button>
            </NavLink>
          </div>
          <div className="py-10 pr-6">

            {/*Header */}
            <div className='rounded-t-md h-16 w-full bg-white mb-5 grid grid-cols-12 gap-2 sticky top-32 z-10 shadow-lg'>
              <div className='col-span-1'></div>
              <div className='col-span-3 flex justify-center items-center font-semibold text-gray-700'>Tên sản phẩm</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Thể loại</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Đơn giá</div>
              <div className='col-span-1 flex justify-center items-center font-semibold text-gray-700'>Chi tiết</div>
              <div className='col-span-3 flex justify-center items-center font-semibold text-gray-700'>Thao tác</div>
            </div>

            {/* Card */}
            <div className='bg-white rounded-md w-full grid grid-cols-12 gap-2 mb-2 py-3'>

              <div className='col-span-1 flex justify-center items-center'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2" className='h-24 w-24 border-2 ml-4'></img>
              </div>

              <div className='col-span-3 flex justify-center items-center'>
                <div>Bút máy trường học chất lượng cao</div>
              </div>
              <div className='col-span-2 flex justify-center items-center'>
                <div>Dụng cụ học tập</div>
              </div>
              <div className='col-span-2 flex justify-center items-center'>
                <div>23,000 VNĐ</div>
              </div>
              <div className='col-span-1 flex justify-center items-center'>
                <Button type="link" className="text-base flex justify-center items-center">Chi tiết</Button>
              </div>
              <div className='col-span-3 flex justify-center items-center gap-2'>
                <NavLink to={'/dashboard/product/update'}>
                  <Button type="primary" className="flex justify-center items-center text-lg py-4 px-4">Chỉnh sửa</Button>
                </NavLink>
                <Button type="link" className="flex justify-center items-center text-base">Xóa</Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}


export default ManageProduct