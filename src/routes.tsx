import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";

// Eagerly load critical components
import Index from "@/pages/Index";

// Lazy load non-critical components
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Cart = lazy(() => import("@/pages/Cart"));
const Account = lazy(() => import("@/pages/Account"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const VendorDashboard = lazy(() => import("@/pages/vendor/Dashboard"));
const VendorProducts = lazy(() => import("@/pages/vendor/Products"));
const VendorRegister = lazy(() => import("@/pages/vendor/Register"));
const VendorStore = lazy(() => import("@/components/vendor/store/VendorStore"));
const NewArrivals = lazy(() => import("@/pages/NewArrivals"));
const BestSellers = lazy(() => import("@/pages/BestSellers"));
const OnSale = lazy(() => import("@/pages/OnSale"));
const Traditional = lazy(() => import("@/pages/Traditional"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const StoreList = lazy(() => import("@/pages/StoreList"));
const ShippingPolicy = lazy(() => import("@/pages/ShippingPolicy"));
const ReturnsPolicy = lazy(() => import("@/pages/ReturnsPolicy"));
const Careers = lazy(() => import("@/pages/Careers"));
const Affiliate = lazy(() => import("@/pages/Affiliate"));
const Terms = lazy(() => import("@/pages/Terms"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Checkout = lazy(() => import("@/pages/Checkout"));

const LoadingFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-[300px] w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    </div>
  </div>
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider><Layout /></AuthProvider>}>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      } />
      <Route path="/products" element={
        <Suspense fallback={<LoadingFallback />}>
          <Products />
        </Suspense>
      } />
      <Route path="/product/:id" element={
        <Suspense fallback={<LoadingFallback />}>
          <ProductDetails />
        </Suspense>
      } />
      <Route path="/cart" element={
        <Suspense fallback={<LoadingFallback />}>
          <Cart />
        </Suspense>
      } />
      <Route path="/checkout" element={
        <Suspense fallback={<LoadingFallback />}>
          <Checkout />
        </Suspense>
      } />
      <Route path="/account" element={
        <Suspense fallback={<LoadingFallback />}>
          <Account />
        </Suspense>
      } />
      <Route path="/auth" element={
        <Suspense fallback={<LoadingFallback />}>
          <AuthPage />
        </Suspense>
      } />
      <Route path="/admin/*" element={
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      } />
      <Route path="/vendor/dashboard" element={
        <Suspense fallback={<LoadingFallback />}>
          <VendorDashboard />
        </Suspense>
      } />
      <Route path="/vendor/products" element={
        <Suspense fallback={<LoadingFallback />}>
          <VendorProducts />
        </Suspense>
      } />
      <Route path="/vendor/register" element={
        <Suspense fallback={<LoadingFallback />}>
          <VendorRegister />
        </Suspense>
      } />
      <Route path="/vendor/:id" element={
        <Suspense fallback={<LoadingFallback />}>
          <VendorStore />
        </Suspense>
      } />
      <Route path="/new-arrivals" element={
        <Suspense fallback={<LoadingFallback />}>
          <NewArrivals />
        </Suspense>
      } />
      <Route path="/best-sellers" element={
        <Suspense fallback={<LoadingFallback />}>
          <BestSellers />
        </Suspense>
      } />
      <Route path="/on-sale" element={
        <Suspense fallback={<LoadingFallback />}>
          <OnSale />
        </Suspense>
      } />
      <Route path="/traditional" element={
        <Suspense fallback={<LoadingFallback />}>
          <Traditional />
        </Suspense>
      } />
      <Route path="/wishlist" element={
        <Suspense fallback={<LoadingFallback />}>
          <Wishlist />
        </Suspense>
      } />
      <Route path="/stores" element={
        <Suspense fallback={<LoadingFallback />}>
          <StoreList />
        </Suspense>
      } />
      <Route path="/shipping-policy" element={
        <Suspense fallback={<LoadingFallback />}>
          <ShippingPolicy />
        </Suspense>
      } />
      <Route path="/returns-policy" element={
        <Suspense fallback={<LoadingFallback />}>
          <ReturnsPolicy />
        </Suspense>
      } />
      <Route path="/careers" element={
        <Suspense fallback={<LoadingFallback />}>
          <Careers />
        </Suspense>
      } />
      <Route path="/affiliate" element={
        <Suspense fallback={<LoadingFallback />}>
          <Affiliate />
        </Suspense>
      } />
      <Route path="/terms" element={
        <Suspense fallback={<LoadingFallback />}>
          <Terms />
        </Suspense>
      } />
      <Route path="/faq" element={
        <Suspense fallback={<LoadingFallback />}>
          <FAQ />
        </Suspense>
      } />
      <Route path="*" element={
        <Suspense fallback={<LoadingFallback />}>
          <NotFound />
        </Suspense>
      } />
    </Route>
  )
);
