import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = " https://cec8-182-69-182-255.ngrok-free.app";
const initialState = {
  allComments: [],
  isLoading: true,
};

export const postComment = createAsyncThunk("postComment", async (data) => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  const { comment, blogId } = data;
  console.log(comment);
  const options = {
    comment: comment,
    blogId: blogId,
    accToken: token,
  };
  try {
    const newComm = await axios.post(`${URL}/v1/c/postComment`, options);
    return newComm.data;
  } catch (error) {
    throw error;
  }
});
export const deleteComment = createAsyncThunk("deleteComment", async (data) => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  const { commentId } = data;
  const options = {
    commentId: commentId,
    accToken: token,
  };
  try {
    const newComm = await axios.post(`${URL}/v1/c/deleteComment`, options);
    return newComm.data;
  } catch (error) {
    throw error;
  }
});

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.allComments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.allComments = action.payload;
      state.isLoading = false;
    });
  },
});
export default commentSlice.reducer;
