import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Checkbox, InputNumber, Button } from "antd"
import './styles.css'
import { useAppDispatch } from '../../../store'
import { viewCartThunk } from '../../../store/cartManager/thunk'
import { useAccount } from "../../../hooks/useAccount";
import { useCart } from "../../../hooks/useCart";

export const Cart = () => {

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([false, false]); // Initialize the state for the two checkboxes
  const { studentInfo } = useAccount();
  const { cartList } = useCart();

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(viewCartThunk(studentInfo.registeredStudentId))
  }, [])

  // Function to handle the change of the first checkbox
  const handleAllCheck = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    setCheckedItems(checkedItems.map(() => isChecked));
  };

  // Function to handle the change of individual checkboxesz
  const handleItemCheck = (index) => (e) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = e.target.checked;
    setCheckedItems(newCheckedItems);

    // If all checkboxes are checked, set the allChecked state to true, otherwise set it to false
    setAllChecked(newCheckedItems.every((item) => item));
  };

  const handleBuyAll = () => {
  }

  return (
    <div>
      <div className='my-12 mx-12'>
        <div className='flex justify-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Giỏ hàng</div>

            <div className='flex justify-center items-center gap-10'>

              <NavLink to={'/detail'}>
                <button className='px-10 py-2 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] bg-white font-semibold hover:border-white duration-300'>
                  Tiếp tục mua hàng
                </button>
              </NavLink>

              <NavLink to={'/payment'}>
                <button onClick={handleBuyAll} className='px-14 py-3 text-base hover:text-[var(--color-secondary)] hover:bg-white font-semibold text-white bg-[var(--color-primary)] duration-300 hover:shadow-[inset_0_0_0_2px_var(--color-secondary)]'>
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

          {cartList.map(item => {
            return (
              <div className='bg-white rounded-md h-40 w-full grid grid-cols-12 gap-2 mb-2'>

                <div className='col-span-1 flex justify-center items-center'><Checkbox
                  className="custom-checkbox"
                  checked={checkedItems[0]}
                  onChange={handleItemCheck(0)}
                ></Checkbox></div>

                <div className='col-span-4 flex items-center'>
                  <div className='flex gap-2'>
                    <img src={item.postProduct.product.image[0].imageUrl} className='h-32 w-32 border-2'></img>
                    <div className='flex items-center'>{item.postProduct.content}</div>
                  </div>
                </div>
                <div className='col-span-2 flex flex-col justify-center items-center'>
                  <div>Kích thước: </div>
                  <div>12cm</div>
                </div>
                <div className='col-span-1 flex justify-center items-center'>
                  <div>{item.postProduct.product.price} VNĐ</div>
                </div>
                <div className='col-span-2 flex justify-center items-center'>
                  <InputNumber min={1} max={10} defaultValue={item.postProduct.quantity}></InputNumber>
                </div>
                <div className='col-span-1 flex justify-center items-center'>
                  <div>{item.postProduct.product.price * item.postProduct.quantity * 1000} VNĐ</div>
                </div>
                <div className='col-span-1 flex justify-center items-center'>
                  <Button type="link">Delete</Button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Cart