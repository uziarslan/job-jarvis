import { Box, styled } from "@mui/material";
import type { JSX } from "react";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { getScrollbarWidth } from "../../constants";

interface IProps {
  value: JSX.Element | string;
}

const BoxWithStyle = styled(Box)`
  text-align: left;
  margin: 30px;
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px - ${getScrollbarWidth()}px);
`;

export default function Title({ value }: IProps) {
  return (
    <BoxWithStyle>
      <h1>{value}</h1>
    </BoxWithStyle>
  );
}
