import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccount } from "../../../../hooks/useAccount";
import { PostProduct } from "../../../../types/order";
import { useAppDispatch } from "../../../../store";
import { getPostByIdRegIdThunk } from "../../../../store/postManagement/thunk";
import { Button, Card } from 'antd';
import Meta from "antd/es/card/Meta";
import { deleteSellerPostProductThunk } from "../../../../store/userManagement/thunk";
import { toast } from "react-toastify";

export const Post = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const [postList, setPostList] = useState<PostProduct[]>([]);
  const dispatch = useAppDispatch();

  const fetchPostList = () => {
    dispatch(getPostByIdRegIdThunk(studentInfo.registeredStudentId)).then((post: any) => {
      // console.log("post:::", post.payload.data);
      setPostList(post.payload.data);
    })
  }

  useEffect(() => {
    if (!studentInfo) {
      navigate('/login');
    }
    else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
    fetchPostList();
  }, [])

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Bài đăng</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {postList.map((post, index) => {
              if (post.postStatus.postStatusId === 4)
                return (
                  <div key={index} className="flex justify-center">
                    <Card
                      className="w-full h-full flex flex-col"
                      hoverable
                      cover={<img alt="example" src={post.product.image[0].imageUrl} className="h-48 w-full object-cover" />}
                    >
                      <Meta
                        title={<span className="block h-12 overflow-hidden">{post.product.detail.productName}</span>}
                        description={
                          <div className="block">
                            <div className="mb-2">{post.product.detail.description}</div>
                            <div className="mb-2"><span className="font-bold">Giá: </span>{post.product.price}</div>
                            <div className="mb-4"><span className="font-bold">Số lượng: </span>{post.quantity}</div>
                            <div className="flex gap-2">
                              <Button
                                className="bg-blue-500 text-white rounded"
                                onClick={() => {
                                  const path = window.location.origin + `/detail/${post.postProductId}`;
                                  window.location.href = path;
                                }}
                              >
                                Xem chi tiết
                              </Button>
                              <Button
                                className="bg-red-500 text-white rounded"
                                onClick={() => {
                                  dispatch(deleteSellerPostProductThunk({ postProductId: post.postProductId, postStatusId: 5 })).then(() => {
                                    toast.success("Xóa thành công");
                                    fetchPostList();
                                  });
                                }}
                              >
                                Xóa bài
                              </Button>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </div>
                )
            })}
          </div>
          <div className="py-10 pr-6">

          </div>
        </div>
      </main>
    </div>
  )
}


export default Post