import { styled, Tab, Tabs } from "@mui/material";
import Title from "../ui/Title";
import InboxIcon from "../../assets/icon_inbox.svg";
import SavedIcon from "../../assets/icon_saved.svg";
import ArchivedIcon from "../../assets/icon_archived.svg";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import { useEffect, useState } from "react";
import type { Job } from "../../types";

const TabsWithStyle = styled(Tabs)`
  width: calc(100vw - ${SIDEBAR_WIDTH_PX}px);
`;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>();
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === "SCRAPE_UPWORK_JOBS") {
        setJobs(message.payload);
      }
    };

    chrome.runtime.sendMessage({
      type: "SCRAPE_UPWORK_JOBS",
    });

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, { type: "SCRAP_JOBS" });
    }
  });

  console.log(jobs);

  return (
    <>
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
    </>
  );
}
