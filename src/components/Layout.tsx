import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SubMenu } from "./navbar/SubMenu";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "./AuthProvider";

export const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User authenticated:", user.email);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#FDB813] shadow-sm">
          <div className="container mx-auto">
            <Navbar />
            {!isMobile && <SubMenu />}
          </div>
        </div>
      </header>
      <main className={`flex-1 ${isMobile ? 'mt-14' : 'mt-[104px]'}`}>
        <Outlet />
      </main>
      <Footer />
      {isMobile && <MobileNav />}
    </div>
  );
};