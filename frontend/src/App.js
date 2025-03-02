import "./App.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import SuccessPayment from "./pages/SuccessPayment";
import CancelPayment from "./pages/CancelPayment";
import OrderPage from "./pages/OrderPage";
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  // Restrict access to authenticated users only
  function ProtectedRoute({ element }) {
    return currentUser ? element : <Navigate to="/login" />;
  }

  // Prevent logged-in users from accessing login and register pages
  function PublicRoute({ element }) {
    return currentUser ? <Navigate to="/" /> : element;
  }

  // Restrict access to admin only
  function AdminRoute({ element }) {
    return currentUser && currentUser.isAdmin ? element : <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      {/* Ensure that the viewport scrolls to the top when navigating to a new page */}
      <ScrollToTop />

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />

        {/* Auth Routes */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<PublicRoute element={<Register />} />}
        />

        {/* Product Routes */}
        <Route path="/products/search" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductPage />} />

        {/* Cart & Checkout Routes */}
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="/checkout/success"
          element={<ProtectedRoute element={<SuccessPayment />} />}
        />
        <Route
          path="/checkout/cancel"
          element={<ProtectedRoute element={<CancelPayment />} />}
        />

        {/* Order Page Route */}
        <Route
          path="/order"
          element={<ProtectedRoute element={<OrderPage />} />}
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admin"
          element={<AdminRoute element={<AdminDashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
