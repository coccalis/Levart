import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/private";

const initialState = {
  groups: [],
  group: [],
  myGroups: [],
  joinedGroups: [],
  groupPosts: [],
  groupSearchData: [],
  deleteTrigger: false,
  isLoading: false,
  error: null,
};

export const fetchSearchGroupData = createAsyncThunk(
  "group/fetchSearchGroupData",
  async ({ searchInput }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/search-group?name=${searchInput}`,
        {
          headers: {
            "Content-Type": "application/json",
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

export const fetchGroups = createAsyncThunk(
  "group/fetchGroups",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/get-available-groups`, {
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

export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (groupId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/get-group?groupId=${groupId}`, {
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

export const fetchOwnedGroups = createAsyncThunk(
  "group/fetchOwnedGroups",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-owned-groups?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
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

export const fetchJoinedGroups = createAsyncThunk(
  "group/fetchJoinedGroups",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-joined-groups?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
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

export const fetchGroupPosts = createAsyncThunk(
  "group/fetchGroupPosts",
  async ({ groupId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/get-group-posts?groupId=${groupId}`,
        {
          headers: {
            "Content-Type": "application/json",
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

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setDeleteTrigger: (state, action) => {
      state.deleteTrigger = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchGroupData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchGroupData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupSearchData = action.payload;
      })
      .addCase(fetchSearchGroupData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.group = action.payload;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwnedGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOwnedGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myGroups = action.payload;
      })
      .addCase(fetchOwnedGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchJoinedGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJoinedGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.joinedGroups = action.payload;
      })
      .addCase(fetchJoinedGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroupPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupPosts = action.payload;
      })
      .addCase(fetchGroupPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setDeleteTrigger } = groupSlice.actions;

export default groupSlice.reducer;
