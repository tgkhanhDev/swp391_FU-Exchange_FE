import { Button } from "antd";
import React, { useEffect } from "react";
import { usePost } from "../../../hooks/usePost";
import { useAppDispatch } from "../../../store";
import { getPostByIdThunk } from "../../../store/postManagement/thunk";

type PostType = {
  postId: number;
};

export const PostDetail: React.FC<PostType> = ({ postId }) => {
  const {postDetail} = usePost();
  const dispatch = useAppDispatch()
  useEffect(()=> {
    dispatch(getPostByIdThunk(1));
  },[])
  return (
    <div className="container">
      <div className="flex gap-[10%]">
        <div className="w-[40%]">aaaa</div>
        <div className="w-[60%] flex flex-col">
          {/* title & report  */}
          <div className="flex">
            <div className="font-bold">Natural Honey Bottle</div>
          </div>
          {/* end title  */}
          <div className="">Price</div>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            soluta consequatur esse ea dolore a aliquid ducimus fugit animi
            exercitationem eligendi autem, repellendus sapiente vitae maiores
            iure rem accusamus quis?
          </div>
          {/* author  */}
          <div className="">by Vendor Name</div>
          {/* end Author  */}
          {/* variation  */}
          <div className="flex">
            <div className="">S</div>
            <div className="">M</div>
            <div className="">L</div>
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
