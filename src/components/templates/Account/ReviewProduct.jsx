import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { Input, Button, Rate } from "antd";
import { getPostByIdThunk } from "../../../store/postManagement/thunk";
import { createReviewThunk } from "../../../store/reviewManager/thunk"
import { useAppDispatch } from "../../../store";
import { usePost } from "../../../hooks/usePost";
import { useAccount } from "../../../hooks/useAccount"
import './styles.css'

export const ReviewProduct = () => {
  const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
  const [value, setValue] = useState(5);

  const { postProductId, orderId } = useParams();
  const dispatch = useAppDispatch();
  const { postDetail } = usePost();
  const [post, setPost] = useState();
  const { studentInfo } = useAccount()
  const navigate = useNavigate();

  const postProductIdRef = postProductId;
  const orderIdRef = orderId;
  const ratingRef = value;
  const descripRef = useRef("");

  useEffect(() => {
    // Dispatch action để lấy thông tin bài đăng khi component được mount
    dispatch(getPostByIdThunk(postProductId)); // Gọi hàm getPostByIdThunk với postId từ useParams
  }, [dispatch]);

  useEffect(() => {
    if (postDetail) {
      setPost(postDetail);
    }
  }, [postDetail]);

  useEffect(() => {
    if (!studentInfo) {
      navigate("/*");
    }
  }, []);

  const hanldeClick = () => {
    dispatch(
      createReviewThunk({
        postProductId: postProductIdRef,
        orderId: orderIdRef,
        ratingNumber: ratingRef,
        description: descripRef.current,
      })
    );
  }

  return (
    <div className="py-6 px-28">
      <div className="text-3xl font-bold">Đánh giá</div>
      <div className="py-10 px-10 w-full">

        {/*Thông tin sản phẩm */}
        <div className="px-8 pb-5 flex gap-8 items-center border-b-2 border-slate-300">
          <div className='h-20 w-20 border-2'>
            <img src={post?.product.image[0].imageUrl} className="h-20 w-20"></img>
          </div>
          <div className="font-semibold text-xl">{post?.product.detail.productName}</div>
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
            <Input.TextArea style={{ height: '100px', fontSize: '1.125rem' }} placeholder="Tuyệt vời!"
              onChange={(e) => {
                descripRef.current = e.target.value;
              }}
            ></Input.TextArea>
          </div>
          <div className="flex justify-end gap-10">
            <NavLink to={'/authorize/order'}><Button className="custom-button-re text-lg font-semibold">Hủy</Button></NavLink>
            <Button type="primary" className="custom-button-re text-lg font-semibold"
              onClick={hanldeClick}
            >Gửi
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ReviewProduct