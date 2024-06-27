import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageOrder } from "../../services/manageOrder";
import { PaymentType, Orders } from "../../types/order";
import { manageModerator } from "../../services/manageModerator";
import { ModeratorGetPostFilter, ModeratorUpdateStatusPostProductFilter,  } from "../../types/post";

export const getAllPostByModeratorThunk = createAsyncThunk(
  "get_all_posts_by_moderator",
  async (payload: ModeratorGetPostFilter, { rejectWithValue }) => {
    try {
      const data = await manageModerator.getAllPostProduct(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStatusPostProductThunk = createAsyncThunk(
  "update_posts_by_moderator",
  async (payload: ModeratorUpdateStatusPostProductFilter, { rejectWithValue }) => {
    try {
      const data = await manageModerator.updateStatusPostProduct(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
