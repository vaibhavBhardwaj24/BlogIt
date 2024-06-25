import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL=" https://cec8-182-69-182-255.ngrok-free.app"
const initialState = {
  followers: [],
  following: [],
  isLoading: false,
  isfollow: false,
};

// const token = JSON.parse(localStorage.getItem("accToken"));
export const toggleFollow = createAsyncThunk("toggleFollow", async (data) => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  const { otherUserId, otherUserName } = data;
  const options = {
    otherUserId: otherUserId,
    otherUserName: otherUserName,
    accToken: token,
  };
  try {
    const newUser = await axios.post(
      `${URL}/v1/f/toggleFollow`,
      options
    );
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const allFollowers = createAsyncThunk("allFollowers", async () => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  try {
    const newUser = await axios.get(`${URL}/v1/f/allFollowers`, {
      accToken: token,
    });
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const allFollowing = createAsyncThunk("allFollowing", async () => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  try {
    const newUser = await axios.get(`${URL}/v1/f/allFollowing`, {
      accToken: token,
    });
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const isFollowing = createAsyncThunk("isFollowing", async (data) => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  const { otherUserId } = data;
  const options = {
    otherUserId: otherUserId,
    // otherUserName: otherUserName,
    accToken: token,
  };
  try {
    // console.log(options);
    const newUser = await axios.post(
      `${URL}/v1/f/isFollowed`,
      options
    );
    console.log(newUser.data.message);
    return newUser.data.message;
  } catch (error) {}
});
const follow = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleFollow.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleFollow.fulfilled, (state, action) => {
      state.isfollow = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allFollowers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allFollowing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allFollowing.fulfilled, (state, action) => {
      state.following = action.payload;
      state.isLoading = false;
    });
    builder.addCase(isFollowing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isFollowing.fulfilled, (state, action) => {
      state.isfollow = action.payload;
      state.isLoading = false;
    });
  },
});
export default follow.reducer;
