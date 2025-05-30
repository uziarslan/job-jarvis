import { styled, Box, Typography, Button, List, ListItem } from "@mui/material";
import {
  DEFAULT_SAVED_SEARCHES,
  getScrollbarWidth,
  SAVED_SEARCHES_KEY,
} from "../../constants";
import { SIDEBAR_WIDTH_PX } from "../Sidebar";
import SavedSearchCard from "./SavedSearchCard";
import { useEffect, useState } from "react";
import { SavedSearch, ActiveSearch } from "../../types";
import CenteredCircularProgress from "../ui/CenteredCircularProgress";
import playIcon from "../../assets/play-icon.svg";

const BottomButtonWithStyle = styled(Button)`
  margin: 20px;
  text-transform: capitalize;
`;

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>();

  useEffect(() => {
    console.log("Fetching saved searches from storage");
    chrome.storage.sync.get(SAVED_SEARCHES_KEY, (result) => {
      const searches = result[SAVED_SEARCHES_KEY] as SavedSearch[] | undefined;
      console.log("Saved searches loaded:", searches);
      setSavedSearches(searches || DEFAULT_SAVED_SEARCHES);
    });
  }, []);

  const handleMonitoringClick = (savedSearch: SavedSearch) => {
    console.log("handleMonitoringClick called for:", savedSearch.name, "URL:", savedSearch.url);
    if (!savedSearch.url && !savedSearch.enabled) {
      console.error("No URL defined for search:", savedSearch.name);
      return;
    }

    setSavedSearches((prev) => {
      if (!prev) {
        console.log("Prev is undefined, using DEFAULT_SAVED_SEARCHES");
        prev = DEFAULT_SAVED_SEARCHES;
      }
      const newSearches = prev.map((search) => {
        if (search.name === savedSearch.name) {
          const isEnabling = !search.enabled;
          console.log("Toggling enabled state to:", isEnabling);
          if (isEnabling && search.url) {
            console.log("Attempting to create tab for URL:", search.url);
            chrome.tabs.create({ url: search.url, active: false }, (tab) => {
              if (chrome.runtime.lastError) {
                console.error("Failed to create tab:", chrome.runtime.lastError.message);
                return;
              }
              console.log("Tab created with ID:", tab?.id);
              if (tab?.id) {
                const updatedSearch = { ...search, enabled: true, tabId: tab.id };
                chrome.storage.local.get("activeSearches", (result) => {
                  const activeSearches: ActiveSearch[] = result.activeSearches || [];
                  const newActiveSearches = [
                    ...activeSearches.filter((s) => s.name !== search.name),
                    { name: search.name, url: search.url!, tabId: tab.id },
                  ];
                  chrome.storage.local.set({ activeSearches: newActiveSearches }, () => {
                    if (chrome.runtime.lastError) {
                      console.error("Failed to set activeSearches:", chrome.runtime.lastError.message);
                    } else {
                      console.log("activeSearches set:", newActiveSearches);
                    }
                  });
                });
                setSavedSearches((current) => {
                  const updatedSearches = (current || DEFAULT_SAVED_SEARCHES).map((s) =>
                    s.name === search.name ? updatedSearch : s
                  );
                  chrome.storage.sync.set({ [SAVED_SEARCHES_KEY]: updatedSearches });
                  return updatedSearches;
                });
              } else {
                console.error("Tab ID is undefined for URL:", search.url);
              }
            });
            return { ...search, enabled: true };
          } else if (!isEnabling && search.enabled && search.tabId) {
            console.log("Attempting to close tab with ID:", search.tabId);
            chrome.tabs.remove(search.tabId, () => {
              if (chrome.runtime.lastError) {
                console.error("Failed to close tab:", chrome.runtime.lastError.message);
              } else {
                console.log("Tab closed successfully");
              }
            });
            chrome.storage.local.get("activeSearches", (result) => {
              const activeSearches: ActiveSearch[] = result.activeSearches || [];
              const newActiveSearches = activeSearches.filter((s) => s.tabId !== search.tabId);
              chrome.storage.local.set({ activeSearches: newActiveSearches }, () => {
                if (chrome.runtime.lastError) {
                  console.error("Failed to set activeSearches:", chrome.runtime.lastError.message);
                } else {
                  console.log("activeSearches updated:", newActiveSearches);
                }
              });
            });
            return { ...search, enabled: false, tabId: undefined };
          }
        }
        return search;
      });
      console.log("Updating savedSearches in storage:", newSearches);
      chrome.storage.sync.set({
        [SAVED_SEARCHES_KEY]: newSearches,
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to set savedSearches:", chrome.runtime.lastError.message);
        } else {
          console.log("savedSearches updated successfully");
        }
      });
      return newSearches;
    });
  };

  const handleStartMonitoringAllClick = () => {
    console.log("Start all monitoring clicked");
    setSavedSearches((prev) => {
      if (!prev) {
        console.log("Prev is undefined, using DEFAULT_SAVED_SEARCHES");
        prev = DEFAULT_SAVED_SEARCHES;
      }
      const tabIds: number[] = [];
      const newSavedSearches = prev.map((search) => {
        if (!search.enabled && search.url) {
          console.log("Creating tab for:", search.name, "URL:", search.url);
          chrome.tabs.create({ url: search.url, active: false }, (tab) => {
            if (chrome.runtime.lastError) {
              console.error("Failed to create tab:", chrome.runtime.lastError.message);
              return;
            }
            console.log("Tab created with ID:", tab?.id);
            if (tab?.id) {
              tabIds.push(tab.id);
              const updatedSearch = { ...search, enabled: true, tabId: tab.id };
              chrome.storage.local.get("activeSearches", (result) => {
                const activeSearches: ActiveSearch[] = result.activeSearches || [];
                const newActiveSearches = [
                  ...activeSearches.filter((s) => s.name !== search.name),
                  { name: search.name, url: search.url!, tabId: tab.id },
                ];
                chrome.storage.local.set({ activeSearches: newActiveSearches }, () => {
                  if (chrome.runtime.lastError) {
                    console.error("Failed to set activeSearches:", chrome.runtime.lastError.message);
                  } else {
                    console.log("activeSearches set:", newActiveSearches);
                  }
                });
              });
              setSavedSearches((current) => {
                const updatedSearches = (current || DEFAULT_SAVED_SEARCHES).map((s) =>
                  s.name === search.name ? updatedSearch : s
                );
                chrome.storage.sync.set({ [SAVED_SEARCHES_KEY]: updatedSearches });
                return updatedSearches;
              });

              // Group tabs after all are created
              if (tabIds.length === DEFAULT_SAVED_SEARCHES.length) {
                chrome.tabs.group({ tabIds }, (groupId) => {
                  if (chrome.runtime.lastError) {
                    console.error("Failed to group tabs:", chrome.runtime.lastError.message);
                  } else {
                    chrome.tabGroups.update(groupId, { title: "Job Jarvis Searches", color: "green" }, () => {
                      if (chrome.runtime.lastError) {
                        console.error("Failed to update group:", chrome.runtime.lastError.message);
                      } else {
                        console.log("Tabs grouped with ID:", groupId);
                      }
                    });
                  }
                });
              }
            } else {
              console.error("Tab ID is undefined for URL:", search.url);
            }
          });
        }
        return { ...search, enabled: true };
      });
      console.log("Updating savedSearches in storage:", newSavedSearches);
      chrome.storage.sync.set({
        [SAVED_SEARCHES_KEY]: newSavedSearches,
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to set savedSearches:", chrome.runtime.lastError.message);
        } else {
          console.log("savedSearches updated successfully");
        }
      });
      return newSavedSearches;
    });
  };

  return (
    <div className="max-width-wrapper p-3">
      <h1 className="savedSearchesHeading">Saved Searches</h1>
      <p className="savedSearchesSubHeading">
        Control which searches Job Jarvis will monitor for new jobs.
      </p>
      <div className="my-4">
        <h2 className="thirdHeading mb-2">Default Searches</h2>
        <ul className="savedSearchListContainer">
          {DEFAULT_SAVED_SEARCHES.map((search) => (
            <li key={search.name}>
              <SavedSearchCard
                savedSearch={
                  savedSearches?.find((other) => other.name === search.name) ||
                  search
                }
                onClickMonitoring={handleMonitoringClick}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4">
        <h2 className="thirdHeading mb-2">Saved Searches</h2>
        <ul className="savedSearchListContainer">
          {savedSearches ? (
            <ul className="savedSearchListContainer">
              {savedSearches
                .filter(
                  (search) =>
                    !DEFAULT_SAVED_SEARCHES.map((other) => other.name).includes(
                      search.name
                    )
                )
                .map((search) => (
                  <li key={search.name}>
                    <SavedSearchCard
                      savedSearch={search}
                      onClickMonitoring={handleMonitoringClick}
                    />
                  </li>
                ))}
              <li>
                <Button
                  sx={{
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#01A76F",
                    textTransform: "Capitalize",
                  }}
                  variant="text"
                >
                  + Import Saved Searches from Upwork
                </Button>
              </li>
            </ul>
          ) : (
            ""
          )}
        </ul>
      </div>
      <BottomButtonWithStyle
        startIcon={<img src={playIcon} alt="Play Icon" />}
        variant="contained"
        onClick={handleStartMonitoringAllClick}
      >
        Start all monitoring
      </BottomButtonWithStyle>
    </div>
  );
}