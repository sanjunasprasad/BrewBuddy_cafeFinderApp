import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "../src/pages/Home";
import Shop from "../src/pages/Shop";
import Shopdetail from "../src/pages/Shopdetail";
import Cart from "../src/pages/Cart";
import Error404 from "./pages/Error404";
import UserOrders from "./pages/UserOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddShop from "./pages/AddShop";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shopdetail/:shopName" element={<Shopdetail />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/myorders" element={<ProtectedRoute element={<UserOrders />} />} />
          <Route path="/error" element={<Error404 />} />
         



          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/addshop" element={<AddShop />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
