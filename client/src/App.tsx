import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "./styles.css";
import Sidebar from "./components/Sidebar";
import { useMemo, useState } from "react";
import type { Route } from "./types";
import TemplatesPage from "./components/templates/TemplatesPage";

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
      <Sidebar onSelectRoute={setRoute} routeSelected={route} />
    </ThemeProvider>
  );
}

export default App;
