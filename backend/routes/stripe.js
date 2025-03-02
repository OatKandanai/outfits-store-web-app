import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/Order.js";

dotenv.config();

const stripeRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post("/payment", async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate that the cart contains products
    if (!products || products.length === 0) {
      return res.status(400).json({ msg: "No products in cart" });
    }

    // Shipping price
    const shippingRate = 0.15; // 15% shipping rate
    const totalPrice = products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    const shippingPrice = totalPrice >= 100 ? 0 : totalPrice * shippingRate;

    // Convert each product into a Stripe line item format
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: product.img ? [product.img] : [],
        },
        unit_amount: Math.round(product.price * 100), // Convert to cents
      },
      quantity: product.quantity,
    }));

    // Add shipping fee as a separate line item
    if (shippingPrice > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping Fee" },
          unit_amount: Math.round(shippingPrice * 100),
        },
        quantity: 1,
      });
    }

    // Save order BEFORE redirecting to Stripe
    const formattedProducts = products.map(
      ({ _id, size, quantity, price }) => ({
        productId: _id,
        size,
        quantity,
        price,
        totalPrice: quantity * price,
      })
    );
    const newOrder = new Order({
      userId,
      products: formattedProducts,
      shippingPrice,
      orderTotal: totalPrice + shippingPrice,
      status: "Processing",
    });
    const savedOrder = await newOrder.save();

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept card payments
      line_items: lineItems, // Include products and shipping fee
      mode: "payment", // One-time payment mode
      success_url: `${process.env.CLIENT_URL}/checkout/success?userId=${userId}`, // Redirect after successful payment
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel?orderId=${savedOrder._id}`, // Redirect if payment is canceled
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ msg: "Payment processing failed", error });
  }
});

export default stripeRouter;
