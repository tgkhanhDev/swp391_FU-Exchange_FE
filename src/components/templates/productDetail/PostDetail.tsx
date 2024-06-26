import { Button, Select, Option } from "antd";
import React, { useEffect, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { useAppDispatch } from "../../../store";
import { getPostByIdThunk } from "../../../store/postManagement/thunk";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useNavigate, useParams } from "react-router-dom";
import { log } from "console";
import { PATH } from "../../../constants/config";
import { getProductByIdThunk, getProductByVariationDetailThunk } from "../../../store/productManagement/thunk";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { setProductQuantity, setTest } from "../../../store/productManagement/slice"
import { addToCartThunk } from "../../../store/cartManager/thunk";
import { getAccountInfoTypeThunk } from "../../../store/userManagement/thunk";
import { contactSeller } from "../../../store/chatManager/thunk";
import { useWishlist } from "../../../hooks/useWishlist"
import { viewWishlistThunk, createWishlistThunk } from "../../../store/wishlistManager/thunk"
import { format } from 'date-fns';
import { useAccount } from "../../../hooks/useAccount"
import { toast } from "react-toastify";
import { viewAllReviewThunk } from "../../../store/reviewManager/thunk"
import { useReview } from "../../../hooks/useReview"
import Rating from 'react-rating';
import '@fortawesome/fontawesome-free/css/all.min.css';

type PostType = {
  postId: number;
};
export type DetailType = {
  [key: number]: number; // Định nghĩa kiểu cho object detail
};

