import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "./styles.css";
import Sidebar from "./components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import type { Route } from "./types";
import TemplatesPage from "./components/templates/TemplatesPage";
import JobsPage from "./components/jobs/JobsPage";
import SavedSearchesPage from "./components/savedSearches/SavedSearchesPage";
import { DEFAULT_SAVED_SEARCHES, SAVED_SEARCHES_KEY } from "./constants";

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

function App() {
  const [route, setRoute] = useState<Route>("Dashboard");

  useEffect(() => {
    // Initializing default saved searches in storage
    // All disabled by default
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
    switch (route) {
      case "Dashboard":
        return <div>Dashboard</div>;
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
    }
  }, [route]);

  return (
    <ThemeProvider theme={theme}>
      {renderPage}
      <Sidebar onSelectRoute={setRoute} routeSelected={route} />
    </ThemeProvider>
  );
}

export default App;
