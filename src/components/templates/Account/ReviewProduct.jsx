import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { Input, Button, Rate } from "antd";
import './styles.css'

export const ReviewProduct = () => {
  const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
  const [value, setValue] = useState(5);

  return (
    <div className="py-6 px-28">
      <div className="text-3xl font-bold">Đánh giá</div>
      <div className="py-10 px-10 w-full">

        {/*Thông tin sản phẩm */}
        <div className="px-8 pb-5 flex gap-8 items-center border-b-2 border-slate-300">
          <div className='h-20 w-20 border-2'>
            <img src="https://firebasestorage.googleapis.com/v0/b/fu-exchange.appspot.com/o/Product1_1.jfif?alt=media&token=b33326cb-35d1-492b-8e58-b402ac8045c2"></img>
          </div>
          <div className="font-semibold text-xl">Iphone 11</div>
        </div>

        <div className="mt-8">
          <div>
            <div className="font-semibold text-2xl mb-5">Đánh giá của bạn</div>
            <Rate allowClear={false} className="text-2xl" onChange={setValue} value={value} />
            {value >= 4 ? <span className="text-xl ml-10 text-yellow-500 font-medium">{desc[value - 1]}</span> : <span className="text-xl ml-10 font-medium">{desc[value - 1]}</span>}
            {/*trừ 1 để đồng bộ với chỉ số của mảng*/}
          </div>
          <div className="mt-8 mb-4">
            <div className="font-semibold text-2xl mb-5">Viết đánh giá của bạn tại đây</div>
            <Input.TextArea style={{height: '100px', fontSize: '1.125rem'}} placeholder="Tuyệt vời!"></Input.TextArea>
          </div>
          <div className="flex justify-end gap-10">
            <NavLink to={'/authorize/order'}><Button className="custom-button-re text-lg font-semibold">Hủy</Button></NavLink>
            <Button type="primary" className="custom-button-re text-lg font-semibold">Gửi</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ReviewProduct