export const PostDetail: React.FC<PostType> = () => {
  const { postProductId } = useParams();
  const [imageGrid, setImageGrid] = useState<
    { original: string; thumbnail: string }[]
  >([]);
  const [quantity, setQuantity] = useState(1)
  const { postDetail } = usePost();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [showTable, setShowTable] = useState(false);
  const { view } = useWishlist();
  const { studentInfo } = useAccount();
  const { review } = useReview();

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const handleShowList = () => {
    setShowTable(prevShowTable => !prevShowTable)
  }


  const handleCreateWish = () => {
    dispatch(createWishlistThunk({
      registeredStudentId: studentInfo.registeredStudentId,
      postProductId: parseInt(postProductId),
      quantity: quantity
    }));
  }

  useEffect(() => {
    if (postProductId) {
      dispatch(getPostByIdThunk(parseInt(postProductId)));
      dispatch(viewWishlistThunk(parseInt(postProductId)));
      dispatch(viewAllReviewThunk(parseInt(postProductId)));
    }
  }, [dispatch]);


  useEffect(() => {
    if (view && view.length > 0) {
      const ids = view.map(item => item.registeredStudentId);

      ids.forEach(id => {
        dispatch(getAccountInfoTypeThunk(id))
          .then((action) => {
            const { payload } = action;
            const { data } = payload;
            setUser(prevUser => ({
              ...prevUser,
              [id]: data, // Assuming you want to store the data indexed by id
            }));
          })
          .catch((error) => {
            console.error("Error fetching account information:", error);
          });
      });
    }
  }, [view, dispatch]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy HH:mm:ss');
  };

  useEffect(() => {
    const images: { original: string; thumbnail: string }[] = [];
    postDetail?.product.image.map((img) => {
      images.push({ original: img.imageUrl, thumbnail: img.imageUrl });
    });
    setImageGrid(images);
  }, [postDetail]);

  const [detail, setDetail] = useState<DetailType>({});
  const updateDetail = (key, value) => {
    setDetail((prevDetail) => ({
      ...prevDetail,
      [key]: value,
    }));

    // console.log("length:::", Object.keys(detail).length);
  };

  // useEffect(() => {
  //   console.log("detail:::", detail);
  // }, [detail]);

  const contentCreate = `Tôi muốn thực hiện trao đổi đối với sản phẩm này: ${postDetail?.product.detail.productName}`

  const handleChat = () => {
    dispatch(contactSeller({
      registeredStudentId: studentInfo?.registeredStudentId,
      sellerId: postDetail?.product?.seller?.sellerId,
      content: contentCreate
    }))
      .then((action) => {
        const { payload } = action;
        if (payload.status === 200) {
          toast.success(`Gửi yêu cầu thành công! Liên hệ ${postDetail?.product.seller?.student.firstName} ${postDetail?.product.seller?.student.lastName} để biết thêm chi tiết nhé!`);
        } else {
          toast.error(`Gửi Yêu cầu trao đổi thất bại!`);
        }
      })
      .catch((error) => {
        toast.error("Error contacting seller. Please try again later.");
      });
  };

  const StarRating = ({ rating }) => {
    return (
      <Rating
        emptySymbol={<i className="far fa-star text-yellow-500 text-3xl"></i>}
        fullSymbol={<i className="fas fa-star text-yellow-500 text-3xl"></i>}
        fractions={10}
        initialRating={rating}
        readonly
      />
    );
  };

  const StarDetailRating = ({ rating }) => {
    return (
      <Rating
        emptySymbol={<i className="far fa-star text-yellow-500 text-xl"></i>}
        fullSymbol={<i className="fas fa-star text-yellow-500 text-xl"></i>}
        fractions={10}
        initialRating={rating}
        readonly
      />
    );
  };

  const { Option } = Select;

  const [sortOption, setSortOption] = useState("newest");
  const sortedReviews = review.reviews?.slice().sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    } else {
      return new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
    }
  });

  return (
    <div className="container">
      {/* <FirebaseUpload /> */}
      <div className="flex gap-[5%]">
        <div className="w-[40%]">
          <ImageGallery items={imageGrid} />
        </div>
        <div className="w-[60%] flex flex-col">
          {/* title & report  */}
          <div className="flex">
            <div className="font-bold text-4xl">
              {postDetail?.product.detail.productName}
            </div>
          </div>
          {/* end title  */}
          {(postDetail?.postType.postTypeId === 3) && (
            <div className="my-1">{postDetail?.product.price}VNĐ</div>
          )}
          <div className="min-h-[100px] my-3">
            {postDetail?.product.detail.description}
          </div>
          {/* author  */}
          <div className="my-1">
            <button onClick={() => {
              navigate(`/shop/${postDetail?.product.seller?.sellerId}`)
            }}><strong>Người đăng:</strong> <i className="text-lg underline">{postDetail?.product.seller?.student.firstName} {postDetail?.product.seller?.student.lastName}</i></button>
          </div>
          {/* end Author  */}
          {/* variation  */}

          {postDetail?.postType.postTypeId === 3 && (
            postDetail?.product.variation.map((vari) => (
              <div className={`flex items-start my-3`} key={vari.variationId}>
                <div className="flex items-center mr-5">{vari.variationName}</div>
                <div className="gap-2 w-[60%] flex flex-wrap">
                  {vari.variationDetail.map((variDetail) => (
                    <Button
                      key={variDetail.variationDetailId}
                      onClick={() =>
                        updateDetail(vari.variationId, variDetail.variationDetailId)
                      }
                      className={`flex items-center px-2 py-1 border rounded ${Object.entries(
                        detail
                      )
                        .map(([key, values]) => {
                          if (values == variDetail.variationDetailId) {
                            return "border-[var(--color-primary)] text-[var(--color-primary)] -translate-y-2";
                          }
                          return null;
                        })
                        .filter(Boolean)
                        .join(" ")}`}
                    >
                      {variDetail.description}
                    </Button>
                  ))}
                </div>
              </div>
            ))
          )}
          {/* end variation  */}
          {/* button  */}

          {postDetail?.postType.postTypeId === 3 && (
            <div className="flex my-3 gap-3">
              <Button onClick={() => {
                const userInfo = localStorage.getItem("userInfo");
                const student = userInfo ? JSON.parse(userInfo) : null;
                if (!student) {
                  alert("Sign in to Continue?")
                } else if (postDetail) {
                  console.log("studentID:", student.username);
                  console.log("postProductId:", postDetail?.postProductId);
                  console.log("variationId:",);
                  const variationList: number[] = [];
                  Object.entries(detail).map(([key, values]) => {
                    variationList.push(values);
                  });
                  let prdId = postDetail.product.productId;
                  dispatch(addToCartThunk({ studentId: student.username, postProductId: prdId, quantity: quantity, variationDetailId: variationList }))

                }

              }}>Thêm vào giỏ hàng</Button>
              <Button
                onClick={() => {
                  if (
                    postDetail &&
                    postDetail.product.variation.length >
                    Object.keys(detail).length
                  ) {
                    alert("Chọn đủ đi");
                  } else if (postDetail) {
                    let prdId = postDetail.product.productId;
                    const variationList: number[] = [];
                    Object.entries(detail).map(([key, values]) => {
                      variationList.push(values);
                    });
                    // let paymentItem = [{ productId: prdId, variationList: variationList, quantity: 1 }];
                    // localStorage.setItem(
                    //   "paymentItem",
                    //   JSON.stringify(paymentItem)
                    // );
                    // prdId? dispatch(getProductByIdThunk(prdId)): ""

                    dispatch(getProductByVariationDetailThunk(variationList));
                    dispatch(setProductQuantity({ id: prdId, quantity: quantity }));
                    navigate(PATH.payment, { state: { postProductId: parseInt(postProductId!) } });
                  }
                }}
              >
                Mua ngay
              </Button>
              <div className="flex items-center gap-2"><MinusOutlined onClick={() => quantity > 1 ? setQuantity(quantity - 1) : ""} />{quantity}<PlusOutlined onClick={() => setQuantity(quantity + 1)} /></div>
            </div>
          )}
          {postDetail?.postType.postTypeId === 2 && (
            <div className="flex my-3 gap-3">
              <Button type="primary" className="flex justify-center items-center px-4 py-6 text-lg font-semibold"
                onClick={handleChat}
              >Tôi muốn trao đổi</Button>
            </div>
          )}

          {postDetail?.postType.postTypeId === 1 && (
            <div className="flex my-3 gap-3">
              <Button type="primary" className="flex justify-center items-center px-4 py-6 text-lg font-semibold"
                onClick={handleCreateWish}
              >Tôi muốn được tặng</Button>
              <div className="flex items-center gap-2 ml-5"><MinusOutlined onClick={() => quantity > 1 ? setQuantity(quantity - 1) : ""} />
                <input
                  defaultValue={quantity}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-1 outline-none text-center w-16"
                />
                <PlusOutlined onClick={() => setQuantity(quantity + 1)} />
              </div>
            </div>
          )}
          {/* end button  */}
          {/* //! Review  */}
        </div>
      </div>
      {postDetail?.postType.postTypeId === 1 && (
        <div className="mt-20 flex justify-center items-center">
          {!showTable ? (
            <Button className="flex justify-center items-center px-2 py-4 text-base" onClick={handleShowList}>
              Hiện danh sách chờ
            </Button>
          ) : (
            <Button className="flex justify-center items-center px-2 py-4 text-base" onClick={handleShowList}>
              Ẩn danh sách chờ
            </Button>
          )}
        </div>
      )}
      {postDetail?.postType.postTypeId === 1 && showTable && (
        <div className="my-5">
          <div className="flex justify-center items-center font-semibold text-[var(--color-primary)] text-4xl">Danh sách chờ</div>
          <table className="min-w-full bg-white mt-5">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white border-[var(--color-bg-hightlight)]">
                <th className="py-5 px-2 text-center">Họ và tên</th>
                <th className="py-5 px-2 text-center">Thời gian đăng kí</th>
                <th className="py-5 px-2 text-center">Số lượng</th>
                <th className="py-5 px-2 text-center">Trạng thái hiện tại</th>
              </tr>
            </thead>
            {view && view.length > 0 && (
              <tbody>
                {view.map(item => (
                  <tr key={item.registeredStudentId} className="hover:bg-gray-50 duration-150">
                    <td className="py-5 px-2 text-center">{user[item.registeredStudentId]?.student.firstName} {user[item.registeredStudentId]?.student.lastName}</td>
                    <td className="py-5 px-2 text-center">{formatDate(item.createTime)}</td>
                    <td className="py-5 px-2 text-center">{item.quantity}</td>
                    {item.active ? (
                      <td className="py-5 text-green-500 font-semibold text-center">Đã được tặng</td>
                    ) : (
                      <td className="py-5 text-red-500 font-semibold text-center">Đang chờ được tặng</td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}
      <div className="my-28 px-4 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <div className="text-3xl font-semibold mb-4">Đánh giá</div>
          <div className="flex items-center mb-6">
            <StarRating rating={review.totalRating} />
            <div className="flex justify-center items-center text-xl ml-5">
              {review.totalReview} Đánh giá
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 ml-20">
          <div className="mb-6 mt-12 flex justify-end">
            <Select
              value={sortOption}
              onChange={(value) => setSortOption(value)}
            >
              <Option value="newest">Đánh giá mới nhất</Option>
              <Option value="oldest">Đánh giá cũ nhất</Option>
            </Select>
          </div>
          {sortedReviews?.map((rev) => (
            <div key={rev.review} className="mb-8 p-4 border border-gray-300 rounded-lg hover:bg-gray-200 duration-150">
              <div className="mb-2">
                <div className="font-semibold">{formatDate(rev.createTime)}</div>
              </div>
              <div className="mb-2">
                <StarDetailRating rating={rev.rating} />
              </div>
              <div className="mb-2">
                <span className="font-semibold">Đánh giá: </span>{rev.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
