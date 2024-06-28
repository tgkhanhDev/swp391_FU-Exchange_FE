import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { useEffect, useState } from "react";
import { getPostStatusThunk } from "../store/viewManager/thunk";
import { PostStatus } from "../types/order";

export const useView = () => {
  const { campus, postType, category } = useSelector(
    (state: RootState) => state.manageView
  );

  const [postStatus, setPostStatus] = useState<PostStatus[]>();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getPostStatusThunk()).then((item:any)=>{setPostStatus(item.payload.data)});
  },[])

  return { campus, postType, category, postStatus };
};
