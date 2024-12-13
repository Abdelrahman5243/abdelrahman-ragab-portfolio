import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import RootLayout from "./RootLayout";
const App = () => {
  return (
    <>
        <Routes>
        <Route element={<RootLayout/>}>
          <Route index element={<MainPage />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
    </>
  );
};

export default App;
