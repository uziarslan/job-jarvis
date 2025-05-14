import {
  Box,
  IconButton,
  Paper,
  styled,
  Tooltip,
  useTheme,
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

const PaperWithStyle = styled(Paper)`
  position: absolute;
  width: ${SIDEBAR_WIDTH_PX}px;
  height: fit-content;
  background-color: ${(props) => props.theme.palette.secondary.main};
  right: 0;
`;

const BoxWithStyle = styled(Box)`
  margin-top: 25px;
  margin-bottom: 25px;
`;

const IconButtonWithStyle = styled(IconButton)<{
  route_selected: Route;
  route: Route;
}>`
  width: 51px;
  height: 51px;
  border-radius: 56px !important;
  background-color: ${({ route_selected, route, ...props }) =>
    route_selected === route
      ? props.theme.palette.primary.main
      : props.theme.palette.secondary.dark};
`;

const ImageWithStyle = styled("img")<{
  route_selected: Route;
  route: Route;
}>`
  width: 30px;
  height: 30px;
  filter: ${({ route_selected, route }) =>
    route_selected === route ? "brightness(0) invert(1)" : undefined};
`;

export default function Sidebar({ routeSelected, onSelectRoute }: IProps) {
  const theme = useTheme();
  const renderItem = useCallback(
    (icon: string, route: Route) => {
      return (
        <BoxWithStyle key={route}>
          <Tooltip title={route}>
            <IconButtonWithStyle
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
              size="large"
              onClick={() => onSelectRoute(route)}
              route={route}
              route_selected={routeSelected}
            >
              <ImageWithStyle
                src={icon}
                alt={route}
                route={route}
                route_selected={routeSelected}
              />
            </IconButtonWithStyle>
          </Tooltip>
        </BoxWithStyle>
      );
    },
    [routeSelected]
  );

  return (
    <PaperWithStyle>
      {renderItem(IconDashboard, "Dashboard")}
      {renderItem(IconProfile, "Profile")}
      {renderItem(IconHistory, "History")}
      {renderItem(IconTemplates, "Templates")}
      {renderItem(IconJobs, "Jobs")}
      {renderItem(IconSavedSearches, "Saved Searches")}
      {renderItem(IconManualJobProposal, "Manual Job Proposal")}
      {renderItem(IconSettings, "Settings")}
      {renderItem(IconReviews, "Reviews")}
    </PaperWithStyle>
  );
}
