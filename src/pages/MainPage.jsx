/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";

function MainPage() {
  return (
    <>
      <Hero />
      <div className="divider"></div>
      <Projects />
      <div className="divider"></div>
      <Contact />
    </>
  );
}

export default MainPage;
