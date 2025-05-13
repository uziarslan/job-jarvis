import { Box, styled } from "@mui/material";
import type { JSX } from "react";

interface IProps {
  value: JSX.Element | string;
}

const BoxWithStyle = styled(Box)`
  text-align: left;
  margin: 30px;
  width: 100vw;
`;

export default function Title({ value }: IProps) {
  return (
    <BoxWithStyle>
      <h1>{value}</h1>
    </BoxWithStyle>
  );
}
