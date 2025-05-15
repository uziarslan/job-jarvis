import { Box, CircularProgress, styled } from "@mui/material";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { getScrollbarWidth } from "../../constants";

const BoxWithStyle = styled(Box)`
  display: flex;
  justify-content: center;
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px - ${getScrollbarWidth()}px);
  margin-top: 20vh;
`;

const CircularProgressWithStyle = styled(CircularProgress)`
  align-self: center;
`;

export default function CenteredCircularProgress() {
  return (
    <BoxWithStyle>
      <CircularProgressWithStyle />
    </BoxWithStyle>
  );
}
