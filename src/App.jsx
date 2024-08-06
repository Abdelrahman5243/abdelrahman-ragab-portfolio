// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import { SlArrowUp } from "react-icons/sl";

const App = () => {
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
      <div
        id="top"
        className="relative container px-8 bg-light-secondary dark:bg-dark-secondary min-h-screen flex flex-col justify-between"
      >
        <Header />
        <div className="divider"></div>
        <Hero />
        <div className="divider"></div>
        <Projects />
        <div className="divider"></div>
        <Contact />
        <div className="divider"></div>
        <Footer />
        <a
          className={`text-dark-title bg-light-blue rounded-full w-10 h-10 flex justify-center items-center
            fixed bottom-10 right-10 transition-opacity duration-1000 ${
              showScrollButton ? "opacity-100" : "opacity-0"
            }`}
          href="#top"
        >
          <SlArrowUp />
        </a>
      </div>
    </>
  );
};

export default App;
