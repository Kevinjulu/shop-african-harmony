import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import Index from "./pages/Index";
import { Footer } from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import AdminDashboard from "./pages/admin/Dashboard";
import AuthPage from "./pages/Auth";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorRegister from "./pages/vendor/Register";
import VendorProducts from "./pages/vendor/Products";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import Careers from "./pages/Careers";
import Affiliate from "./pages/Affiliate";
import Terms from "./pages/Terms";
import { MobileNav } from "./components/MobileNav";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Get the base URL dynamically based on the environment
const getBaseUrl = () => {
  // Check if we're in the Lovable preview environment
  if (window.location.hostname.includes('lovable.app')) {
    return '/';
  }
  // Check if we're in development
  if (import.meta.env.DEV) {
    return '/';
  }
  // Default to GitHub Pages path
  return '/shop-african-brand/';
};

const baseUrl = getBaseUrl();
console.log('Current base URL:', baseUrl); // Debug log

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={baseUrl}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />
                  <Route path="/returns-policy" element={<ReturnsPolicy />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/affiliate" element={<Affiliate />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
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
                </Routes>
              </div>
              <Footer />
              {isMobile && <MobileNav />}
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;