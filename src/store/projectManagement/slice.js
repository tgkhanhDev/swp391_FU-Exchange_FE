import { createSlice } from "@reduxjs/toolkit";
import { getProjectThunk } from "./thunk";

const initialState = {
    projects: []
};

export const manageProjectSlice = createSlice({
    name: "manageProject",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProjectThunk.fulfilled, (state, {payload} ) => {
            state.projects = payload;
        } )
    }
})

export const { reducer: manageUserReducer, actions: manageUserActions } = manageProjectSlice;