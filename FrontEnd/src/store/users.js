import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./URL";
const initialState = {
  profile: [],
  foundUser: [],
  loggedUser: [],
  otherUser: [],
  isLoading2: false,
};

export const registerUser = createAsyncThunk("registerUser", async (data) => {
  const { username, email, fullName, avatar, password } = data;
  const options = {
    username: username,
    email: email,
    fullName: fullName,
    avatar: avatar,
    password: password,
    fullerName: fullName,
  };
  try {
    // console.log(options.fullName);
    const newUser = await axios.post(`${URL}/v1/user/register`, options);

    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const { username, password, email } = data;
  const options = {
    username: username,
    email: email,
    password: password,
  };
  // const token = loggedUser.accToken;

  try {
    const newUser = await axios.post(
      `${URL}/v1/user/login`,
      options
      // config
    );
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const findUser = createAsyncThunk("findUser", async (data) => {
  const { username } = data;

  const token = JSON.parse(localStorage.getItem("accToken"));
  const options = {
    username: username,
    accToken: token,
  };
  try {
    // console.log(username,"store");
    const newUser = await axios.post(`${URL}/v1/user/findUser`, options);
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const logoutUser = createAsyncThunk("logoutUser", async (data) => {
  try {
    // const token = JSON.parse(localStorage.getItem("accToken"));

    const { token } = data;
    console.log(initialState.loggedUser);
    const newUser = await axios.post(`${URL}/v1/user/logout`, {
      withCredentials: true,
      accToken: token,
    });
    console.log(newUser.data);
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    const token = initialState.loggedUser.accToken;
    const { oldPass, newPass } = data;
    const options = {
      oldPass: oldPass,
      newPass: newPass,
      accToken: token,
    };
    try {
      const newUser = await axios.post(
        `${URL}/v1/user/changePassword`,
        options
      );
      return newUser.data;
    } catch (error) {
      throw error;
    }
  }
);
export const currentUser = createAsyncThunk("currentUser", async () => {
  try {
    const token = JSON.parse(localStorage.getItem("accToken"));
    // const token = initialState.loggedUser.accToken;
    const newUser = await axios.post(`${URL}/v1/user/currUser`, {
      accToken: token,
    });
    // console.log("current mkc");
    return newUser.data;
  } catch (error) {
    throw error;
  }
});
export const otherUser = createAsyncThunk("otherUser", async (data) => {
  const { userId } = data;

  // console.log("qe");
  const options = {
    otherUser: userId,
  };
  try {
    const other = await axios.post(`${URL}/v1/user/otherProfile`, options);
    console.log(other.data);
    return other.data;
  } catch (error) {
    throw error;
  }
});
// export const profile = createAsyncThunk("profile", async (data) => {
//   const { id } = data;

//   try {
//     const newUser = await axios.get(
//       "${URL}/v1/user/findUser",

//     );
//     return newUser.data;
//   } catch (error) {
//     throw error;
//   }
// });
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading2 = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loggedUser = action.payload;
      state.isLoading2 = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading2 = false;
    });

    // login user

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading2 = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loggedUser = action.payload;
      state.isLoading2 = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading2 = false;
    });

    // find user

    builder.addCase(findUser.pending, (state) => {
      state.isLoading2 = true;
    });
    builder.addCase(findUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.foundUser = action.payload;
      state.isLoading2 = false;
    });
    builder.addCase(findUser.rejected, (state) => {
      state.isLoading2 = false;
    });

    // logout user

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading2 = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loggedUser = [];
      state.isLoading2 = false;
      console.log(state.loggedUser);
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading2 = false;
    });

    // change password

    builder.addCase(changePassword.pending, (state) => {
      state.isLoading2 = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
      state.isLoading2 = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.isLoading2 = false;
    });

    // current user

    builder.addCase(currentUser.pending, (state) => {
      // console.log("loading true");
      state.isLoading2 = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      // console.log(action.payload)

      state.loggedUser = action.payload;
      state.isLoading2 = false;
    });
    builder.addCase(currentUser.rejected, (state) => {
      state.isLoading2 = false;
    });

    // other user

    builder.addCase(otherUser.pending, (state) => {
      state.isLoading2 = true;
    });
    builder.addCase(otherUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.otherUser = action.payload;
      console.log(state.otherUser);
      state.isLoading2 = false;
    });
  },
});
export default userSlice.reducer;
