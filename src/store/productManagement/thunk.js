import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageProduct } from "../../services/manageProduct";

export const getProductThunk = createAsyncThunk(
    "/product",
    async(_,{rejectWithValue } ) =>{
        try {
            const data = await manageProduct.getProject();
            return data.data
        } catch (error) {
            return rejectWithValue(error);
        }
    })