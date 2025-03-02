import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    currentUserId: null,
    products: [],
    cartQuantity: 0,
    totalPrice: 0,
    isFetching: false,
  },
  reducers: {
    setUserCart: (state, action) => {
      state.currentUserId = action.payload.userId;
      state.products = action.payload.products;
      state.cartQuantity = action.payload.cartQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    updateCartStart: (state) => {
      state.isFetching = true;
    },
    updateCart: (state, action) => {
      state.products = action.payload.products;
      state.cartQuantity = action.payload.cartQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.isFetching = false;
    },
    clearCart: (state) => {
      state.currentUserId = null;
      state.products = [];
      state.cartQuantity = 0;
      state.totalPrice = 0;
      state.isFetching = false;
    },
  },
});

export const { setUserCart, updateCartStart, updateCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
