🛍️ Outfits Store Project

This is a full-stack e-commerce web application where users can browse and purchase outfits. The project consists of a frontend (React) and a backend (Node.js, Express, MongoDB) with authentication, order management, and payment integration via Stripe.

🚀 Features
- ✅ User authentication (Register/Login)
- ✅ Adding product to cart, adjusting quantities and removing product from cart
- ✅ Checkout
- ✅ View your order
- ✅ Payment integration (Stripe)
- ✅ Admin dashboard to manage users, carts, orders and products
- ✅ Responsive design

1️⃣ Backend Setup
  ```bash
  cd backend
  npm install
  cp .env.example .env   # Fill in required values
  ```
2️⃣ Frontend Setup
  ```bash
  cd ../frontend
  npm install
  cp .env.example .env   # Fill in required values
  ```
🗄️ Importing Sample Products
- If you want to pre-fill the database with sample products, you can import outfitsstore.products.json into MongoDB
