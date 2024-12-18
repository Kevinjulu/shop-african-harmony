import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="text-center">
            <motion.img
              src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png"
              alt="Shop African Brands"
              className={cn(
                "h-24 w-auto mb-4",
                "animate-bounce"
              )}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
              className="w-48 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full mx-auto overflow-hidden"
            >
              <div className="h-full w-full animate-pulse" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};