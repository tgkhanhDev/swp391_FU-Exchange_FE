import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Checkbox, InputNumber, Button } from "antd"
import './styles.css'
import { useAppDispatch } from '../../../store'
import { deleteItemCartThunk, updateItemCartThunk, viewCartThunk } from '../../../store/cartManager/thunk'
import { useAccount } from "../../../hooks/useAccount";
import { useCart } from "../../../hooks/useCart";
import { cartItem, deleteItemCartType, postProductToBuyRequest, updateItemCartType } from '../../../types/cart'
import { PaymentType, PostProductToBuyRequest } from '../../../types/order'
import { postPayCodThunk } from '../../../store/orderManager/thunk'
import { toast } from 'react-toastify'
import { setPayCart, setProductView } from "../../../store/productManagement/slice"
import { PATH } from '../../../constants/config'
import { ProductPaymentType } from '../../../types/product'

export const Cart = () => {

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]); // Initialize the state for the two checkboxes
  const { studentInfo } = useAccount();
  const { cartListFilter, cartList } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [updateList, setUpdateList] = useState<updateItemCartType[]>([]);

  const navigate = useNavigate();
  //STT post
  const sttOrder = useRef<number>(0)

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("cartListFilter:::", cartListFilter);
  }, [cartListFilter])

  useEffect(() => {
    if (!studentInfo) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(viewCartThunk(studentInfo?.registeredStudentId + ''))
  }, [])

  useEffect(() => {
    let calculatedTotalPrice = 0;
    cartListFilter.forEach(item => {
      if (item.sttPostInCart) {
        calculatedTotalPrice += item.postProduct.product.price * item.quantity * 1000;
      }
    });
    setTotalPrice(calculatedTotalPrice);
  }, [cartListFilter]);

  // Function to handle the change of the first checkbox
  const handleAllCheck = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    setCheckedItems(checkedItems.map(() => isChecked));
  };

  // Function to handle the change of individual checkboxesz
  const handleItemCheck = (index) => (e) => {
    const newCheckedItems: any = [...checkedItems];
    newCheckedItems[index] = e.target.checked;
    e.target.checked === false ? setAllChecked(false) : null;
    setCheckedItems(newCheckedItems);

    // If all checkboxes are checked, set the allChecked state to true, otherwise set it to false
    //setAllChecked(newCheckedItems.every((item) => item));
  };

 const handleUpdateAll = () => {
     (updateList.map(item => {
        dispatch(updateItemCartThunk({ ...item })).then(() => {
           dispatch(viewCartThunk(studentInfo?.registeredStudentId + ''));
        });
     }));

     toast.success("Cập nhật thành công!")
 }

  const handleBuyAll = () => {
    const postProductToBuyRequests: postProductToBuyRequest[] = []

    cartList.map((item, idx) => {
      postProductToBuyRequests.push(
        {
          sttOrder: item.sttPostInCart,
          postProductId: item.postProduct.postProductId,
          sellerId: item.postProduct.sellerId,
          variationId: item.variationDetail.variation.variationId,
          variationDetailId: item.variationDetail.variationDetailId,
          quantity: item.quantity,
          price: parseFloat(item.postProduct.product.price + ""),
        }
      )
    })

    const payload: PaymentType = {
      registeredStudentId: studentInfo.registeredStudentId,
      paymentMethodId: 1,
      description: "",
      postProductToBuyRequests: postProductToBuyRequests,
      orderMethod:"cart"
    }

    dispatch(setPayCart(payload)) //set for payment

    //For Render
    const productView: ProductPaymentType[] = []
    // const newVar
    cartListFilter.map((cart) => {
      const newVariation: any = []

      cart.variationDetail.map((item) => {
        newVariation.push({
          variationDetail: {
            variationDetailId: item.variationDetailId,//23
            description: item.description, //3XL
          },
          variationId: item.variation.variationId, //6
          variationName: item.variation.variationName, // Kich Thước
        })
      })

      productView.push({
        product: cart.postProduct.product,
        quantity: cart.quantity,
        variation: newVariation
      })
    })

    dispatch(setProductView(productView)) //set for Render
    navigate(PATH.payment)

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

              {/* <NavLink to={'/payment'}> */}
              <button onClick={handleBuyAll} className='px-14 py-3 text-base hover:text-[var(--color-secondary)] hover:bg-white font-semibold text-white bg-[var(--color-primary)] duration-300 hover:shadow-[inset_0_0_0_2px_var(--color-secondary)]'>
                Mua tất cả - {totalPrice}VNĐ
              </button>
              {/* </NavLink> */}

              <button onClick={handleUpdateAll} className='px-10 py-2 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] bg-white font-semibold hover:border-white duration-300'>
                Cập nhập
              </button>

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

          {cartListFilter.map((item) => {
            if (item.sttPostInCart) {
              return (
                <div className='bg-white rounded-md h-40 w-full grid grid-cols-12 gap-2 mb-2'>
                  <div className='col-span-1 flex justify-center items-center'><Checkbox
                    className="custom-checkbox"
                    checked={checkedItems[item.sttPostInCart]}
                    onChange={handleItemCheck(item.sttPostInCart)}
                  ></Checkbox></div>

                  <div className='col-span-4 flex items-center'>
                    <div className='flex gap-2'>
                      <img src={item.postProduct.product.image[0].imageUrl} className='h-32 w-32 border-2'></img>
                      <div className='flex items-center'>{item.postProduct.content}</div>
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-col justify-center items-center'>
                    {/* <div>Kích thước: </div>
                  <div>12cm</div> */}
                    {item.variationDetail.map(variation => {
                      return (
                        <div>
                          {variation.variation.variationName}: {variation.description}
                        </div>
                      )
                    })}
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <div>{item.postProduct.product.price} VNĐ</div>
                  </div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <InputNumber min={1} max={10} defaultValue={item.quantity}
                      onChange={
                        (value: number | any) => {
                          const updatePrd: updateItemCartType = {
                            cartId: item.cart.cartId,
                            quantity: value,
                            postProductId: item.postProduct.postProductId,
                            variationDetailId: item.variationDetail.map(detail => detail.variationDetailId)
                          }
                          // Check if the item with the same postProductId already exists
                          const existingIndex = updateList.findIndex(prd => prd.postProductId === updatePrd.postProductId);

                          if (existingIndex !== -1) {
                            // Update the existing item
                            const newUpdateList = [...updateList];
                            newUpdateList[existingIndex] = updatePrd;
                            setUpdateList(newUpdateList);
                          } else {
                            // Add the new item
                            setUpdateList([...updateList, updatePrd]);
                          }
                        }}></InputNumber>
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <div>{item.postProduct.product.price * item.quantity * 1000} VNĐ</div>
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <Button onClick={() => {

                      const variationDetailIds: number[] = []
                      item.variationDetail.map(variation => {
                        variationDetailIds.push(variation.variationDetailId)
                      })

                      const delItem = {
                        postProductId: item.postProduct.postProductId,
                        registeredStudentId: studentInfo.registeredStudentId,
                        variationDetailId: variationDetailIds
                      }
                      // console.log("delItem:", delItem);
                      dispatch(deleteItemCartThunk(delItem)).then(() => {
                        dispatch(viewCartThunk(studentInfo.registeredStudentId))
                      })
                      //view cart
                      // dispatch(viewCartThunk());
                      // dispatch(viewCartThunk(studentInfo.registeredStudentId))

                    }} type="link">Xóa</Button>
                  </div>
                </div>
              )
            }
          })}

        </div>
      </div>
    </div>
  )
}

export default Cart