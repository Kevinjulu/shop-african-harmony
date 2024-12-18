import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SubMenu } from "./navbar/SubMenu";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? (
        <>
          <Navbar />
          <main className="flex-1 mt-16">
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <header className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
            <div 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'
              }`}
            >
              <SubMenu />
            </div>
          </header>
          <main className="flex-1 mt-28">
            <Outlet />
          </main>
        </>
      )}
      <Footer />
      <MobileNav />
    </div>
  );
};