import { Box, styled, Button } from "@mui/material";
import { SavedSearch } from "../../types";
import { useState } from "react";
import chevronIconBlue from "../../assets/chevron-right.svg"
import chevronIconGrey from "../../assets/chevron-icon-grey.svg"

interface IProps {
  savedSearch: SavedSearch;
  onClickMonitoring: (savedSearch: SavedSearch) => void;
}

const ContainerWithStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "is_hovered" && prop !== "is_enabled",
}) <{ is_hovered: boolean; is_enabled: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${({ is_hovered, is_enabled }) =>
    is_hovered || is_enabled ? "#00AEEF" : "#DCDCDC"};
  padding: 6.5px 4px 6.5px 12px;
  border-radius: 4px;
  transition: border 0.3s ease;
`;

export default function SavedSearchCard({
  savedSearch,
  onClickMonitoring,
}: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <ContainerWithStyle
      is_hovered={isHovered}
      is_enabled={savedSearch?.enabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="searchNameWrapper" onClick={() => {
        onClickMonitoring(savedSearch);
      }}>
        <h3 className={`${savedSearch.enabled || isHovered ? "searchNameBlue" : ""} searchName`}>{savedSearch.name}</h3>
      </div>
      <img src={savedSearch.enabled || isHovered ? chevronIconBlue : chevronIconGrey} alt="chevron-right" />
    </ContainerWithStyle>
  );
}