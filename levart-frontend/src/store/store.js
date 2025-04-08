import { configureStore } from "@reduxjs/toolkit";
import authRecuder from "./authSlice.js";
import browseReducer from "./browseSlice.js";
import profileReducer from "./profileSlice.js";
import groupSlice from "./groupSlice.js";
import mapSlice from "./mapSlice.js";
import tripSlice from "./tripSlice.js";

export const store = configureStore({
  reducer: {
    auth: authRecuder,
    browse: browseReducer,
    profile: profileReducer,
    group: groupSlice,
    map: mapSlice,
    trip: tripSlice,
  },
});
