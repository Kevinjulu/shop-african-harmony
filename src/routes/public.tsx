import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

// Lazy load components with error boundaries
const Index = lazy(() => 
  import("../pages/Index")
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.error("Error loading Index page:", error);
      return import("./LoadingFallback");
    })
);

const About = lazy(() => 
  import("../pages/About")
    .then(module => ({ default: module.default }))
);

const Contact = lazy(() => 
  import("../pages/Contact")
    .then(module => ({ default: module.default }))
);

const withSuspense = (Component: React.ComponentType) => {
  return (props: any) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

export const publicRoutes = [
  <Route 
    key="home"
    path="/" 
    element={withSuspense(Index)({})}
  />,
  <Route 
    key="about"
    path="/about" 
    element={withSuspense(About)({})}
  />,
  <Route 
    key="contact"
    path="/contact" 
    element={withSuspense(Contact)({})}
  />
];