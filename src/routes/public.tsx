import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

// Lazy load components with explicit file extensions
const Index = lazy(() => import("@/pages/Index.tsx"));
const About = lazy(() => import("@/pages/About.tsx"));
const Contact = lazy(() => import("@/pages/Contact.tsx"));

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