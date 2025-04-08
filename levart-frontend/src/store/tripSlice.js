import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  trip: null,
  titleOfDay: "",
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripInfo: (state, action) => {
      state.trip = action.payload;
    },
    resetTripInfo: (state) => {
      state.trip = null;
    },
    setTripTitle: (state, action) => {
      state.titleOfDay = action.payload;
    },
  },
});

export const { setTripInfo, resetTripInfo, setTripTitle } = tripSlice.actions;

export default tripSlice.reducer;
