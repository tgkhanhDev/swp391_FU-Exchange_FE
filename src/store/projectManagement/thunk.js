import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageProject } from "../../services/manageProject";

export const getProjectThunk = createAsyncThunk(
    "/project",
    async(_,{rejectWithValue } ) =>{
        try {
            const data = await manageProject.getProject();
            console.log("Data ne: ", data);
            return data.data
        } catch (error) {
            return rejectWithValue(error);
        }
    })