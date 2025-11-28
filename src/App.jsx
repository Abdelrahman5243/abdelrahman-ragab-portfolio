import { Route, Routes } from "react-router";
import { Suspense, useState, useEffect, lazy } from "react";
import "./App.css";
import RootLayout from "./RootLayout";
import i18n from "./i18n";

// Lazy load page components for code splitting
const MainPage = lazy(() => import("./pages/MainPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ArticleSection = lazy(() => import("./components/Article/ArticleSection"));

const Loader = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <div className="loader"></div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (i18n.isInitialized) {
      setLoading(false);
    } else {
      i18n.on("initialized", () => setLoading(false));
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route
            path="/all-articles"
            element={<ArticleSection showAll={true} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
