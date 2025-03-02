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

## 🛠️ Tech Stack (MERN)
- Frontend: React, Redux
- Backend: Node.js, Express, MongoDB

## Frontend Dependencies
### 🛠 Core React
- react, react-dom: Core React libraries
### 🖼 UI & Styling
- styled-components: Another styling solution that allows writing CSS-in-JS
- @mui/icons-material: Material-UI for icons
### 🔀 State Management
- @reduxjs/toolkit: Modern Redux approach for managing global state
- react-redux: Connects React components to the Redux store
- redux-persist: Persists Redux state (e.g., saving auth and cart items even after refresh)
### 🌐 API & Routing
- axios: For making HTTP requests to the backend
- react-router-dom: Manages navigation between different pages
### 💳 Payment Integration
- @stripe/react-stripe-js, @stripe/stripe-js: Libraries for integrating Stripe payments

## 1️⃣ Backend Setup
  ```bash
  cd backend
  npm install
  ```
## 2️⃣ Frontend Setup
  ```bash
  cd frontend
  npm install
  ```

## ⚙️ Environment Variables
Create a .env file in both backend and frontend by copying .env.example and filling in the required values.
- **Backend (.env)**
  ```bash
  SERVER_PORT=5000
  MONGO_URL=your_mongo_url
  JWT_SECRETKEY=your_secret_key
  STRIPE_SECRET_KEY=your_stripe_secret_key
  CLIENT_URL=http://localhost:3000
  ```
- **Frontend (.env)**
  ```bash
  REACT_APP_API_URL=http://localhost:5000
  REACT_APP_STRIPE_KEY=your_stripe_publishable_key
  ```

## 🗄️ Importing Sample Products
- If you want to pre-fill the products database with sample products, you can import outfitsstore.products.json into MongoDB, Alternatively, you can add products via the admin dashboard.
