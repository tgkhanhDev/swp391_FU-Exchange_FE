import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useChat = () => {
  const { chatroom, chatDetail } =
    useSelector((state: RootState) => state.manageChat);
  return { chatroom, chatDetail };
};