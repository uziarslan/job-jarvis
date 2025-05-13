import { Box, IconButton, Paper, styled, Tooltip } from "@mui/material";
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
  onSelectRoute: Dispatch<SetStateAction<Route>>;
}

export const SIDEBAR_WIDTH_PX = 75;

const PaperWithStyle = styled(Paper)`
  position: fixed;
  width: ${SIDEBAR_WIDTH_PX}px;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.secondary.main};
  right: 0;
`;

const BoxWithStyle = styled(Box)`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export default function Sidebar({ onSelectRoute }: IProps) {
  const renderItem = useCallback((icon: string, route: Route) => {
    return (
      <BoxWithStyle key={route}>
        <Tooltip title={route}>
          <IconButton size="large" onClick={() => onSelectRoute(route)}>
            <img src={icon} alt={route} />
          </IconButton>
        </Tooltip>
      </BoxWithStyle>
    );
  }, []);

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
