# 🛍️ Outfits Store Project

This is a full-stack e-commerce web application where users can browse and purchase outfits. The project consists of a frontend (React) and a backend (Node.js, Express, MongoDB) with authentication, order management, and payment integration via Stripe.

## 🚀 Features
- ✅ User authentication (Register/Login)
- ✅ Adding product to cart, adjusting quantities and removing product from cart
- ✅ Checkout
- ✅ View your order
- ✅ Payment integration (Stripe)
- ✅ Admin dashboard to manage users, carts, orders and products
- ✅ Responsive design

### 1️⃣ Backend Setup
  ```bash
  cd backend
  npm install
  ```
### 2️⃣ Frontend Setup
  ```bash
  cd frontend
  npm install
  ```

### ⚙️ Environment Variables
- Create a .env file in both backend and frontend by copying .env.example and filling in the required values.
**Backend (.env)**
  ```bash
  SERVER_PORT=5000
  MONGO_URL=your_mongo_url
  JWT_SECRETKEY=your_secret_key
  STRIPE_SECRET_KEY=your_stripe_key
  CLIENT_URL=http://localhost:3000
  ```

### 🗄️ Importing Sample Products
- If you want to pre-fill the database with sample products, you can import outfitsstore.products.json into MongoDB, Alternatively, you can add products via the admin dashboard.
