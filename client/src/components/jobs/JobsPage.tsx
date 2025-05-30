import { useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { SAVED_SEARCHES_KEY } from "../../constants";
import { Fragment, useEffect, useState } from "react";
import type { Job, SavedSearch } from "../../types";
import CenteredCircularProgress from "../ui/CenteredCircularProgress";
import JobCard from "./JobCard";
import "bootstrap/dist/css/bootstrap.min.css";

// Import icons
import InboxIcon from "../../assets/icon_inbox.svg";
import SavedIcon from "../../assets/icon_saved.svg";
import ArchivedIcon from "../../assets/icon_archived.svg";
import filterIcon from "../../assets/filter-icon.svg";

// Styled components with fixed max-width of 288px
const ContainerWithStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 288px;
  width: 100%;
  padding: 15px;
`;

const TabsWithStyle = styled(Tabs)`
  width: 100%;
  .MuiTab-root {
    min-width: 0;
    padding: 0px;
  }
  .MuiTabs-indicator {
    background-color: #28a745;
  }
`;

const ListWithStyle = styled(List)`
  width: 100%;
`;

const BoxWithEmptyStyle = styled(Box)`
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;

const TypographyWithEmptyStyle = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 20px;
  line-height: 1.5;
`;

interface IProps {
  onStartTrackingClick: () => void;
}

const JobsPage = ({ onStartTrackingClick }: IProps) => {
  const [allJobs, setAllJobs] = useState<Job[] | null>(null);
  const [tab, setTab] = useState<number>(0);
  const [hasMonitoredSearches, setHasMonitoredSearches] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [archivedJobIds, setArchivedJobIds] = useState<string[]>([]);

  // Scrape jobs by sending a message to the background script
  const scrapeJobs = async (): Promise<Job[]> => {
    try {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "scrapeJobs" }, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response.jobs);
          }
        });
      });
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to scrape jobs"
      );
    }
  };

  // Run scraping when monitoring is active
  const runJobScraping = async () => {
    try {
      setAllJobs(null);
      const scrapedJobs = await scrapeJobs();
      setAllJobs(scrapedJobs);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setAllJobs([]);
    }
  };

  // Handle saving a job
  const handleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev : [...prev, jobId]
    );
    setArchivedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : prev
    );
  };

  // Handle archiving a job
  const handleArchiveJob = (jobId: string) => {
    setArchivedJobIds((prev) =>
      prev.includes(jobId) ? prev : [...prev, jobId]
    );
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : prev
    );
  };

  // Fetch saved searches status to determine monitoring state
  const fetchSavedSearchesStatus = () => {
    chrome.storage.sync.get(SAVED_SEARCHES_KEY, (result) => {
      const savedSearches = result[SAVED_SEARCHES_KEY] as SavedSearch[] | undefined;
      const isMonitoringActive = savedSearches?.some((search) => search.enabled) || false;
      setHasMonitoredSearches(isMonitoringActive);
      setIsMonitoring(isMonitoringActive);
    });
  };

  const displayedJobs = useMemo(() => {
    if (tab === 0) {
      console.log(allJobs)
      return allJobs || [];
    } else if (tab === 1) {
      return allJobs ? allJobs.filter((job) => savedJobIds.includes(String(job._id))) : [];
    } else if (tab === 2) {
      return allJobs ? allJobs.filter((job) => archivedJobIds.includes(String(job._id))) : [];
    }
    return [];
  }, [tab, allJobs, savedJobIds, archivedJobIds]);

  useEffect(() => {
    fetchSavedSearchesStatus();
    const onStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes[SAVED_SEARCHES_KEY]) {
        fetchSavedSearchesStatus();
      }
    };
    chrome.storage.onChanged.addListener(onStorageChange);
    return () => chrome.storage.onChanged.removeListener(onStorageChange);
  }, []);

  useEffect(() => {
    if (tab === 0 && isMonitoring) {
      runJobScraping();
      const intervalId = setInterval(runJobScraping, 30000);
      return () => clearInterval(intervalId);
    }
  }, [tab, isMonitoring]);

  return (
    <ContainerWithStyle>
      {!hasMonitoredSearches && (
        <Alert
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={onStartTrackingClick}
          severity="warning"
        >
          No active job tracking
        </Alert>
      )}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1 className="jobsPageTitle">Jobs</h1>
        <div className="dropdown">
          <a className="dropOptions" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={filterIcon} alt="Filter Icon" style={{ width: "18px" }} />
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
      <TabsWithStyle
        variant="fullWidth"
        scrollButtons="auto"
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
      >
        <Tab
          icon={<img src={InboxIcon} alt="Inbox Icon" style={{ width: "20px" }} />}
          iconPosition="start"
          label="Inbox"
          className="text-dark"
          sx={{
            fontWeight: "500",
            fontSize: "10px",
          }}
        />
        <Tab
          icon={<img src={SavedIcon} alt="Saved Icon" style={{ width: "20px" }} />}
          iconPosition="start"
          label={`Saved (${savedJobIds.length})`}
          className="text-dark"
          sx={{
            fontWeight: "500",
            fontSize: "10px",
          }}
        />
        <Tab
          icon={<img src={ArchivedIcon} alt="Archived Icon" style={{ width: "20px" }} />}
          iconPosition="start"
          label={`Archived (${archivedJobIds.length})`}
          className="text-dark"
          sx={{
            fontWeight: "500",
            fontSize: "10px",
          }}
        />
      </TabsWithStyle>
      <Box>
        {error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : displayedJobs === null ? (
          <CenteredCircularProgress />
        ) : !displayedJobs.length ? (
          <BoxWithEmptyStyle>
            <TypographyWithEmptyStyle>
              {tab === 0 && (
                <>
                  No jobs yet! <br /> Start tracking a search to see new jobs
                  here.
                </>
              )}
              {tab === 1 && "No saved jobs"}
              {tab === 2 && "No archived jobs"}
            </TypographyWithEmptyStyle>
            {tab === 0 && (
              <Button
                variant="contained"
                onClick={onStartTrackingClick}
                className="btn btn-success"
                sx={{ mt: 2 }}
              >
                Start Tracking
              </Button>
            )}
          </BoxWithEmptyStyle>
        ) : (
          <ListWithStyle>
            {displayedJobs.map((job) => (
              <Fragment key={job._id}>
                <ListItem sx={{ padding: "0px", marginBottom: "15px" }}>
                  <JobCard
                    job={job}
                    onSaveJob={handleSaveJob}
                    onArchiveJob={handleArchiveJob}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </ListWithStyle>
        )}
      </Box>
    </ContainerWithStyle>
  );
};

export default JobsPage;