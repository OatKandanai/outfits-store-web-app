import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    isFetching: false,
    loginError: null,
    registerError: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.loginError = action.payload;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.registerError = null;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.registerError = action.payload;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  clearLoginError,
  registerStart,
  registerSuccess,
  registerFailure,
  clearRegisterError,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
