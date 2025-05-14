import { Box, styled, Typography } from "@mui/material";
import { Job } from "../../types";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { COLOR_LIGHT_GREY, getScrollbarWidth } from "../../constants";
import { useState } from "react";

interface IProps {
  job: Job;
}

const BoxWithStyle = styled(Box)<{ isHovered: boolean }>`
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px - ${getScrollbarWidth()}px);
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  background-color: ${({ isHovered }) =>
    isHovered ? COLOR_LIGHT_GREY : "white"};
`;

export default function JobCard({ job }: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <BoxWithStyle
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography>Posted {job.postedAt}</Typography>
      <h3>{job.title}</h3>
      <Typography>
        {job.jobType} - {job.contractorTier} -{" "}
        {job.jobType.toLowerCase().includes("fixed")
          ? "Est. Budget : " + job.budget
          : "Est. Time : " + job.duration}
      </Typography>
      <Typography>{job.description}</Typography>
      <Typography>Location: {job.location}</Typography>
      <Typography>Proposals: {job.proposals}</Typography>
    </BoxWithStyle>
  );
}
