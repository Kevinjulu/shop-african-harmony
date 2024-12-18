import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SubMenu } from "./navbar/SubMenu";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { useEffect, useState } from "react";

export const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div 
        className={`transition-all duration-300 ${
          isScrolled ? '-translate-y-12 opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <SubMenu />
      </div>
      <main className="flex-1 mt-28">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};