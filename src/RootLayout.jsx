import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ChevronUp } from "lucide-react";

const RootLayout = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="site-header-shell">
        <Header />
      </div>
      <div
        id="top"
        className="relative page-shell px-4 min-[768px]:px-8 min-h-screen flex flex-col justify-between"
      >
        <main>
          <Outlet />
        </main>
        <div>
          <div className="divider"></div>
          <Footer />
        </div>
      </div>

      <a
        className={`rounded-full w-10 h-10 flex justify-center items-center
          fixed bottom-10 right-10 z-50 transition-all duration-300 border border-light-border dark:border-dark-border
          bg-light-secondary dark:bg-dark-secondary text-light-title dark:text-dark-title hover:scale-105 hover:border-light-blue/40 dark:hover:border-dark-blue/40 ${showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        href="#top"
        aria-label="Scroll to top"
      >
        <ChevronUp />
      </a>
    </>
  );
};

export default RootLayout;
