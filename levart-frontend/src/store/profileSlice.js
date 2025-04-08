import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/private";

const initialState = {
  followers: [],
  following: [],
  userPosts: [],
  connectedUserProfile: [],
  userProfile: [],
  suggestUsers: [],
  followingPosts: [],
  userAchievements: [],
  triggerRefreshPosts: false,
  uploadImge: null,
  deletePostAlert: false,
  isLoading: false,
  error: null,
};

export const fetchFollowers = createAsyncThunk(
  "profile/fetchFollowers",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-followers?emailOrUsername=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "profile/fetchFollowing",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-following?emailOrUsername=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const fetchSuggestedUsers = createAsyncThunk(
  "profile/fetchSuggestedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/suggest`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "profile/fetchUserPosts",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-posts?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const fetchConnectedUser = createAsyncThunk(
  "profile/fetchConnectedUser",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/get-connected-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
export const fetchUser = createAsyncThunk(
  "profile/fetchUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/get-user?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
export const uploadImage = createAsyncThunk(
  "profile/UplaodImage",
  async ({ form }, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const formData = new FormData();

      const response = await fetch(form.uri);
      const blob = await response.blob();

      const file = new File([blob], form.name || "default_name.jpg", {
        type: form.type || "image/jpeg",
        webkitRelativePath: form.uri,
      });
      console.log("file", file);
      formData.append("file", file);

      console.log("mpainw???");
      formData.forEach((value, key) => {
        if (key === "file") {
          // Log detailed file information
          console.log(
            `File details: Name: ${value.name}, Type: ${value.type}, URI: ${value.uri}`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      });

      await axios.put(`${BASE_URL}/upload-profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const fetchFollowingPosts = createAsyncThunk(
  "profile/fetchFollowingPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/get-followers-post`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const fetchUserAchievements = createAsyncThunk(
  "profile/fetchUserAchievements",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-achievements?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setDeletePostAlert: (state, action) => {
      state.deletePostAlert = action.payload;
    },
    setTriggerRefreshPosts: (state, action) => {
      state.triggerRefreshPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFollowing.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchConnectedUser.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchConnectedUser.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.connectedUserProfile = action.payload;
      })
      .addCase(fetchConnectedUser.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.userProfile = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.suggestUsers = action.payload;
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.uploadImge = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFollowingPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFollowingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followingPosts = action.payload;
      })
      .addCase(fetchFollowingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserAchievements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserAchievements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAchievements = action.payload;
      })
      .addCase(fetchUserAchievements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setDeletePostAlert, setTriggerRefreshPosts } =
  profileSlice.actions;

export default profileSlice.reducer;
