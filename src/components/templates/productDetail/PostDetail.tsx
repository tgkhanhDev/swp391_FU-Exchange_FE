import { Button } from "antd";
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
import FirebaseUpload from "../../../../thirdparty/FirebaseUpload";
type PostType = {
  postId: number;
};
export type DetailType = {
  [key: number]: number; // Định nghĩa kiểu cho object detail
};

export const PostDetail: React.FC<PostType> = () => {
  const { productId } = useParams();
  const [imageGrid, setImageGrid] = useState<
    { original: string; thumbnail: string }[]
  >([]);
  const { postDetail } = usePost();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostByIdThunk(parseInt(productId!)));
  }, []);

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

    console.log("length:::", Object.keys(detail).length);
  };

  useEffect(() => {
    console.log("detail:::", detail);
  }, [detail]);

  return (
    <div className="container">
      <FirebaseUpload />
      <div className="flex gap-[5%]">
        <div className="w-[40%]">
          <ImageGallery items={imageGrid} />
        </div>
        <div className="w-[60%] flex flex-col">
          {/* title & report  */}
          <div className="flex">
            <div className="font-bold">
              {postDetail?.product.detail.productName}
            </div>
          </div>
          {/* end title  */}
          <div className="my-1">{postDetail?.product.price}VND</div>
          <div className="min-h-[100px] my-3">
            {postDetail?.product.detail.description}
          </div>
          {/* author  */}
          <div className="my-1">by Vendor Name</div>
          {/* end Author  */}
          {/* variation  */}

          {postDetail?.product.variation.map((vari) => (
            <div className={`flex items-start my-3`} key={vari.variationId}>
              <div className="flex items-center mr-5">{vari.variationName}</div>
              <div className="gap-2 w-[60%] flex flex-wrap">
                {vari.variationDetail.map((variDetail) => {
                  return (
                    <Button
                      key={variDetail.variationDetailId}
                      onClick={() =>
                        updateDetail(
                          vari.variationId,
                          variDetail.variationDetailId
                        )
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
                  );
                })}
              </div>
            </div>
          ))}
          {/* end variation  */}
          {/* button  */}

          <div className="flex my-3 gap-3">
            <Button>Add to cart</Button>
            <Button
              onClick={() => {
                if (
                  postDetail &&
                  postDetail.product.variation.length >
                    Object.keys(detail).length
                ) {
                  alert("Chọn đủ đi");
                } else {
                  let prdId = postDetail?.product.productId;
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

                  navigate(PATH.payment);
                }
              }}
            >
              Buy now
            </Button>
            <Button>Quantity</Button>
          </div>
          {/* end button  */}
          {/* //! Review  */}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
