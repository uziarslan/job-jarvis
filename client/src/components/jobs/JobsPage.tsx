import { Box, styled, Tab, Tabs, Typography } from "@mui/material";
import Title from "../ui/Title";
import InboxIcon from "../../assets/icon_inbox.svg";
import SavedIcon from "../../assets/icon_saved.svg";
import ArchivedIcon from "../../assets/icon_archived.svg";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { useEffect, useState } from "react";
import type { Job } from "../../types";
import { API_URL, COLOR_DEEP_GREY } from "../../constants";
import CenteredCircularProgress from "../ui/CenteredCircularProgress";

const TabsWithStyle = styled(Tabs)`
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px);
`;

const ContainerWithStyle = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const BoxWithEmptyStyle = styled(Box)`
  text-align: center;
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px);
`;

const TypographyWithEmptyStyle = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  color: ${COLOR_DEEP_GREY};
`;

const TypographyParagraphWithStyle = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR_DEEP_GREY};
`;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>();
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    const fetchJobs = async () => {
      switch (tab) {
        case 0:
          const response = await fetch(API_URL + "jobs");
          if (!response.ok) {
            throw new Error(
              "Network response wast not ok: " + response.statusText
            );
          }
          const data: Job[] = await response.json();
          setJobs(data);
          break;
        case 1: // Fetch saved jobs
        case 2: // Fetch archived jobs
        default:
          setJobs([]);
      }
    };

    fetchJobs();
  }, [tab]);

  return (
    <ContainerWithStyle>
      <Title value="Jobs" />
      <TabsWithStyle
        variant="fullWidth"
        scrollButtons="auto"
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
      >
        <Tab icon={<img src={InboxIcon} alt="Inbox Icon" />} label="Inbox" />
        <Tab icon={<img src={SavedIcon} alt="Inbox Icon" />} label="Saved" />
        <Tab
          icon={<img src={ArchivedIcon} alt="Inbox Icon" />}
          label="Archived"
        />
      </TabsWithStyle>
      <Box>
        {!jobs ? (
          <CenteredCircularProgress />
        ) : !jobs.length ? (
          <BoxWithEmptyStyle>
            <TypographyWithEmptyStyle>
              {tab === 0 && (
                <>
                  No jobs yet ! <br />{" "}
                  <TypographyParagraphWithStyle>
                    Start tracking a search to see new jobs here.
                  </TypographyParagraphWithStyle>{" "}
                </>
              )}
              {tab === 1 && "No saved jobs"}
              {tab === 2 && "No archived jobs"}
            </TypographyWithEmptyStyle>
          </BoxWithEmptyStyle>
        ) : (
          jobs.map((job) => (
            <div key={job.id}>
              <Typography>{job.title}</Typography>
              <Typography>{job.description}</Typography>
              <Typography>{job.postedAt}</Typography>
            </div>
          ))
        )}
      </Box>
    </ContainerWithStyle>
  );
}
