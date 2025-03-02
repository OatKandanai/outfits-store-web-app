import express from "express";
import { verifyTokenAndAdmin } from "./verifyToken.js";
import User from "../models/User.js";

const userRouter = express.Router();

// Get a user , Only accessible to an admin
userRouter.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Response
    res.status(200).json({ msg: "User retrieved successfully", user });
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    res.status(500).json({
      msg: "An error occurred while retrieving the user",
    });
  }
});

// Get all user , Only accessible to an admin
userRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();

    // Response
    res.status(200).json({
      msg: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res
      .status(500)
      .json({ msg: "An error occurred while retrieving all users" });
  }
});

// Update user , Only accessible to an admin
userRouter.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Update the user with new data and return the updated document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set to update only provided fields
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User has been successfully updated",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "An error occurred while updating the user" });
  }
});

// Delete user , Only accessible to an admin
userRouter.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // Check if the user exists
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Response
    res.status(200).json({
      msg: "User has been deleted",
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "An error occurred while deleting the user" });
  }
});

export default userRouter;
