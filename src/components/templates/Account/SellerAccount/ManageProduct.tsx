import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { Button, Input, Modal } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { deleteProductWarehouseByIdThunk, getProductByStudentIdThunk } from "../../../../store/productManagement/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useProduct } from "../../../../hooks/useProduct";
import CreatePostModal from "./ui/CreatePostModal";
import { toast } from "react-toastify";

export const ManageProduct = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const { wareHouse } = useProduct()
  const dispatch = useAppDispatch();
  const [itemQuantity, setItemQuantity] = useState<number>(6);
  const [filterName, setFilterName] = useState<string>("");
  //DetailModal
  const [openDetail, setOpenDetail] = React.useState<boolean>(false);

  const loadMorePost = () => {
    let newItemQuantity: number;
    // if (posts?.meta.total && itemQuantity + 6 > posts.meta.total) {
    //   newItemQuantity = posts?.meta?.total;
    // } else {
    // }
    newItemQuantity = itemQuantity + 6;
    setItemQuantity(newItemQuantity);
  };

  const handleSearch = (e) => {
    setFilterName(e.target.value);
  };

  const fetchProductWareHouse = () => {
    dispatch(getProductByStudentIdThunk({ current: itemQuantity, name: filterName, studentId: studentInfo.username }))
  }

  const [user, setUser] = useState('');

  useEffect(() => {

    fetchProductWareHouse()

    // dispatch(getProductByStudentIdThunk({ current: 5, name: "", studentId: studentInfo.username }))
    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: studentInfo.username,
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
  }, [itemQuantity, filterName])

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
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

          <div className="flex flex-col gap-3 mt-3 mr-5">
            <Input onChange={handleSearch} placeholder="Search Products..." />
          </div>

          <div className="py-10 pr-6">

            {/*Header */}
            <div className='rounded-t-md h-16 w-full bg-white mb-5 grid grid-cols-12 gap-2 sticky top-32 z-10 shadow-lg'>
              <div className='col-span-1'></div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Tên sản phẩm</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Thể loại</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Đơn giá</div>
              <div className='col-span-1 flex justify-center items-center font-semibold text-gray-700'>Chi tiết</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Thao tác</div>
              <div className='col-span-2 flex justify-center items-center font-semibold text-gray-700'>Tạo bài đăng</div>
            </div>

            {/* Card */}

            {wareHouse.map(product => {
              if (product.productStatus) {
                return <div className='bg-white rounded-md w-full grid grid-cols-12 gap-2 mb-2 py-3'>

                  <div className='col-span-1 flex justify-center items-center'>
                    <img src={product.image[0].imageUrl} className='h-24 w-24 border-2 ml-4'></img>
                  </div>

                  <div className='col-span-2 flex justify-center items-center'>
                    <div className="mx-2 text-center">{product.detail.productName}</div>
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
                  <div className='col-span-2 flex justify-center items-center gap-2'>
                    <CreatePostModal productId={product.productId} />
                  </div>

                  <div className='col-span-2 flex justify-center items-center gap-2'>
                    {/* <NavLink to={'/dashboard/product/update'}>
                      <Button type="primary" className="flex justify-center items-center text-lg py-4 px-4 rounded"
                        onClick={() => {
                          navigate(`/dashboard/product/update/${product.productId}`);
                        }}
                      >Chỉnh sửa</Button>
                    </NavLink> */}
                    <Button type="link" className="flex justify-center items-center text-base rounded"
                      onClick={() => {
                        dispatch(deleteProductWarehouseByIdThunk(product.productId)).then((data) => {
                          if (data.payload.status == 400) {
                            toast.error(data.payload.content)
                          } else {
                            toast.success(data.payload.content)
                            fetchProductWareHouse()
                          }
                        })
                      }}>Xóa</Button>
                  </div>

                </div>
              } else { return null }
            })}
            <Button
              onClick={loadMorePost}
              className="flex items-center justify-center m-auto text-[18px] my-10"
              style={{ width: "300px", height: "50px" }}
            >
              Load more products
              {/* <span className="italic text-xs">
                {" "}
                {posts?.meta?.current}/{posts?.meta?.total}
              </span> */}
            </Button>
          </div>
          {/* <Modal
            title={<p>Loading Modal</p>}
            footer={
              <Button type="primary">
                Reload
              </Button>
            }
            // loading={loading}
            open={openDetail}
            onCancel={() => setOpenDetail(false)}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal> */}
        </div>
      </main>
    </div>
  )
}


export default ManageProduct