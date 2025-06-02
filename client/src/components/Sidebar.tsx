import {
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { Route } from "../types";
import IconDashboard from "../assets/icon_dashboard.svg";
import IconHistory from "../assets/icon_history.svg";
import IconJobs from "../assets/icon_jobs.svg";
import IconManualJobProposal from "../assets/icon_manual_job_proposal.svg";
import IconProfile from "../assets/icon_profile.svg";
import IconReviews from "../assets/icon_reviews.svg";
import IconSavedSearches from "../assets/icon_saved_searches.svg";
import IconSettings from "../assets/icon_settings.svg";
import IconTemplates from "../assets/icon_templates.svg";

interface IProps {
  routeSelected: Route;
  onSelectRoute: Dispatch<SetStateAction<Route>>;
}

export const SIDEBAR_WIDTH_PX = 75;

const IconButtonWithStyle = styled(IconButton) <{
  route_selected: Route;
  route: Route;
}>`
  width: 42px;
  height: 42px;
  background-color: ${({ route_selected, route, ...props }) =>
    route_selected === route
      ? "#00AEEF"
      : "transparent"};
  &:hover {
    background-color: #00AEEF;
  }
`;

const ImageWithStyle = styled("img") <{
  route_selected: Route;
  route: Route;
}>`
width: 28px;
height: 28px;
fill: ${({ route_selected, route }) =>
    route_selected === route ? "linear-gradient(180deg, #00AEEF 0%, #16D3F0 100%)" : undefined
  };
`;

export default function Sidebar({ routeSelected, onSelectRoute }: IProps) {
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

  const getRouteUrl = (route: Route): string => {
    switch (route) {
      case "Profile":
        return `${frontendUrl}/profiles`;
      case "History":
        return `${frontendUrl}/history`;
      case "Templates":
        return `${frontendUrl}/templates`;
      case "Manual Job Proposal":
        return `${frontendUrl}`;
      case "Reviews":
        return `${frontendUrl}/reviews`;
      default:
        return "#";
    }
  };

  const renderItem = useCallback(
    (icon: string, route: Route) => {
      const url = getRouteUrl(route);
      return (
        <div className="sidebar-item">
          <Tooltip title={route} placement="left">
            <IconButtonWithStyle
              route={route}
              route_selected={routeSelected}
              onClick={() => {
                if (url !== "#") {
                  window.open(url, "_blank");
                } else {
                  onSelectRoute(route);
                }
              }}
            >
              <ImageWithStyle src={icon} alt={route} route={route} route_selected={routeSelected} />
            </IconButtonWithStyle>
          </Tooltip>
        </div>
      );
    },
    [routeSelected, frontendUrl]
  );

  return (
    <div className="sidebar-container">
      {renderItem(IconDashboard, "Dashboard")}
      {renderItem(IconProfile, "Profile")}
      {renderItem(IconHistory, "History")}
      {renderItem(IconTemplates, "Templates")}
      {renderItem(IconJobs, "Jobs")}
      {renderItem(IconSavedSearches, "Saved Searches")}
      {renderItem(IconManualJobProposal, "Manual Job Proposal")}
      {renderItem(IconSettings, "Settings")}
      {renderItem(IconReviews, "Reviews")}
    </div>
  );
}
