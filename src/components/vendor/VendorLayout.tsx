import { Outlet } from "react-router-dom";
import { VendorSidebar } from "./VendorSidebar";

export const VendorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <VendorSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};