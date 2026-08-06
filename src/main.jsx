import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AnalyticsProvider } from "./analytics";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AnalyticsProvider /> mounts once here, inside the router (it needs
  // useLocation) and above every route. This is the ONLY place GTM, GA4, and
  // Clarity are initialised, and the only place page_view events originate.
  <BrowserRouter>
    <AnalyticsProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </AnalyticsProvider>
  </BrowserRouter>
);
