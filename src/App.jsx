/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import ProjectDetails from "./pages/ProjectDetails";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
const App = () => {
  return (
    <>
      <div className="container px-8 bg-light-secondary dark:bg-dark-secondary min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <div className="divider" />
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
        </Routes>
        <div>
          <div className="divider" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
