import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allCarts: [],
    allOrders: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    updateAllUsers: (state, action) => {
      state.allUsers = state.allUsers.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    removeUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload._id
      );
    },
    setAllCarts: (state, action) => {
      state.allCarts = action.payload;
    },
    removeCart: (state, action) => {
      state.allCarts = state.allCarts.filter(
        (cart) => cart.userId._id !== action.payload.userId
      );
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    removeOrder: (state, action) => {
      state.allOrders = state.allOrders.filter(
        (order) => order._id !== action.payload._id
      );
    },
    clearAdminState: (state) => {
      state.allUsers = [];
      state.allCarts = [];
      state.allOrders = [];
    },
  },
});

export const {
  setAllUsers,
  updateAllUsers,
  removeUser,
  setAllCarts,
  removeCart,
  setAllOrders,
  removeOrder,
  clearAdminState,
} = adminSlice.actions;
export default adminSlice.reducer;
