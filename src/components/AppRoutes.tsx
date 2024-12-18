import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
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
import VendorRegister from "@/pages/vendor/Register";
import VendorProducts from "@/pages/vendor/Products";
import ShippingPolicy from "@/pages/ShippingPolicy";
import ReturnsPolicy from "@/pages/ReturnsPolicy";
import Careers from "@/pages/Careers";
import Affiliate from "@/pages/Affiliate";
import Terms from "@/pages/Terms";
import Wishlist from "@/pages/Wishlist";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/NotFound";
import StoreList from "@/pages/StoreList";

export const AppRoutes = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/register"
            element={
              <ProtectedRoute>
                <VendorRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/products"
            element={
              <ProtectedRoute>
                <VendorProducts />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};