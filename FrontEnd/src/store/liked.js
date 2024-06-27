import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./URL";
// const URL="  https://f4e0-182-69-182-255.ngrok-free.app "
const initialState = {
  isLiked: false,
  isLoading: false,
};
export const toggleLike = createAsyncThunk("toggleLike", async (data) => {
  const { blogId, title,coverURL } = data;
  // console.log("toggle like liked,js line 9", title);
  const token = JSON.parse(localStorage.getItem("accToken"));
  // const token = JSON.parse(localStorage.getItem("accToken"));
  const options = {
    title: title,
    blogId: blogId,
    accToken: token,
    coverURL:coverURL
  };
  try {
    const newUser = await axios.post(
      `${URL}/v1/l/toggleLike`,
      options
    );
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const isLiked = createAsyncThunk("isLiked", async (data) => {
  const { blogId } = data;
  const token = JSON.parse(localStorage.getItem("accToken"));
  const options = {
    blogId: blogId,
    accToken: token,
  };
  // console.log(options);
  try {
    const newUser = await axios.post(
      `${URL}/v1/l/isLiked/`,
      options
    );
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
const liked = createSlice({
  name: "liked",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleLike.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      console.log(action.payload.message);

      state.isLiked = action.payload;
      state.isLoading = false;
    });
    builder.addCase(isLiked.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isLiked.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLiked = action.payload;
      state.isLoading = false;
    });
  },
});
export default liked.reducer;
