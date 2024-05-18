import { createSlice } from "@reduxjs/toolkit";
import { getProductThunk } from "./thunk";

const initialState = {
    products: []
};

export const manageProductSlice = createSlice({
    name: "manageProduct",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProductThunk.fulfilled, (state, {payload} ) => {
            state.products = payload;
        } )
    }
})

export const { reducer: manageProductReducer, actions: manageUserActions } = manageProductSlice;