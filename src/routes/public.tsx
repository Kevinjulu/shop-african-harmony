import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

// Lazy load components
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));

export const publicRoutes = [
  <Route 
    key="home"
    path="/" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Index />
      </Suspense>
    } 
  />,
  <Route 
    key="about"
    path="/about" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
    }
  />,
  <Route 
    key="contact"
    path="/contact" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    }
  />
];