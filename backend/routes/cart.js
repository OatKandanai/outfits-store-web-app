import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import Cart from "../models/Cart.js";

const cartRouter = express.Router();

// Get all users carts , Only accessible to an admin
cartRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Fetch all carts from the database
    const carts = await Cart.find().populate("userId", "email");

    // Response
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error getting all users carts:", error);
    res.status(500).json({
      msg: "An unexpected error occurred while getting all users carts",
    });
  }
});

// Get user's cart by userId , Accessible to all users
cartRouter.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find the cart by userId
      let cart = await Cart.findOne({ userId: userId });

      // Create new cart if not found
      if (!cart) {
        cart = new Cart({
          userId: userId,
          products: [],
          cartQuantity: 0,
          totalPrice: 0,
        });
      }

      // Save cart
      await cart.save();

      // Response
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error getting cart:", error);
      res.status(500).json({ msg: "An error occurred while getting the cart" });
    }
  }
);

// Add product to cart , Accessible to all users
cartRouter.post("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userId = req.params.userId;
    let { _id, size, price, quantity } = req.body;

    price = Number(price);
    quantity = Number(quantity);

    // Find the cart by userId
    let cart = await Cart.findOne({ userId: userId });

    // Create new cart if not found
    if (!cart) {
      cart = new Cart({
        userId: userId,
        products: [],
        cartQuantity: 0,
        totalPrice: 0,
      });
    }

    // Find existing product in cart (Same ID & Size)
    // Different size will count as different product
    const existingProduct = cart.products.find(
      (product) => product._id.toString() === _id && product.size === size
    );

    // Already existing product
    if (existingProduct) {
      existingProduct.quantity += quantity;
      cart.totalPrice += price * quantity;
    }
    // New product
    else {
      cart.products.push(req.body);
      cart.cartQuantity += 1;
      cart.totalPrice += price * quantity;
    }

    // Force Mongoose to detect changes
    cart.markModified("products");

    // Save cart
    await cart.save();

    // Response
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      msg: "An error occurred while adding product to cart",
    });
  }
});

// Increase or decrease product quantity , Accessible to all users
cartRouter.post(
  "/:userId/:productId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const { type, size } = req.query;

      // Validate type
      if (!["increase", "decrease"].includes(type)) {
        return res.status(400).json({ msg: "Invalid update type" });
      }

      // Find cart by userId
      const cart = await Cart.findOne({ userId: userId });

      // Find product in the cart by productId and size
      const existingProduct = cart.products.find(
        (product) =>
          product._id.toString() === productId && product.size === size
      );

      // Update quantity
      if (type === "increase") {
        existingProduct.quantity += 1;
      } else if (type === "decrease") {
        // Ensure that quantity won't go below 1
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        }
      }

      // Update cart total price
      cart.totalPrice = cart.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );

      // Force Mongoose to detect changes
      cart.markModified("products");

      // Save cart
      await cart.save();

      // Response
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error updating cart:", error);
      res
        .status(500)
        .json({ msg: "An error occurred while updating the cart" });
    }
  }
);

// Clear the cart , Accessible to all users
cartRouter.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found for this user" });
    }

    // Clear cart
    cart.products = [];
    cart.cartQuantity = 0;
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ msg: "An error occurred while updating the cart" });
  }
});

// Delete product from cart , Accessible to all users
cartRouter.delete(
  "/:userId/:productId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const size = req.query.size;

      // Ensure size is provided
      if (!size) {
        return res.status(400).json({ msg: "Product size is required" });
      }

      // Remove the product with the matching _id and size
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $pull: { products: { _id: productId, size: size } } },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ msg: "Cart or product not found" });
      }

      // Update cart quantity and cart total price
      updatedCart.cartQuantity = updatedCart.products.length;
      updatedCart.totalPrice = updatedCart.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );

      // Save cart
      await updatedCart.save();

      // Response
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error("Error removing product:", error);
      res
        .status(500)
        .json({ msg: "An unexpected error occurred while removing product" });
    }
  }
);

// Delete cart , Only accessible to an admin
cartRouter.delete("/:userId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({
      userId: req.params.userId,
    });

    if (!deletedCart) {
      return res.status(404).json({ msg: "Cart not found for this user" });
    }

    // Response
    res.status(200).json(deletedCart);
  } catch (error) {
    console.error("Error deleting cart:", error);
    res
      .status(500)
      .json({ msg: "An unexpected error occurred while deleting cart" });
  }
});

export default cartRouter;
