import type { JSX } from "@emotion/react/jsx-runtime";
import { IconButton, Paper, styled, Tooltip } from "@mui/material";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { Route } from "../types";
import {
  ContentCopy,
  Dashboard,
  Face,
  HistoryEdu,
  SaveAs,
  Settings,
  Visibility,
  Work,
  WorkHistory,
} from "@mui/icons-material";

interface IProps {
  onSelectRoute: Dispatch<SetStateAction<Route>>;
}

const PaperWithStyle = styled(Paper)`
  position: fixed;
  width: 75px;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.primary.main};
  right: 0;
`;

export default function Sidebar({ onSelectRoute }: IProps) {
  const renderItem = useCallback((icon: JSX.Element, route: Route) => {
    return (
      <Tooltip title={route} key={route}>
        <IconButton size="large" onClick={() => onSelectRoute(route)}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  }, []);

  return (
    <PaperWithStyle>
      {renderItem(<Dashboard />, "Dashboard")}
      {renderItem(<Face />, "Profile")}
      {renderItem(<HistoryEdu />, "History")}
      {renderItem(<ContentCopy />, "Templates")}
      {renderItem(<Work />, "Jobs")}
      {renderItem(<WorkHistory />, "Saved Searches")}
      {renderItem(<SaveAs />, "Manual Job Proposal")}
      {renderItem(<Settings />, "Settings")}
      {renderItem(<Visibility />, "Reviews")}
    </PaperWithStyle>
  );
}
