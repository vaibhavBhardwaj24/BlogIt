import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./URL";
const initialState = {
  findBlog: [],
  allBlogs: [],
  isLoading: true,
  blogSmall: [],
};
// if(localStorage.getItem("accToken")){
//   console.log(localStorage.getItem("accToken"));
// const token = JSON.parse(localStorage.getItem("accToken"));}
export const allBlogs = createAsyncThunk("allBlogs", async (data) => {
  try {
    const { lim } = data;
    const options = {
      lim: lim,
    };
    console.log(options);
    const response = await axios.post(
      `${URL}/v1/b/getBlogs`,
      options
    );
    // console.log(response.data);
    return response.data; // Access data directly from the Axios response
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
});
export const createBlog = createAsyncThunk("createBlog", async (data) => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  const { article, title, isPublic, coverURL } = data;
  console.log(data);
  const options = {
    title: title,
    article: article,
    isPublic: isPublic,
    accToken: token,
    coverURL: coverURL,
  };
  try {
    const newBlog = await axios.post(
      `${URL}/v1/b/createBlog`,
      options
    );
    return newBlog.data;
  } catch (error) {
    throw error;
  }
});
export const getBlogById = createAsyncThunk("getBlogById", async (data) => {
  const { blogId } = data;
  console.log(blogId);
  const options = {
    blogId: blogId,
  };
  try {
    const findBlog = await axios.post(
      `${URL}/v1/b/getBlogById`,
      options
    );
    console.log(findBlog.data);
    return findBlog.data;
  } catch (error) {
    throw error;
  }
});
export const blogSmall = createAsyncThunk("blogSmall", async (data) => {
  const { blogId } = data;
  const options = {
    blogId: blogId,
  };
  try {
    const blogSmall = await axios.post(
      `${URL}/v1/b/blogSmall`,
      options
    );
    return blogSmall.data;
  } catch (error) {
    throw error;
  }
});
export const deleteBlog = createAsyncThunk("deleteBlog", async (data) => {
  const token = JSON.parse(localStorage.getItem("accToken"));
  const { blogId } = data;
  const options = {
    accToken: token,
    blogId: blogId,
  };
  try {
    const findBlog = await axios.post(
      `${URL}/v1/b/deleteBlog`,
      options
    );
    return findBlog.data;
  } catch (error) {
    throw error;
  }
});
export const togglePublicBlog = createAsyncThunk(
  "togglePublicBlog",
  async (data) => {
    const token = JSON.parse(localStorage.getItem("accToken"));
    const { blogId, isPub } = data;
    const options = {
      accToken: token,
      blogId: blogId,
      isPub: isPub,
    };
    try {
      const togglePub = await axios.post(
        "${URL}/v1/b/togglePublic",
        options
      );
      return togglePub.data;
    } catch (error) {
      throw error;
    }
  }
);
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allBlogs.fulfilled, (state, action) => {
      state.allBlogs = action.payload;
      console.log(state.allBlogs);
      state.isLoading = false;
    });
    builder.addCase(allBlogs.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getBlogById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBlogById.fulfilled, (state, action) => {
      state.findBlog = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state) => {
      // state.findBlog = action.payload;
      state.isLoading = false;
    });
    builder.addCase(togglePublicBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(togglePublicBlog.fulfilled, (state,action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export default blogsSlice.reducer;
