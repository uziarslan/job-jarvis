import { Box, Button, Chip, Collapse, Rating, styled, Typography } from "@mui/material";
import { Job } from "../../types";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { COLOR_LIGHT_GREY, getScrollbarWidth } from "../../constants";
import { useState } from "react";
import { NewReleases, Place, Verified } from "@mui/icons-material";
import saveIcon from "../../assets/icon_saved.svg";
import archiveIcon from "../../assets/icon_archived.svg";

const COLLAPSE_ANIMATION_DURATION_MS = 250;

interface IProps {
  job: Job;
  onSaveJob?: (jobId: string) => void;
  onArchiveJob?: (jobId: string) => void;
}

const BoxWithStyle = styled(Box)`
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px - ${getScrollbarWidth()}px);
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  background-color: white;
  padding: 0px;
`;

const TypographyPostedAt = styled(Typography)`
  color: #676767;
  font-size: 12px;
  font-weight: 500;
`;

const TypographyTitle = styled("h3", {
  shouldForwardProp: (prop) => prop !== "is_hovered",
}) <{ is_hovered: boolean }>`
  font-size: 16px;
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 8px;
  color: ${({ is_hovered, ...props }) =>
    is_hovered ? props.theme.palette.primary.main : undefined};
  text-decoration: ${({ is_hovered }) => (is_hovered ? "underline" : "none")};
`;

const TypographyJobType = styled(Typography)`
  font-size: 12px;
  color: #676767;
  font-weight: 500;
`;

const TypographyDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "is_text_collapsed",
}) <{ is_text_collapsed: boolean }>`
  font-weight: 400;
  font-size: 16px;
  margin-top: 16px;
  display: -webkit-box;
  -webkit-line-clamp: ${({ is_text_collapsed }) =>
    is_text_collapsed ? 2 : undefined};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinkWithStyle = styled("a")`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 500;
  font-size: 16px;
  text-decoration: underline;
  margin-bottom: 16px;
`;

const ContainerChips = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0px;
`;

const ChipWithStyle = styled(Chip)`
  margin: 0px;
`;

const ContainerClientInfos = styled(Box)`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  font-weight: 400;
  color: #676767;
  flex-wrap: wrap;
`;

const ContainerProposals = styled(Box)`
  margin-top: 8px;
  color: #676767;
  font-size: 12px;
  font-weight: 400;
`;

const ButtonWithStyle = styled(Button)`
  font-size: 12px;
  padding: 4px 8px;
  min-width: 80px;
`;

export default function JobCard({ job, onSaveJob, onArchiveJob }: IProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isTextCollapsed, setIsTextCollapsed] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <BoxWithStyle>
      <TypographyPostedAt>Posted {job.postedAt}</TypographyPostedAt>
      <TypographyTitle
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        is_hovered={isHovered}
      >
        {job.title}
      </TypographyTitle>
      <TypographyJobType>
        {job.jobType} - {job.contractorTier} -{" "}
        {job.jobType.toLowerCase().includes("fixed")
          ? "Est. Budget : " + job.budget
          : "Est. Time : " + job.duration}
      </TypographyJobType>
      <Collapse
        in={isExpanded}
        timeout={COLLAPSE_ANIMATION_DURATION_MS}
        collapsedSize={70}
      >
        <TypographyDescription is_text_collapsed={isTextCollapsed}>
          {job.description}
        </TypographyDescription>
      </Collapse>
      <LinkWithStyle
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (isExpanded) {
            setIsExpanded(false);
            setTimeout(
              () => setIsTextCollapsed(true),
              COLLAPSE_ANIMATION_DURATION_MS
            );
          } else {
            setIsExpanded(true);
            setIsTextCollapsed(false);
          }
        }}
      >
        {isExpanded ? "less" : "more"}
      </LinkWithStyle>
      <ContainerChips>
        {job.skills.map((skill) => (
          <ChipWithStyle key={skill} label={skill} />
        ))}
      </ContainerChips>
      <ContainerClientInfos>
        <Box>
          {job.clientInfo.paymentVerified
            .toLowerCase()
            .includes("unverified") ? (
            <NewReleases
              fontSize={"small"}
              style={{ marginRight: "7px", position: "relative", top: "3px" }}
            />
          ) : (
            <Verified
              fontSize={"small"}
              style={{ marginRight: "7px", position: "relative", top: "3px" }}
            />
          )}
          {job.clientInfo.paymentVerified}
        </Box>
        <Box>
          <Rating value={Number(job.clientInfo.rating)} readOnly />
        </Box>
        <Box>{job.clientInfo.totalSpent} spent</Box>
        <Box className="d-flex align-items-center">
          <Place fontSize={"small"} /> {job.location}
        </Box>
      </ContainerClientInfos>
      <ContainerProposals>
        Proposals: <strong>{job.proposals}</strong>
      </ContainerProposals>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          gap: "8px",
        }}
      >
        <Button
          target="_blank"
          href={job.link}
          size="small"
          variant="contained"
          sx={{
            fontSize: "12px",
          }}
        >
          View Job
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{
            fontSize: "12px",
          }}
          onClick={() => onSaveJob?.(String(job._id))}
        >
          Save
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{
            fontSize: "12px",
          }}
          onClick={() => onArchiveJob?.(String(job._id))}
        >
          Archive
        </Button>
      </Box>
    </BoxWithStyle>
  );
}