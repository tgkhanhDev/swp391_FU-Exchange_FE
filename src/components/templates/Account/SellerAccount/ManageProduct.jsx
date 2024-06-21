import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { Button } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useAccount } from "../../../../hooks/useAccount";
import { useProduct } from "../../../../hooks/useProduct";
import { useAppDispatch } from "../../../../store";
import { getProductBySellerIdThunk } from "../../../../store/productManagement/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";

export const ManageProduct = () => {
  const { product } = useProduct();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sellerId, setSellerId] = useState();

  const { studentInfo } = useAccount();

  useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
      return;
    } else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
      return;
    }

    if (studentInfo.registeredStudentId) {
      (async () => {
        try {
          const action = await dispatch(getSellerInfoThunk({
            RegisteredStudent: {
              Student: {
                studentId: studentInfo.username
              }
            }
          }));
          const { payload } = action;
          const { data } = payload || {};
          if (data && data.sellerId) {
            setSellerId(data.sellerId);
          }
        } catch (error) {
          console.error("Error fetching account information:", error);
        }
      })();
    }
  }, [studentInfo, navigate, dispatch]);

  // useEffect để gọi getProductBySellerIdThunk dựa trên sellerId
  useEffect(() => {
    if (sellerId) {
      dispatch(getProductBySellerIdThunk({
        seller: {
          sellerId: sellerId
        }
      }))
        .catch((error) => {
          console.error("Error fetching products by seller ID:", error);
        });
    }
  }, [sellerId, dispatch]);

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

            {product && product.length > 0 ? (
              product.map((pro) => (
                <div key={pro.productId}>
                  <p>product detail: {pro.detail.productName}</p>
                  <p>description: {pro.detail.description}</p>
                  <p>price: {pro.price}</p>
                  <div>
                    {pro.image.map((img) => (
                      <img key={img.productImageId} src={img.imageUrl} alt={pro.detail.productName} style={{ width: '100px', height: '100px' }} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}

            {/*Header */}
            <div className='rounded-t-md h-16 w-full bg-white mb-5 grid grid-cols-12 gap-4 sticky top-32 z-10 shadow-lg'>
              <div className='col-span-2'></div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Tên sản phẩm</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Thể loại</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Đơn giá</div>
              <div className='col-span-1 flex justify-center items-center font-semibold text-gray-700'>Chi tiết</div>
              <div className='col-span-3 flex justify-center items-center font-semibold text-gray-700'>Thao tác</div>
            </div>

            {/* Card */}

            {product && product.length > 0 ? (
              product.map((pro) => (
                <div key={pro.productId} className='bg-white rounded-md w-full grid grid-cols-12 gap-x-4 mb-4 py-3'>

                  <div className='col-span-2 flex justify-center items-center'>
                    <img key={pro.image[0].productImageId} src={pro.image[0].imageUrl} className='h-24 w-24 border-2 ml-4'></img>
                  </div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <div className="text-center">{pro.detail.productName}</div>
                  </div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <div>{pro.category.categoryName}</div>
                  </div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <div>{pro.price} VNĐ</div>
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
              ))
            ) : (
              <div className="text-red-500 text-xl font-medium flex justify-center items-center">NO PRODUCTS FOUND</div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}


export default ManageProduct