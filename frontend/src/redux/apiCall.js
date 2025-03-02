import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../baseUrl";
import { setUserCart, updateCart, updateCartStart } from "./cartRedux";
import {
  setAllCarts,
  setAllUsers,
  updateAllUsers,
  removeUser,
  removeCart,
  setAllOrders,
  removeOrder,
} from "./adminRedux";

/* ==========================
   USER API CALLS
   ========================== */

export const login = async (dispatch, body) => {
  dispatch(loginStart());

  try {
    const response = await publicRequest.post("/auth/login", body);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    // Extract error message from backend response (if available)
    const errorMessage = error.response?.data?.msg || "Something went wrong";

    /*
     * Dispatch a login failure action with the error message.
     * The backend (auth.js) send messages:
     * "Incorrect email or password"
     */
    dispatch(loginFailure(errorMessage));
  }
};

export const register = async (dispatch, body) => {
  dispatch(registerStart());

  try {
    const response = await publicRequest.post("/auth/register", body);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "Something went wrong";
    dispatch(registerFailure(errorMessage));
  }
};

export const fetchAllUsers = async (dispatch) => {
  try {
    const response = await userRequest.get("/user/");
    dispatch(setAllUsers(response.data.users));
  } catch (error) {
    console.error("Error fetching all users", error);
  }
};

export const updateUser = async (dispatch, userId, body) => {
  try {
    const response = await userRequest.put(`/user/${userId}`, body);
    dispatch(updateAllUsers(response.data.updatedUser));
  } catch (error) {
    console.error("Error updating user", error);
  }
};

export const deleteUser = async (dispatch, userId) => {
  try {
    const response = await userRequest.delete(`/user/${userId}`);
    dispatch(removeUser(response.data.deletedUser));
  } catch (error) {
    console.error("Error deleting user", error);
  }
};

/* ==========================
   CART API CALLS
   ========================== */

export const fetchUserCart = async (dispatch, userId) => {
  try {
    const response = await userRequest.get(`/cart/find/${userId}`);
    dispatch(setUserCart(response.data));
  } catch (error) {
    console.error("Error fetching user cart", error);
  }
};

export const fetchAllCarts = async (dispatch) => {
  try {
    const response = await userRequest.get("/cart");
    dispatch(setAllCarts(response.data));
  } catch (error) {
    console.error("Error fetching all carts", error);
  }
};

export const addProductToCart = async (dispatch, userId, body) => {
  dispatch(updateCartStart());

  try {
    const response = await userRequest.post(`/cart/${userId}`, body);
    dispatch(updateCart(response.data));
    return response;
  } catch (error) {
    console.error("Error adding product to cart", error);
  }
};

export const handleProductQuantity = async (dispatch, body) => {
  dispatch(updateCartStart());

  try {
    const { userId, productId, productSize, type } = body;
    const response = await userRequest.post(
      `/cart/${userId}/${productId}?type=${type}&size=${productSize}`
    );
    dispatch(updateCart(response.data));
  } catch (error) {
    console.error("Error increasing product quantity", error);
  }
};

export const clearUserCart = async (userId) => {
  try {
    await userRequest.put(`/cart/${userId}`);
  } catch (error) {
    console.error("Error clearing cart", error);
  }
};

export const removeProductFromCart = async (dispatch, body) => {
  dispatch(updateCartStart());

  try {
    const { userId, productId, productSize } = body;
    const response = await userRequest.delete(
      `/cart/${userId}/${productId}?size=${productSize}`
    );
    dispatch(updateCart(response.data));
  } catch (error) {
    console.error("Error removing product from cart", error);
  }
};

export const adminRemoveProductFromCart = async (body) => {
  try {
    const { userId, productId, productSize } = body;
    await userRequest.delete(
      `/cart/${userId}/${productId}?size=${productSize}`
    );
  } catch (error) {
    console.error("Error removing product from cart", error);
  }
};

export const deleteCart = async (dispatch, userId) => {
  try {
    const response = await userRequest.delete(`/cart/${userId}`);
    dispatch(removeCart(response.data));
  } catch (error) {
    console.error("Error deleting cart", error);
  }
};

/* ==========================
   PRODUCT API CALLS
   ========================== */

export const fetchProduct = async (productId) => {
  try {
    const response = await userRequest.get(`/product/find/${productId}`);
    return response.data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null to handle errors gracefully
  }
};

export const fetchProducts = async ({ category, filters, sort, limit }) => {
  try {
    const params = {
      category: category || undefined,
      title: filters?.title || undefined,
      size: filters?.size || undefined,
      sort: sort || undefined,
      limit: limit || undefined,
    };

    const response = await userRequest.get("/product", { params });
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (body) => {
  try {
    const response = await userRequest.post("/product", body);
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    await userRequest.delete(`/product/${productId}`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

/* ==========================
   ORDER API CALLS
   ========================== */

export const fetchUserOrders = async (userId) => {
  try {
    const response = await userRequest.get(`/order/find/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
};

export const fetchAllOrders = async (dispatch) => {
  try {
    const response = await userRequest.get(`/order`);
    dispatch(setAllOrders(response.data));
  } catch (error) {
    console.error("Error fetching all orders", error);
  }
};

export const updateOrder = async (orderId, body) => {
  try {
    await userRequest.put(`/order/${orderId}`, body);
  } catch (error) {
    console.error("Error updating order", error);
  }
};

export const deleteOrder = async (userId, orderId) => {
  try {
    const response = await userRequest.delete(`/order/${userId}/${orderId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting order", error);
  }
};

export const adminDeleteOrder = async (dispatch, userId, orderId) => {
  try {
    const response = await userRequest.delete(`/order/${userId}/${orderId}`);
    dispatch(removeOrder(response.data));
  } catch (error) {
    console.log("Error deleting order", error);
  }
};
