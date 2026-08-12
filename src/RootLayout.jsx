import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
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
      <ScrollProgressBar />

      <div className="header-bleed sticky top-0 z-30 w-full">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <Header />
          <div className="divider"></div>
        </div>
      </div>

      <div
        id="top"
        className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 min-h-screen flex flex-col justify-between"
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
          fixed bottom-10 right-10 z-50 transition-all duration-300 border border-light-border dark:border-dark-border backdrop-blur-xl
          bg-light-secondary/90 dark:bg-dark-secondary/90 text-light-title dark:text-dark-title hover:scale-105 hover:border-light-blue/60 dark:hover:border-dark-blue/60 ${showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
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
