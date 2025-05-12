import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "./styles.css";
import Sidebar from "./components/Sidebar";
import { useMemo, useState } from "react";
import type { Route } from "./types";
import TemplatesPage from "./components/templates/TemplatesPage";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1E88E5",
      dark: "#1976D2",
      light: "#2196F3",
    },
    secondary: {
      main: "#8E24AA",
      dark: "#7B1FA2",
      light: "#9C27B0",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const [route, setRoute] = useState<Route>("Dashboard");

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
        return <div>Jobs</div>;
      case "Saved Searches":
        return <div>Saved Searches</div>;
      case "Manual Job Proposal":
        return <div>Manual Job Proposal</div>;
      case "Reviews":
        return <div>Reviews</div>;
    }
  }, [route]);

  return (
    <ThemeProvider theme={theme}>
      {renderPage}
      <Sidebar onSelectRoute={setRoute} />
    </ThemeProvider>
  );
}

export default App;
