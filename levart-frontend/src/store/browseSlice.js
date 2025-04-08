import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/public";

const initialState = {
  cities: [],
  hotels: [],
  activities: [],
  venues: [],
  cityNames: [],
  hotelNames: [],
  activityTitles: [],
  venueTitles: [],
  hotelsByCity: [],
  activitiesByCity: [],
  venuesByCity: [],
  searchResult: [],
  postsByCategory: [],
  postsByCity: [],
  searchData: [],
  isLoading: false,
  error: null,
};

export const fetchSearchData = createAsyncThunk(
  "browse/fetchSearchData",
  async ({ searchInput }, { rejectedWithValue }) => {
    if (!searchInput.trim()) return [];

    try {
      const res = await axios.get(
        `${BASE_URL}/get-search-data?searchInput=${searchInput}`
      );
      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data.message || "Failed to fetch search data"
      );
    }
  }
);

export const fetchCities = createAsyncThunk(
  "browse/fetchCities",
  async (_, { rejectedWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-cities`);
      return res.data.map((city) => ({ ...city, category: "city" }));
    } catch (error) {
      return rejectedWithValue(
        error.res.data.message || "Failed to fetch cities"
      );
    }
  }
);

export const fetchHotels = createAsyncThunk(
  "browse/fetchHotels",
  async (_, { rejectedWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-hotels`);
      return res.data.map((hotel) => ({ ...hotel, category: "hotel" }));
    } catch (error) {
      return rejectedWithValue(
        error.res.data.message || "Failed to fetch countries"
      );
    }
  }
);

export const fetchActivities = createAsyncThunk(
  "browse/fetchActivities",
  async (_, { rejectedWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-activities`);
      return res.data.map((activity) => ({
        ...activity,
        category: "activity",
      }));
    } catch (error) {
      return rejectedWithValue(
        error.res.data.message || "Failed to fetch countries"
      );
    }
  }
);
export const fetchVenues = createAsyncThunk(
  "browse/fetchVenues",
  async (_, { rejectedWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-venues`);
      return res.data.map((venue) => ({ ...venue, category: "venue" }));
    } catch (error) {
      return rejectedWithValue(
        error.res.data.message || "Failed to fetch countries"
      );
    }
  }
);

export const fetchByName = createAsyncThunk(
  "browse/fetchByName",
  async ({ category, name }, { rejectedWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-${category}-by-name?name=${name}`
      );
      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.res.data.message || `Failed to fetch ${category}`
      );
    }
  }
);

export const fetchPostByCategory = createAsyncThunk(
  "browse/fetchPostsByCategory",
  async ({ category }, { rejectedWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-post-by-category?category=${category}`
      );

      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data.message || `Failed to fetch posts for ${category}`
      );
    }
  }
);
export const fetchPostByCity = createAsyncThunk(
  "browse/fetchPostsByCity",
  async ({ city }, { rejectedWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-post-by-city?city=${city}`);

      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data.message || `Failed to fetch posts for ${city}`
      );
    }
  }
);

export const fetchHotelsByCity = createAsyncThunk(
  "browse/fetchHotelsByCity",
  async ({ city }, { rejectedWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-hotels-by-city?city=${city}`
      );

      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data.message || `Failed to fetch hotels by ${city}`
      );
    }
  }
);
export const fetchActivitiesByCity = createAsyncThunk(
  "browse/fetchActivitiesByCity",
  async ({ city }, { rejectedWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-activities-by-city?city=${city}`
      );

      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data.message || `Failed to fetch activities by ${city}`
      );
    }
  }
);
export const fetchVenuesByCity = createAsyncThunk(
  "browse/fetchVenuesByCity",
  async ({ city }, { rejectedWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-venues-by-city?city=${city}`
      );

      return res.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data.message || `Failed to fetch venues by ${city}`
      );
    }
  }
);

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //search data
      .addCase(fetchSearchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchData = action.payload;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //handle fetch countries
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
        state.cityNames = action.payload.map((city) => city.name);
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //handle fetch hotels
      .addCase(fetchHotels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hotels = action.payload;
        state.hotelNames = action.payload.map((hotel) => hotel.name);
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //handle fetch activities
      .addCase(fetchActivities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload;
        state.activityTitles = action.payload.map((activity) => activity.title);
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //handle fetch venues
      .addCase(fetchVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload;
        state.venueTitles = action.payload.map((venue) => venue.title);
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //search by name
      .addCase(fetchByName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(fetchByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //posts by category
      .addCase(fetchPostByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsByCategory = action.payload;
      })
      .addCase(fetchPostByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //posts by city
      .addCase(fetchPostByCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostByCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsByCity = action.payload;
      })
      .addCase(fetchPostByCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //hotels by city
      .addCase(fetchHotelsByCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHotelsByCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hotelsByCity = action.payload; // Use a specific state property
      })
      .addCase(fetchHotelsByCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //activities by city
      .addCase(fetchActivitiesByCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesByCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activitiesByCity = action.payload; // Use a specific state property
      })
      .addCase(fetchActivitiesByCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //venues by city
      .addCase(fetchVenuesByCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenuesByCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venuesByCity = action.payload; // Use a specific state property
      })
      .addCase(fetchVenuesByCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default browseSlice.reducer;
