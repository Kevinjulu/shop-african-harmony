import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./contexts/CartContext";
import { router } from "./routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;