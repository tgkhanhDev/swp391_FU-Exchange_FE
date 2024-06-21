import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Checkbox, InputNumber, Button } from "antd"
import './styles.css'
import { useAppDispatch } from "../../../store";
import { getItemCartThunk } from "../../../store/cartManager/thunk";
import { useCart } from "../../../hooks/useCart";

export const Cart = () => {

  const { viewCart } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([false, false]); // Initialize the state for the two checkboxes

  // Function to handle the change of the first checkbox
  const handleAllCheck = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    setCheckedItems(checkedItems.map(() => isChecked));
  };

  // Function to handle the change of individual checkboxes
  const handleItemCheck = (index) => (e) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = e.target.checked;
    setCheckedItems(newCheckedItems);

    // If all checkboxes are checked, set the allChecked state to true, otherwise set it to false
    setAllChecked(newCheckedItems.every((item) => item));
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (userInfo) {
      dispatch(getItemCartThunk({ studentId: userInfo.username }));
    }
  }, [dispatch]);

  return (
    <div>
      <div className='my-12 mx-12'>
        <div className='flex justify-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Giỏ hàng</div>

            <div className='flex justify-center items-center gap-10'>

              {Array.isArray(viewCart) && viewCart.length > 0 ? (
                viewCart.map(item => (
                  <div key={item.cartPostId.cartId}>
                    <h3>Product: {item.postProduct.product.detail.productName}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.postProduct.product.price}</p>
                    <p>Seller: {item.postProduct.product.seller.student.firstName} {item.postProduct.product.seller.student.lastName}</p>
                    <p>Category: {item.postProduct.product.category.categoryName}</p>
                    <p>Post Type: {item.postProduct.postType.postTypeName}</p>
                    <p>Campus: {item.postProduct.campus.campusName}</p>
                    <p>Status: {item.postProduct.postStatus.postStatusName}</p>
                    <p>Variation: {item.variationDetail.description}</p>
                  </div>
                ))
              ) : (
                <p>No cart found.</p>
              )}

              <NavLink to={'/detail'}>
                <button className='px-10 py-2 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] bg-white font-semibold hover:border-white duration-300'>
                  Tiếp tục mua hàng
                </button>
              </NavLink>

              <NavLink to={'/payment'}>
                <button className='px-14 py-3 text-base hover:text-[var(--color-secondary)] hover:bg-white font-semibold text-white bg-[var(--color-primary)] duration-300 hover:shadow-[inset_0_0_0_2px_var(--color-secondary)]'>
                  Mua tất cả - 23,000VNĐ
                </button>
              </NavLink>

            </div>

          </div>
        </div>

        <div>
          {/*Header */}
          <div className='rounded-t-md h-16 w-full bg-white mb-5 grid grid-cols-12 gap-2 sticky top-32 z-10 shadow-lg'>

            <div className='col-span-1 flex justify-center items-center'><Checkbox
              className="custom-checkbox"
              checked={allChecked}
              onChange={handleAllCheck}></Checkbox></div>

            <div className='col-span-4 flex justify-center items-center font-semibold text-gray-70'>Sản phẩm</div>
            <div className='col-span-2 flex justify-center items-center font-semibold text-gray-70'>Phân loại</div>
            <div className='col-span-1 flex justify-center items-center font-semibold text-gray-70'>Đơn giá</div>
            <div className='col-span-2 flex justify-center items-center font-semibold text-gray-70'>Số lượng</div>
            <div className='col-span-1 flex justify-center items-center font-semibold text-gray-70'>Số tiền</div>
            <div className='col-span-1 flex justify-center items-center font-semibold text-gray-70'>Thao tác</div>
          </div>

          {/*Card */}
          <div className='bg-white rounded-md h-40 w-full grid grid-cols-12 gap-2 mb-2'>

            <div className='col-span-1 flex justify-center items-center'><Checkbox
              className="custom-checkbox"
              checked={checkedItems[0]}
              onChange={handleItemCheck(0)}
            ></Checkbox></div>

            <div className='col-span-4 flex items-center'>
              <div className='flex gap-2'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2" className='h-32 w-32 border-2'></img>
                <div className='flex items-center'>Bút máy trường học chất lượng cao</div>
              </div>
            </div>
            <div className='col-span-2 flex flex-col justify-center items-center'>
              <div>Kích thước: </div>
              <div>Cá chà bặc</div>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <div>23,000 VNĐ</div>
            </div>
            <div className='col-span-2 flex justify-center items-center'>
              <InputNumber min={1} max={10} defaultValue={3}></InputNumber>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <div>23,000 VNĐ</div>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <Button type="link">Delete</Button>
            </div>
          </div>

          <div className='bg-white rounded-md h-40 w-full grid grid-cols-12 gap-2'>

            <div className='col-span-1 flex justify-center items-center'><Checkbox
              className="custom-checkbox"
              checked={checkedItems[1]}
              onChange={handleItemCheck(1)}
            ></Checkbox></div>

            <div className='col-span-4 flex items-center'>
              <div className='flex gap-2'>
                <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2" className='h-32 w-32 border-2'></img>
                <div className='flex items-center'>Bút máy trường học chất lượng cao</div>
              </div>
            </div>
            <div className='col-span-2 flex flex-col justify-center items-center'>
              <div>Kích thước: </div>
              <div>Cá chà bặc</div>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <div>23,000 VNĐ</div>
            </div>
            <div className='col-span-2 flex justify-center items-center'>
              <InputNumber min={1} max={10} defaultValue={3}></InputNumber>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <div>23,000 VNĐ</div>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <Button type="link">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart