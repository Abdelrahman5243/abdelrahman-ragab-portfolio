/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";
import Contact from "../components/contact/Contact";
import Skills from "../components/skills/Skills";

function MainPage() {
  return (
    <>
      <Hero />
      <div className="divider"></div>
      <Skills />
      <div className="divider"></div>
      <Projects />
      <div className="divider"></div>
      <Contact />
    </>
  );
}

export default MainPage;
