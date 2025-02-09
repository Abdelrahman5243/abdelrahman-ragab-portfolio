import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ChevronUp } from "lucide-react";

const RootLayout = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    // Simulating a loading state for initial content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading delay

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div
      id="top"
      className="relative container px-8 bg-light-secondary dark:bg-dark-secondary min-h-screen flex flex-col justify-between"
    >
      <div>
        <Header />
        <div className="divider"></div>
      </div>

      <Outlet />

      <div>
        <div className="divider"></div>
        <Footer />
      </div>

      <a
        className={`text-dark-title bg-[rgb(69,69,69)] rounded-full w-10 h-10 flex justify-center items-center
          fixed bottom-10 right-10 transition-opacity duration-1000 ${
            showScrollButton ? "opacity-100" : "opacity-0"
          }`}
        href="#top"
      >
        <ChevronUp />
      </a>
    </div>
  );
};

export default RootLayout;
