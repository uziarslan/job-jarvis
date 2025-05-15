import { Box, styled } from "@mui/material";
import { SavedSearch } from "../../types";
import IconMonitorJobSearch from "../../assets/icon_saved_searches_monitor.svg";
import { COLOR_LIGHT_GREY, getScrollbarWidth } from "../../constants";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { useState } from "react";

interface IProps {
  savedSearch: SavedSearch;
  onClickMonitoring: (savedSearch: SavedSearch) => void;
}

const ContainerWithStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "is_hovered",
})<{ is_hovered: boolean }>`
  display: flex;
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px - ${getScrollbarWidth()}px);
  justify-content: space-between;
  cursor: pointer;
  background-color: ${({ is_hovered }) =>
    is_hovered ? COLOR_LIGHT_GREY : undefined};
  padding: 16px;
`;

const BoxWithStyle = styled(Box)`
  display: flex;
`;

const Indicator = styled("div", {
  shouldForwardProp: (prop) => prop !== "is_enabled",
})<{ is_enabled: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50px;
  align-self: center;
  margin-right: 5px;
  background-color: ${(props) =>
    props.is_enabled ? props.theme.palette.primary.main : "#919EAB"};
`;

export default function SavedSearchCard({
  savedSearch,
  onClickMonitoring,
}: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <ContainerWithStyle
      is_hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClickMonitoring(savedSearch)}
    >
      <BoxWithStyle>
        <Indicator is_enabled={savedSearch.enabled} />{" "}
        <h3>{savedSearch.name}</h3>
      </BoxWithStyle>
      <Box>
        <img
          style={{
            position: "relative",
            top: "10px",
          }}
          src={IconMonitorJobSearch}
          alt="Icon Monitor Job Search"
        />
      </Box>
    </ContainerWithStyle>
  );
}
