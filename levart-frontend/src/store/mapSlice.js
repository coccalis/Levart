import { toggle } from "@nextui-org/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/private";

const initialState = {
  mapCities: [],
  mapCountries: [],
  addCityForm: { lat: 0, lng: 0 },
  cityInfo: {},
  visitedCities: 0,
  visitedCountries: 0,
  viewVisitedCity: { lat: 0, lng: 0 },
  toggleAddCityForm: false,
  triggerRefresh: false,
  isLoading: false,
  error: null,
};

export const fetchMapCities = createAsyncThunk(
  "map/fetchMapCities",
  async ({ username }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/get-visited-cities?username=${username}`,
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

export const addMapCity = createAsyncThunk(
  "map/addMapCity",
  async (cityForm, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(`${BASE_URL}/add-visited-city`, cityForm, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("city added");
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const removeMapCity = createAsyncThunk(
  "map/removeMapCity",
  async (cityId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/remove-visited-city?cityId=${cityId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCountries: (state, action) => {
      state.mapCountries = action.payload;
    },
    setAddCityForm: (state, action) => {
      state.addCityForm = action.payload;
    },
    setToggleAddCityForm: (state, action) => {
      state.toggleAddCityForm = action.payload;
    },
    setCityInfo: (state, action) => {
      state.cityInfo = action.payload;
    },
    setVisitedCities: (state, action) => {
      state.visitedCities = action.payload;
    },
    setTriggerRefresh: (state, action) => {
      state.triggerRefresh = action.payload;
    },
    setViewVisitedCity: (state, action) => {
      state.viewVisitedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMapCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mapCities = action.payload;
        state.visitedCities = action.payload.length;
        state.visitedCountries = action.payload.reduce((acc, city) => {
          if (acc.indexOf(city.country) === -1) {
            acc.push(city.country);
          }
          return acc;
        }, []).length;
      })
      .addCase(fetchMapCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addMapCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMapCity.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addMapCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeMapCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeMapCity.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeMapCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setMapCountries,
  setAddCityForm,
  setToggleAddCityForm,
  setCityInfo,
  setVisitedCities,
  setViewVisitedCity,
  setTriggerRefresh,
} = mapSlice.actions;

export default mapSlice.reducer;
