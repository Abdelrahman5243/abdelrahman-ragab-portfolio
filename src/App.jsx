// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import ProjectDetails from "./pages/ProjectDetails";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound";
const App = () => {
  // const [showScrollButton, setShowScrollButton] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowScrollButton(window.scrollY > 300);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <div
        id="up"
        className="container px-8 bg-light-secondary dark:bg-dark-secondary min-h-screen flex flex-col justify-between"
      >
        <div>
          <Header />
          <div className="divider" />
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div>
          <div className="divider" />
          <Footer />
        </div>
      </div>
      {/* <a
        style={{ opacity: showScrollButton ? 1 : 0, transition: "1s" }}
        href="#up"
      >
        up
      </a> */}
    </>
  );
};

export default App;
