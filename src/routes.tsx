import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Products } from "@/pages/Products";
import { Product } from "@/pages/Product";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { Orders } from "@/pages/Orders";
import { Order } from "@/pages/Order";
import { Account } from "@/pages/Account";
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminProducts } from "@/pages/admin/Products";
import { AdminOrders } from "@/pages/admin/Orders";
import { AdminVendors } from "@/pages/admin/Vendors";
import { AdminSettings } from "@/pages/admin/Settings";
import { VendorDashboard } from "@/pages/vendor/Dashboard";
import { VendorProducts } from "@/pages/vendor/Products";
import { VendorOrders } from "@/pages/vendor/Orders";
import { VendorSettings } from "@/pages/vendor/Settings";
import { VendorStore } from "@/components/vendor/store/VendorStore";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/orders/:id",
    element: <Order />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/products",
    element: <AdminProducts />,
  },
  {
    path: "/admin/orders",
    element: <AdminOrders />,
  },
  {
    path: "/admin/vendors",
    element: <AdminVendors />,
  },
  {
    path: "/admin/settings",
    element: <AdminSettings />,
  },
  {
    path: "/vendor",
    element: <VendorDashboard />,
  },
  {
    path: "/vendor/products",
    element: <VendorProducts />,
  },
  {
    path: "/vendor/orders",
    element: <VendorOrders />,
  },
  {
    path: "/vendor/settings",
    element: <VendorSettings />,
  },
  {
    path: "/vendor/:id",
    element: <VendorStore />,
  },
]);