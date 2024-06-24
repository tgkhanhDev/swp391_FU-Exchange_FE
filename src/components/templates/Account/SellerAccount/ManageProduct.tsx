import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { Button } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getProductByStudentIdThunk } from "../../../../store/productManagement/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useProduct } from "../../../../hooks/useProduct";

export const ManageProduct = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const { wareHouse } = useProduct()
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');

  useEffect(() => {
    dispatch(getProductByStudentIdThunk({ current: 5, name: "", studentId: studentInfo.username }))
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

    if (!studentInfo) {
      navigate('/login');
    }
    else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
  }, [])

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0) ) {
      navigate('/*');
    }
  }, [user, navigate]);

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

            {wareHouse.map(product => {
              return <div className='bg-white rounded-md w-full grid grid-cols-12 gap-2 mb-2 py-3'>

                <div className='col-span-1 flex justify-center items-center'>
                  <img src={product.image[0].imageUrl} className='h-24 w-24 border-2 ml-4'></img>
                </div>

                <div className='col-span-3 flex justify-center items-center'>
                  <div>{product.detail.productName}</div>
                </div>
                <div className='col-span-2 flex justify-center items-center'>
                  <div>{product.category.categoryName}</div>
                </div>
                <div className='col-span-2 flex justify-center items-center'>
                  <div>{product.price} VNĐ</div>
                </div>
                <div className='col-span-1 flex justify-center items-center'>
                  <Button type="link" className="text-base flex justify-center items-center" onClick={() => {
                          navigate(`/dashboard/product/${product.productId}`);
                        }}>Chi tiết</Button>
                </div>
                <div className='col-span-3 flex justify-center items-center gap-2'>
                  <NavLink to={'/dashboard/product/update'}>
                    <Button type="primary" className="flex justify-center items-center text-lg py-4 px-4"
                    onClick={() => {
                      navigate(`/dashboard/product/update/${product.productId}`);
                    }}
                    >Chỉnh sửa</Button>
                  </NavLink>
                  <Button type="link" className="flex justify-center items-center text-base">Xóa</Button>
                </div>
              </div>
            })}
          </div>
        </div>
      </main>
    </div>
  )
}


export default ManageProduct