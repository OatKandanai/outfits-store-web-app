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
#### 🛠 Core React
- react, react-dom: Core React libraries
#### 🖼 UI & Styling
- styled-components: Allows writing CSS-in-JS
- @mui/icons-material: Material-UI for icons
#### 🔀 State Management
- @reduxjs/toolkit: For managing global state
- react-redux: Connects React components to the Redux store
- redux-persist: Persists Redux state (e.g., saving auth and cart items even after refresh)
#### 🌐 API & Routing
- axios: For making HTTP requests to the backend
- react-router-dom: Manages navigation between different pages
#### 💳 Payment Integration
- @stripe/react-stripe-js, @stripe/stripe-js: Libraries for integrating Stripe payments
## Backend Dependencies
#### 🛠 Server & Framework
- express: web framework for building APIs
- cors: Handles cross-origin requests, allowing frontend to communicate with backend
- dotenv: Loads environment variables from a .env file
#### 🔐 Authentication & Security
- jsonwebtoken (JWT): Used for user authentication
- bcrypt: Hashes passwords before storing them securely
#### 🗄 Database (MongoDB)
- mongoose: ODM (Object Data Modeling) library for MongoDB, to work with database schemas
#### 💳 Payment Integration
- stripe: Used to process payments via Stripe API
# Installation
## Backend Setup
  ```bash
  cd backend
  npm install
  ```
## Frontend Setup
  ```bash
  cd frontend
  npm install
  ```
## Nodemon Setup
  ```bash
  npm install -g nodemon
  ```

## 🔧 Setting Up MongoDB Atlas & Connecting to Backend
- This project requires a MongoDB Atlas database. Follow the steps below to create your cluster and get the connection string.
  #### Step 1: Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up or log in & Create a Cluster
  #### Step 2: Create a Database User
  #### Step 3: Get Connection String
  #### Step 4: Update the .env File , update the MONGO_URL field

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
