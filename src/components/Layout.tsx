import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SubMenu } from "./navbar/SubMenu";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SubMenu />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};