import { Box, styled, Button } from "@mui/material";
import { SavedSearch } from "../../types";
import { COLOR_LIGHT_GREY, getScrollbarWidth } from "../../constants";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { useState } from "react";

interface IProps {
  savedSearch: SavedSearch;
  onClickMonitoring: (savedSearch: SavedSearch) => void;
}

const ContainerWithStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "is_hovered",
}) <{ is_hovered: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ is_hovered }) =>
    is_hovered ? COLOR_LIGHT_GREY : undefined};
  padding: 10px;
  border-radius: 5px;
`;

const BoxWithStyle = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const Indicator = styled("div", {
  shouldForwardProp: (prop) => prop !== "is_enabled",
}) <{ is_enabled: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50px;
  background-color: ${(props) =>
    props.is_enabled ? props.theme.palette.primary.main : "#919EAB"};
`;

const ToggleButton = styled(Button)`
  font-size: 12px;
  padding: 4px 8px;
  text-transform: capitalize;
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
    >
      <BoxWithStyle>
        <Indicator is_enabled={savedSearch.enabled} />{" "}
        <h3 className="searchName">{savedSearch.name}</h3>
      </BoxWithStyle>
      <ToggleButton
        variant={savedSearch.enabled ? "outlined" : "contained"}
        color={savedSearch.enabled ? "secondary" : "primary"}
        onClick={() => {
          console.log("Track button clicked for:", savedSearch.name, "URL:", savedSearch.url);
          onClickMonitoring(savedSearch);
        }}
      >
        {savedSearch.enabled ? "Stop Tracking" : "Track"}
      </ToggleButton>
    </ContainerWithStyle>
  );
}