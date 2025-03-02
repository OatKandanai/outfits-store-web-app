import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import Order from "../models/Order.js";

const orderRouter = express.Router();

// Get all users orders , Only accessible to an admin
orderRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.aggregate([
      { $unwind: "$products" }, // Unwind products array

      // Lookup to get product details
      {
        $lookup: {
          from: "products", // Ensure correct collection name
          let: { productId: { $toObjectId: "$products.productId" } }, // Convert productId to ObjectId
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$productId"] } } }, // Match with Product _id
            { $project: { title: 1, img: 1, price: 1 } }, // Fetch only required fields
          ],
          as: "productDetails",
        },
      },

      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true, // Preserve orders where products are missing
        },
      },

      // Lookup to get user details (username, email)
      {
        $lookup: {
          from: "users", // Ensure correct collection name
          let: { userId: { $toObjectId: "$userId" } }, // Convert userId to ObjectId
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }, // Match with User _id
            { $project: { username: 1, email: 1 } }, // Fetch only required fields
          ],
          as: "userDetails",
        },
      },

      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // Preserve orders where users are missing
        },
      },

      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          username: { $first: "$userDetails.username" }, // Add username
          email: { $first: "$userDetails.email" }, // Add email
          shippingPrice: { $first: "$shippingPrice" },
          orderTotal: { $first: "$orderTotal" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: {
            $push: {
              productId: "$products.productId",
              size: "$products.size",
              quantity: "$products.quantity",
              price: "$products.price",
              totalPrice: "$products.totalPrice",
              title: "$productDetails.title",
              img: "$productDetails.img",
            },
          },
        },
      },

      { $sort: { createdAt: -1 } }, // Sort by newest orders first
    ]);

    res.status(200).json(orders || []);
  } catch (error) {
    console.error("Error getting all users orders:", error);
    res.status(500).json({
      msg: "An unexpected error occurred while retrieving all users orders",
    });
  }
});

// Get order by userId , Accessible to all users
orderRouter.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // Find the orders by userId
      const userId = req.params.userId;

      // Find orders by userId and include product details
      const orders = await Order.aggregate([
        { $match: { userId } }, // Match orders for the given user

        { $unwind: "$products" }, // Unwind products array

        {
          $lookup: {
            from: "products", // Ensure correct collection name
            let: { productId: { $toObjectId: "$products.productId" } }, // Convert productId to ObjectId
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$productId"] } } }, // Match with Product _id
              { $project: { title: 1, img: 1, price: 1 } }, // Fetch only required fields
            ],
            as: "productDetails",
          },
        },

        {
          $unwind: {
            path: "$productDetails",
            preserveNullAndEmptyArrays: true,
          },
        }, // Handle missing products

        {
          $group: {
            _id: "$_id",
            userId: { $first: "$userId" },
            shippingPrice: { $first: "$shippingPrice" },
            orderTotal: { $first: "$orderTotal" },
            status: { $first: "$status" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            products: {
              $push: {
                productId: "$products.productId",
                size: "$products.size",
                quantity: "$products.quantity",
                price: "$products.price",
                totalPrice: "$products.totalPrice",
                title: "$productDetails.title",
                img: "$productDetails.img",
              },
            },
          },
        },

        { $sort: { createdAt: -1 } }, // Sort by newest orders first
      ]);

      // Response
      res.status(200).json(orders || []);
    } catch (error) {
      console.error("Error getting orders:", error);
      res
        .status(500)
        .json({ msg: "An error occurred while getting the orders" });
    }
  }
);

// Create a order , Accessible to all users
orderRouter.post("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // Save order to the database
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // Response
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ msg: "An error occurred while creating the order" });
  }
});

// Update a order , Only accessible to an admin
orderRouter.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Update the order with new data and return the updated document
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set to update only provided fields
      { new: true } // Return the updated document
    );
    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Response
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({ msg: "An unexpected error occurred while updating the order" });
  }
});

// Delete a order , Accessible to all users
orderRouter.delete(
  "/:userId/:orderId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

      // Check if order exist
      if (!deletedOrder) {
        return res.status(404).json({ msg: "Order not found" });
      }

      // Response
      res.status(200).json(deletedOrder);
    } catch (error) {
      console.error("Error deleting order:", error);
      res
        .status(500)
        .json({ msg: "An unexpected error occurred while deleting the order" });
    }
  }
);

export default orderRouter;
