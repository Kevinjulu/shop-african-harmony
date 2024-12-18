import { createBrowserRouter } from "react-router-dom";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/admin/*",
    element: <AdminDashboard />,
  },
  {
    path: "/vendor/dashboard",
    element: <VendorDashboard />,
  },
  {
    path: "/vendor/products",
    element: <VendorProducts />,
  },
  {
    path: "/vendor/:id",
    element: <VendorStore />,
  },
]);