import express from "express";
import { verifyTokenAndAdmin } from "./verifyToken.js";
import Product from "../models/Product.js";

const productRouter = express.Router();

// Get a product , Accessible to all users
productRouter.get("/find/:id", async (req, res) => {
  try {
    // Get the product by id
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Response
    res.status(200).json({ msg: "Product retrieved successfully", product });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      msg: "An unexpected error occurred while getting the product",
    });
  }
});

// Get all products , Accessible to all users
productRouter.get("/", async (req, res) => {
  try {
    // Queries
    const { category, title, size, sort, limit } = req.query;

    // Build dynamic filters
    const filters = {};
    if (category) filters.category = { $in: [category] }; // Category filter
    if (title) filters.title = { $regex: title, $options: "i" };
    if (size) filters.size = { $in: [size] }; // Size filter

    // Sorting options
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      highToLow: { price: -1 },
      lowToHigh: { price: 1 },
    };
    const sortBy = sortOptions[sort] || { createdAt: -1 }; // Default to newest

    // Fetch all products from the database
    const products = await Product.find(filters).sort(sortBy).limit(limit);

    // Response
    res.status(200).json({
      msg: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    res.status(500).json({
      msg: "An unexpected error occurred while getting all products",
    });
  }
});

// Add a product , Only accessible to an admin
productRouter.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Ensure required fields exist
    const { title, desc, img, category, size, price } = req.body;
    if (!title || !desc || !img || !category || !size || !price) {
      return res.status(400).json({
        msg: "Title, Description, Image, Category, Size and Price fields are required",
      });
    }

    // Save product to the database
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    // Response
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ msg: "An unexpected error occurred while adding the product" });
  }
});

// Update a product , Only accessible to an admin
productRouter.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Update the product with new data and return the updated document
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set to update only provided fields
      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ msg: "An unexpected error occurred while updating the product" });
  }
});

// Delete a product , Only accessible to an admin
productRouter.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    // Check if product exist
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Response
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ msg: "An unexpected error occurred while deleting the product" });
  }
});

export default productRouter;
