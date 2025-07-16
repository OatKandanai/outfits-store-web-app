# Outfits Store Project  

A **full-stack e-commerce web application** where users can browse, add products to their cart, place orders, and make payments using **Stripe**. The project consists of a **React frontend** and a **Node.js/Express backend with MongoDB**, featuring authentication, and an admin dashboard.

---

## Features  
- User authentication (Register/Login)  
- Add, update, and remove products from the cart  
- Secure checkout process  
- View past orders  
- Payment processing with Stripe  
- Admin dashboard for managing users, carts, orders, and products  
- Responsive design  

---

## Tech Stack (MERN)  

| **Technology** | **Usage** |
|--------------|-------------|
| **Frontend** | React, Redux, Styled Components, Material UI Icons |
| **Backend** | Node.js, Express, MongoDB |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT (JSON Web Token) |
| **State Management** | Redux Toolkit, Redux Persist |
| **Payment Integration** | Stripe API |

---

## Dependencies  

### **Frontend**  
#### Core React  
- **react, react-dom** → Core React libraries  
#### UI & Styling  
- **styled-components** → Allows writing CSS-in-JS  
- **@mui/icons-material** → Material-UI icons  
#### State Management  
- **@reduxjs/toolkit** → Redux state management  
- **react-redux** → Connects Redux with React  
- **redux-persist** → Saves state across page reloads  
#### API & Routing  
- **axios** → For making HTTP requests  
- **react-router-dom** → Handles navigation  
#### Payment Integration  
- **@stripe/react-stripe-js, @stripe/stripe-js** → Stripe payment libraries  

### **Backend**  
#### Server & Framework  
- **express** → Web framework for building APIs  
- **cors** → Handles cross-origin requests  
- **dotenv** → Loads environment variables from a `.env` file  
#### Authentication & Security  
- **jsonwebtoken (JWT)** → User authentication  
- **bcrypt** → Hashes passwords securely  
#### Database  
- **mongoose** → MongoDB ORM (Object Relational Mapper)  
#### Payment Integration  
- **stripe** → Stripe API for payments  

---

## Installation & Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/tickkie788/outfits-store-project.git
cd outfits-store-project
```

### **2️⃣ Install Backend Dependencies**  
```sh
cd backend
npm install
```

### **3️⃣ Install Frontend Dependencies**  
```sh
cd frontend
npm install
```

### **4️⃣ Install Nodemon**  
```sh
npm install -g nodemon
```

---

## Environment Variables  

Create a `.env` file in **both the frontend and backend** by copying `.env.example` and filling in the required values.

### **Backend (`/backend/.env`)**  
```env
SERVER_PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRETKEY=your_secret_key (can be any string of your choice)
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

### **Frontend (`/frontend/.env`)**  
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## Setting Up MongoDB Atlas  

This project requires **MongoDB Atlas** as the database. Follow these steps:  

1️⃣ **Sign up or log in** at [MongoDB Atlas](https://www.mongodb.com/atlas).  
2️⃣ **Create a Cluster** in the **free tier**.  
3️⃣ **Create a Database User** with **username & password**.  
4️⃣ **Get the Connection String** from **Database > Connect > Drivers**.  
5️⃣ **Update `.env` file** with the `MONGO_URL` value.

---

## Importing Sample Products (Optional)  

If you want to populate the database with sample products:  

- Locate `outfitsstore.products.json` in the **products data** folder.  
- Import it with MongoDB through Atlas dashboard or with [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- Select your database and choose the **products collection** then import  

---

## Stripe Payment Setup  

This project uses **Stripe** for payment processing. Follow these steps:  

1️⃣ **Sign up or log in** at [Stripe](https://dashboard.stripe.com/register).  
2️⃣ Go to **Developers > API Keys**.  
3️⃣ Copy the following keys:  
   - **Publishable Key (`pk_test_...`)** → Use in frontend `.env`.  
   - **Secret Key (`sk_test_...`)** → Use in backend `.env`.  
4️⃣ **Update your `.env` files** as shown above.  

---

## Running the Project  

```sh
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

---

## API Endpoints  

### **Authentication**  
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login and get JWT  

### **Products**  
- `GET /api/products` → Fetch all products  
- `GET /api/products/:id` → Get a specific product  

### **Cart**  
- `POST /api/cart` → Add item to cart  
- `DELETE /api/cart/:id` → Remove item from cart  

### **Orders**  
- `POST /api/orders` → Create an order  
- `GET /api/orders/:userId` → Get user orders  
- `DELETE /api/orders/:orderId` → Cancel an order  

### **Payment (Stripe)**  
- `POST /api/checkout/payment` → Process payment

---

## Setting Up Admin Access  

To access the **Admin Dashboard**, you need to set a user as an **admin** in the database.

1️⃣ **Register a new user** (or use an existing one).  
2️⃣ Open **MongoDB Compass** or **MongoDB Atlas** and go to the **users collection**.  
3️⃣ Find the user document and manually update their **isAdmin** field to **true**:  
```json
{
  "_id": "user_id_here",
  "username": "admin_user",
  "email": "admin@example.com",
  "password": "hashed_password",
  "isAdmin": true
}
```
4️⃣ Now, log in with that user, and you’ll have access to the **Admin Dashboard**.
