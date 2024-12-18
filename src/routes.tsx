import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Account from "@/pages/Account";
import AdminDashboard from "@/pages/admin/Dashboard";
import AuthPage from "@/pages/Auth";
import VendorDashboard from "@/pages/vendor/Dashboard";
import VendorProducts from "@/pages/vendor/Products";
import { VendorStore } from "@/components/vendor/store/VendorStore";
import { AuthProvider } from "@/components/AuthProvider";
import { Layout } from "@/components/Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider><Layout /></AuthProvider>}>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      <Route path="/vendor/products" element={<VendorProducts />} />
      <Route path="/vendor/:id" element={<VendorStore />} />
    </Route>
  )
);