import { Box, CircularProgress, styled } from "@mui/material";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";

const BoxWithStyle = styled(Box)`
  display: flex;
  justify-content: center;
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px);
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
