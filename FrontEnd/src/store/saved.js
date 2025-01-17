import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./URL";
const initialState = {
  isSaved: false,
  isLoading: false,
};
export const toggleSave = createAsyncThunk("toggleSave", async (data) => {
  const { blogId,coverURL,title } = data;
  const token = JSON.parse(localStorage.getItem("accToken"));
  const options = {
    blogId: blogId,
    accToken: token,
    title:title,
    coverURL:coverURL
  };
  try {
    const newUser = await axios.post(`${URL}/v1/s/savePost`, options);
    // console.log(newUser.data);
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const isSaved = createAsyncThunk("isSaved", async (data) => {
  const { blogId } = data;
  const token = JSON.parse(localStorage.getItem("accToken"));
  const options = {
    blogId: blogId,
    accToken: token,
    
  };
  try {
    const newUser = await axios.post(`${URL}/v1/s/isSaved`, options);
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
const follow = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleSave.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleSave.fulfilled, (state, action) => {
      state.isSaved = action.payload;
      state.isLoading = false;
    });
    builder.addCase(isSaved.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(isSaved.fulfilled, (state, action) => {
      state.isSaved = action.payload;
      state.isLoading = false;
    });
  },
});
export default follow.reducer;
