import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { useAppDispatch } from "../../../store";
import { getPostByIdThunk } from "../../../store/postManagement/thunk";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
type PostType = {
  postId: number;
};

export const PostDetail: React.FC<PostType> = () => {

  //! test===========
  const { productId } = useParams();
  const [imageGrid, setImageGrid] = useState<
    { original: string; thumbnail: string }[]
  >([]);

  //! test===========
  const { postDetail } = usePost();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPostByIdThunk(parseInt(productId!)));
  }, []);

  useEffect(() => {
    const images: { original: string; thumbnail: string }[] = [];
    postDetail?.product.image.map((img) => {
      images.push({ original: img.imageUrl, thumbnail: img.imageUrl });
    });
    setImageGrid(images)
  }, [postDetail]);

  return (
    <div className="container">
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
          <div className="mt-3">{postDetail?.product.price}VND</div>
          <div className="min-h-[100px] my-5">
            {postDetail?.product.detail.description}
          </div>
          {/* author  */}
          <div className="">by Vendor Name</div>
          {/* end Author  */}
          {/* variation  */}
          <div className="flex items-start">
            <div className="flex items-center mr-5">
              {postDetail?.product.variation[0].variationName}
            </div>
            <div className="gap-2 w-[60%] flex flex-wrap">
              {postDetail?.product.variation.map((vari) => (
                <Button className="flex items-center px-2 py-1 border border-black rounded">
                  {vari.description}
                </Button>
              ))}
            </div>
          </div>
          {/* end variation  */}
          {/* button  */}

          <div className="flex">
            <Button>Add to cart</Button>
            <Button>Buy now</Button>
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
