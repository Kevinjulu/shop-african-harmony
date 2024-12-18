import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

// Eagerly load critical components
import Index from "@/pages/Index";

// Lazy load non-critical components
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));

export const publicRoutes = [
  <Route key="home" path="/" element={<Index />} />,
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