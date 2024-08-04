/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import ProjectDetails from "./pages/ProjectDetails";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <div className="container px-8 bg-light-secondary dark:bg-dark-secondary min-h-screen flex flex-col justify-between">
        <Header />
        <div className="divider" />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ProjectDetails/:id" element={<ProjectDetails />} />
        </Routes>
        <div className="divider" />
        <Footer />
      </div>
    </>
  );
};

export default App;
