import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles.css";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
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
import Settings from "./components/settings/settings";
import Upgrade from "./components/auth/Upgrade";

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
  const { user, isLoading, upgrade } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const [localUpworkId, setLocalUpworkId] = useState<string | null>(null);

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

  useEffect(() => {
    if (
      upgrade.value === true ||
      !user ||
      (user && (!user.upworkId || user.upworkId.length === 0))
    ) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [user, upgrade]);

  useEffect(() => {
    chrome.storage.local.get('upworkId', (result) => {
      setLocalUpworkId(result.upworkId || null);
    });
  }, [user]);

  function renderPage() {
    if (isLoading) {
      return <div className="loading-container">Loading...</div>;
    }

    if (!user) {
      return <LoginPage />;
    }

    if (upgrade.value === true) {
      return <Upgrade error={upgrade.message} />;
    }

    if (user && !user.upworkId?.length) {
      return <ScrapeProfilePage />;
    }

    switch (route) {
      case "Dashboard":
        return <Dashboard />;
      case "Settings":
        return <Settings />;
      case "Templates":
        return <TemplatesPage />;
      case "Jobs":
        return (
          <JobsPage onStartTrackingClick={() => setRoute("Saved Searches")} />
        );
      case "Saved Searches":
        return <SavedSearchesPage />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="extension-container">
      <div className={`${showSidebar ? 'main-content' : ''}`}>
        {renderPage()}
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