import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./contexts/CartContext";
import { AppRoutes } from "@/routes";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster position="top-center" />
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;