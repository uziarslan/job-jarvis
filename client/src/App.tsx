import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles.css";
import Sidebar from "./components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import type { Route } from "./types";
import TemplatesPage from "./components/templates/TemplatesPage";
import JobsPage from "./components/jobs/JobsPage";
import SavedSearchesPage from "./components/savedSearches/SavedSearchesPage";
import { DEFAULT_SAVED_SEARCHES, SAVED_SEARCHES_KEY } from "./constants";
import Dashboard from "./components/dashboard/dashboard";
import AuthProvider from "./Context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./components/auth/LoginPage";
import ScrapeProfilePage from "./components/scrape/ScrapeProfilePage";

let theme = createTheme({
  palette: {
    primary: {
      main: "#01A76F",
      dark: "#43A047",
      light: "#66BB6A",
    },
    secondary: {
      main: "#F5F5F5",
      dark: "#E2E2E2",
      light: "#FAFAFA",
    },
  },
});

theme = responsiveFontSizes(theme);

function AppContent() {
  const [route, setRoute] = useState<Route>("Dashboard");
  const { user, isLoading } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(SAVED_SEARCHES_KEY, (result) => {
      const existing = result[SAVED_SEARCHES_KEY];
      if (!Array.isArray(existing) || existing.length === 0) {
        chrome.storage.sync.set({
          [SAVED_SEARCHES_KEY]: DEFAULT_SAVED_SEARCHES,
        });
      }
    });
  }, []);

  const renderPage = useMemo(() => {
    if (isLoading) {
      setShowSidebar(false);
      return <div className="loading-container">Loading...</div>;
    }

    if (!user) {
      setShowSidebar(false);
      return <LoginPage />;
    }

    if (user && !user.upworkId || !user.profile) {
      setShowSidebar(false);
      return <ScrapeProfilePage />;
    }

    switch (route) {
      case "Dashboard":
        return <Dashboard />;
      case "Settings":
        return <div>Settings</div>;
      case "Profile":
        return <div>Profile</div>;
      case "History":
        return <div>History</div>;
      case "Templates":
        return <TemplatesPage />;
      case "Jobs":
        return (
          <JobsPage onStartTrackingClick={() => setRoute("Saved Searches")} />
        );
      case "Saved Searches":
        return <SavedSearchesPage />;
      case "Manual Job Proposal":
        return <div>Manual Job Proposal</div>;
      case "Reviews":
        return <div>Reviews</div>;
      default:
        return <Dashboard />;
    }
  }, [route, user, isLoading]);

  return (
    <div className="extension-container">
      <div className={`${showSidebar ? 'main-content' : 'max-extension-width'}`}>
        {renderPage}
      </div>
      {showSidebar && <Sidebar onSelectRoute={setRoute} routeSelected={route} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;