import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const URL_auth = "http://localhost:8080/api/v1/levart/auth";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

const checkTokenValidity = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp >= currentTime;
  } catch {
    return false;
  }
};

const tokenFromStorage = getToken();
const isValidToken = checkTokenValidity(tokenFromStorage);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    token: isValidToken ? tokenFromStorage : null,
    isAuthenticated: isValidToken,
    user: isValidToken ? jwtDecode(tokenFromStorage) : null,
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    signupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

export const signupUser =
  ({ userData }) =>
  async (dispatch) => {
    dispatch(signupRequest());
    console.log("eimai mesa sto register: ", userData);
    try {
      const response = await axios.post(URL_auth + "/register", userData);
      const { token } = response.data;
      const user = jwtDecode(token);

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch(signupSuccess({ user, token }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      dispatch(signupFailure(errorMessage));
    }
  };

export const loginUser =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post(URL_auth + "/authenticate", {
        email,
        password,
      });
      const { token } = response.data;
      const user = jwtDecode(token);

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  dispatch(logout());
};
