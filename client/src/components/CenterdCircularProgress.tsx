import { CircularProgress, styled } from "@mui/material";

const CircularProgressWithStyle = styled(CircularProgress)`
  align-self: center;
  margin-left: auto;
`;

export default function CenteredCircularProgress() {
  return <CircularProgressWithStyle />;
}
