// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
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
        <div>
          <Header />
          <div className="divider"></div>
        </div>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
        </Routes>

        <div>
          <div className="divider"></div>
          <Footer />
        </div>
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
