import React from "react";

type PostType = {
  postId: number;
};

export const PostDetail: React.FC<PostType> = ({ postId }) => {
  return <div>PostDetail</div>;
};

export default PostDetail;
