import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { Footer } from "./components/Footer";
import { MobileNav } from "./components/MobileNav";
import { useIsMobile } from "./hooks/use-mobile";
import { AppRoutes } from "./components/AppRoutes";
import { Navbar } from "./components/Navbar";

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
  const hostname = window.location.hostname;
  console.log('Current hostname:', hostname);
  
  // Check if we're in the Lovable preview environment
  if (hostname.includes('lovable.app')) {
    console.log('Detected Lovable preview environment');
    return '';
  }
  
  // Check if we're in development
  if (import.meta.env.DEV) {
    console.log('Detected development environment');
    return '';
  }
  
  // Default to GitHub Pages path
  console.log('Using GitHub Pages path');
  return '/shop-african-brand';
};

const baseUrl = getBaseUrl();
console.log('Using base URL:', baseUrl);

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
              <Navbar />
              <div className="flex-grow">
                <AppRoutes />
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