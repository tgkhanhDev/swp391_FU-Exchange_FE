import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import { Button } from "antd"
import { EditOutlined } from '@ant-design/icons';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getProductByStudentIdThunk } from "../../../../store/productManagement/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useProduct } from "../../../../hooks/useProduct";

export const ProductDetailById = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const { wareHouse } = useProduct()
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const { productId } = useParams();

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
    if (user && user.sellerTO?.active === 2) {
      navigate('/*');
    }
  }, [user, navigate]);

  console.log(productId)

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Chi tiết sản phẩm</div>
          <div className="flex justify-end mr-5">
            <Button type="primary" className="flex justify-center items-center py-5 px-4 text-lg" 
            onClick={() => {
              navigate(`/dashboard/product/update/${productId}`);
            }}
            >Chỉnh sửa sản phẩm <EditOutlined /></Button>
          </div>
          <div className="py-10 pr-6">

          </div>
        </div>
      </main>
    </div>
  )
}


export default ProductDetailById