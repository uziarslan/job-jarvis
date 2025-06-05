import { styled, Button, CircularProgress } from "@mui/material";
import { DEFAULT_SAVED_SEARCHES, SAVED_SEARCHES_KEY } from "../../constants";
import SavedSearchCard from "./SavedSearchCard";
import { useEffect, useState, useRef } from "react";
import { SavedSearch } from "../../types";

// Debounce utility
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const BottomButtonWithStyle = styled(Button) <{ ismonitoringall: string }>`
  margin: 0;
  text-transform: capitalize;
  background: ${({ ismonitoringall }) => ismonitoringall.toLowerCase() === "true" ? "linear-gradient(90deg, #FF5A5F 0%, #FFB199 100%)" : "linear-gradient(90deg, #00AEEF 0%, #16D3F0 100%)"};
  border-radius: 4px;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 3%;
  height: 29px;
  width: 100%;
  color: #fff;
  &:hover {
    background: ${({ ismonitoringall }) => ismonitoringall.toLowerCase() === "true" ? "linear-gradient(90deg, #FF5A5F 0%, #FFB199 100%)" : "linear-gradient(90deg, #0097C1 0%, #13B8D6 100%)"};
  }
`;

const ButtonWithStyleDotted = styled(Button)`
  border: 1px dashed #00AEEF;
  color: #00AEEF;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: capitalize;
  height: 28px;
  width: 100%;
  border-radius: 4px;
  padding: 0;
`;

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isMonitoringAll, setIsMonitoringAll] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeIntervals, setScrapeIntervals] = useState<Map<number, NodeJS.Timeout>>(new Map());
  const [refreshIntervalMinutes, setRefreshIntervalMinutes] = useState<number>(3); // Default 3 minutes
  const isClearingJobs = useRef(false); // Prevent multiple clearJobs calls

  // Debounced storage functions
  const clearJobs = debounce(() => {
    if (isClearingJobs.current) return;
    isClearingJobs.current = true;
    chrome.storage.local.set({ scrapedJobs: [] }, () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to clear jobs:", chrome.runtime.lastError.message);
      } else {
        console.log("Cleared all jobs from storage");
      }
      isClearingJobs.current = false;
    });
  }, 1000); // Debounce 1 second

  const updateStorage = debounce((newSearches: SavedSearch[], newGroupId: number | null) => {
    chrome.storage.sync.set(
      { [SAVED_SEARCHES_KEY]: newSearches, monitoringGroupId: newGroupId },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to update storage:", chrome.runtime.lastError.message);
        } else {
          console.log("Storage updated:", newSearches, newGroupId);
        }
      }
    );
  }, 1000); // Debounce 1 second

  // Load refresh interval and saved searches
  useEffect(() => {
    // Load refresh interval
    chrome.storage.local.get(['refreshIntervalMinutes'], (result) => {
      const interval = Number(result.refreshIntervalMinutes) || 3;
      setRefreshIntervalMinutes(interval);
      console.log(`Loaded refresh interval: ${interval} minutes`);
    });

    // Listen for refresh interval changes
    const intervalListener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.refreshIntervalMinutes) {
        const newInterval = Number(changes.refreshIntervalMinutes.newValue) || 3;
        setRefreshIntervalMinutes(newInterval);
        console.log(`Refresh interval updated: ${newInterval} minutes`);
      }
    };
    chrome.storage.onChanged.addListener(intervalListener);

    // Load saved searches
    chrome.storage.sync.get([SAVED_SEARCHES_KEY, 'monitoringGroupId'], ({ [SAVED_SEARCHES_KEY]: searches, monitoringGroupId }) => {
      const loadedSearches = searches || DEFAULT_SAVED_SEARCHES;

      const validateSearches = async () => {
        const updatedSearches = await Promise.all(
          loadedSearches.map(async (search: SavedSearch) => {
            if (search.enabled && search.tabId !== undefined) {
              try {
                await new Promise((resolve, reject) => {
                  chrome.tabs.get(search.tabId!, (tab) => {
                    if (chrome.runtime.lastError || !tab) {
                      reject();
                    } else {
                      resolve(tab);
                    }
                  });
                });
                return search;
              } catch {
                console.log(`Tab ${search.tabId} for ${search.name} does not exist, disabling`);
                return { ...search, enabled: false, tabId: undefined };
              }
            }
            return { ...search, enabled: !!search.enabled };
          })
        );

        setSavedSearches(updatedSearches);
        updateStorage(updatedSearches, monitoringGroupId);
        setIsMonitoringAll(updatedSearches.every(search => !search.url || search.enabled));
      };

      validateSearches();
    });

    // Handle manual tab closure
    const tabRemovalListener = debounce((tabId: number) => {
      setSavedSearches((prev) => {
        if (!prev.some(search => search.tabId === tabId && search.enabled)) {
          return prev;
        }
        console.log(`Tab ${tabId} closed manually, clearing jobs and disabling search`);
        clearJobs();
        stopScraping(tabId);
        const newSearches = prev.map((search) =>
          search.tabId === tabId ? { ...search, enabled: false, tabId: undefined } : search
        );
        updateStorage(newSearches, groupId);
        return newSearches;
      });
    }, 1000); // Debounce 1 second

    chrome.tabs.onRemoved.addListener(tabRemovalListener);

    return () => {
      chrome.storage.onChanged.removeListener(intervalListener);
      chrome.tabs.onRemoved.removeListener(tabRemovalListener);
    };
  }, []); // Removed savedSearches dependency

  const scrapeJobs = async (tabId: number, searchName: string) => {
    try {
      const tab = await chrome.tabs.get(tabId);
      if (!tab) {
        console.log(`Tab ${tabId} no longer exists, stopping scraping for ${searchName}`);
        return false;
      }

      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "SCRAPE_JOBS", tabId }, (res) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(res);
          }
        });
      });

      const isValidResponse = (resp: any): resp is { success: boolean; data: any[]; error?: string } =>
        typeof resp === "object" && resp !== null && "success" in resp && "data" in resp;

      if (isValidResponse(response) && response.success) {
        if (!response.data) {
          console.warn(`No job data received for ${searchName}, page may not be fully loaded`);
          return false;
        }
        console.log(`Scraped ${response.data.length} jobs for ${searchName}`);
        chrome.storage.local.get(['scrapedJobs'], (result) => {
          const existingJobs = result.scrapedJobs || [];
          const newJobs = response.data.filter((job: any) =>
            !existingJobs.some((existing: any) => existing._id === job._id)
          );
          if (newJobs.length > 0) {
            const updatedJobs = [...newJobs, ...existingJobs].slice(0, 100); // Limit to 100 jobs
            chrome.storage.local.set({ scrapedJobs: updatedJobs }, () => {
              if (chrome.runtime.lastError) {
                console.error(`Failed to store jobs for ${searchName}: ${chrome.runtime.lastError.message}`);
              } else {
                console.log(`Stored ${updatedJobs.length} jobs for ${searchName}`);
              }
            });
          } else {
            console.log(`No new jobs to store for ${searchName}`);
          }
        });
        return true;
      } else {
        let errorMsg: string | undefined = undefined;
        if (typeof response === "object" && response !== null && "error" in response) {
          errorMsg = (response as any).error;
        }
        console.error(`Failed to scrape jobs for ${searchName}: ${errorMsg || 'Invalid response'}`);
        return false;
      }
    } catch (err: any) {
      console.error(`Error scraping jobs for ${searchName}: ${err.message}`);
      return false;
    }
  };

  const startScraping = async (tabId: number, searchName: string) => {
    // Clear existing interval
    if (scrapeIntervals.has(tabId)) {
      clearInterval(scrapeIntervals.get(tabId)!);
    }

    // Initial scrape
    await scrapeJobs(tabId, searchName);

    // Start interval-based refresh and scrape
    const interval = setInterval(async () => {
      try {
        await chrome.tabs.reload(tabId);
        const reloadListener = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
          if (updatedTabId === tabId && changeInfo.status === "complete") {
            chrome.tabs.onUpdated.removeListener(reloadListener);
            // Wait 2 seconds for page to fully load
            setTimeout(() => scrapeJobs(tabId, searchName), 2000);
          }
        };
        chrome.tabs.onUpdated.addListener(reloadListener);
      } catch (err: any) {
        return;
      }
    }, Math.max(refreshIntervalMinutes * 60 * 1000, 60000)); // Minimum 1 minute

    setScrapeIntervals((prev) => new Map(prev).set(tabId, interval));
  };

  const stopScraping = (tabId: number) => {
    if (scrapeIntervals.has(tabId)) {
      clearInterval(scrapeIntervals.get(tabId)!);
      setScrapeIntervals((prev) => {
        const newMap = new Map(prev);
        newMap.delete(tabId);
        return newMap;
      });
    }
    clearJobs();
  };

  const handleMonitoringClick = (savedSearch: SavedSearch) => {
    if (!savedSearch.url) {
      console.log("No URL for search:", savedSearch.name);
      return;
    }

    setSavedSearches((prev) => {
      const newSearches = prev.map((search) => {
        if (search.name !== savedSearch.name) return search;

        const isEnabling = !search.enabled;
        if (isEnabling) {
          chrome.tabs.create({ url: search.url, active: false }, (tab) => {
            if (tab?.id) {
              console.log(`Created tab ${tab.id} for ${search.name}`);
              const updatedSearches = prev.map((s) =>
                s.name === search.name ? { ...s, enabled: true, tabId: tab.id } : s
              );
              setSavedSearches(updatedSearches);
              updateStorage(updatedSearches, groupId);

              const onTabUpdated = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
                if (updatedTabId === tab.id && changeInfo.status === "complete") {
                  chrome.tabs.onUpdated.removeListener(onTabUpdated);
                  startScraping(tab.id!, search.name);
                }
              };
              chrome.tabs.onUpdated.addListener(onTabUpdated);
            } else {
              console.error("Failed to create tab for:", search.name);
            }
          });
          return { ...search, enabled: true };
        } else if (search.tabId !== undefined) {
          console.log(`Attempting to close tab ${search.tabId} for ${search.name}`);
          stopScraping(search.tabId);
          chrome.tabs.get(search.tabId, () => {
            if (chrome.runtime.lastError) {
              console.log(`Tab ${search.tabId} does not exist or is already closed`);
            } else {
              chrome.tabs.remove(search.tabId!, () => {
                if (chrome.runtime.lastError) {
                  console.error("Failed to close tab:", chrome.runtime.lastError.message);
                } else {
                  console.log(`Closed tab ${search.tabId} for ${search.name}`);
                }
              });
            }
          });
          return { ...search, enabled: false, tabId: undefined };
        }
        return search;
      });

      setIsMonitoringAll(newSearches.every(search => !search.url || search.enabled));
      updateStorage(newSearches, groupId);
      return newSearches;
    });
  };

  const handleToggleMonitoringAll = () => {
    setSavedSearches((prev) => {
      const shouldStart = !isMonitoringAll;
      const tabIds: number[] = [];

      if (shouldStart) {
        const tabCreationPromises = prev
          .filter((search) => !search.enabled && search.url)
          .map(
            (search) =>
              new Promise<void>((resolve) => {
                chrome.tabs.create({ url: search.url, active: false }, (tab) => {
                  if (tab?.id) {
                    console.log(`Created tab ${tab.id} for ${search.name}`);
                    tabIds.push(tab.id);
                    const updatedSearches = prev.map((s) =>
                      s.name === search.name ? { ...s, enabled: true, tabId: tab.id } : s
                    );
                    setSavedSearches(updatedSearches);
                    updateStorage(updatedSearches, groupId);

                    const onTabUpdated = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
                      if (updatedTabId === tab.id && changeInfo.status === "complete") {
                        chrome.tabs.onUpdated.removeListener(onTabUpdated);
                        startScraping(tab.id!, search.name);
                      }
                    };
                    chrome.tabs.onUpdated.addListener(onTabUpdated);
                  } else {
                    console.error("Failed to create tab for:", search.name);
                  }
                  resolve();
                });
              })
          );

        Promise.all(tabCreationPromises).then(() => {
          const updatedSearches = prev.map((search) => ({
            ...search,
            enabled: true,
            tabId: search.url && tabIds.includes(search.tabId!) ? search.tabId : undefined
          }));
          setSavedSearches(updatedSearches);
          updateStorage(updatedSearches, groupId);

          if (tabIds.length > 0 && chrome.tabGroups) {
            try {
              console.log(`Grouping ${tabIds.length} tabs:`, tabIds);
              chrome.tabs.group({ tabIds }, (newGroupId) => {
                console.log(`Created tab group ${newGroupId}`);
                chrome.tabGroups.update(
                  newGroupId,
                  { title: "Job Jarvis Searches", color: "blue", collapsed: true },
                  () => {
                    if (chrome.runtime.lastError) {
                      console.error("Tab group update failed:", chrome.runtime.lastError.message);
                    } else {
                      setGroupId(newGroupId);
                      updateStorage(updatedSearches, newGroupId);
                    }
                  }
                );
              });
            } catch (error) {
              console.error("Error during tab grouping:", error);
            }
          }
          setIsMonitoringAll(true);
        });
      } else {
        clearJobs();
        if (groupId && chrome.tabGroups) {
          try {
            chrome.tabs.query({ groupId }, (tabs) => {
              const groupTabIds = tabs
                .map((tab) => tab.id)
                .filter((id): id is number => id !== undefined);

              groupTabIds.forEach(stopScraping);

              if (groupTabIds.length) {
                console.log(`Closing group ${groupId} with ${groupTabIds.length} tabs`);
                chrome.tabs.remove(groupTabIds, () => {
                  if (chrome.runtime.lastError) {
                    console.error("Failed to remove group tabs:", chrome.runtime.lastError.message);
                  }
                  const updatedSearches = prev.map((search) => ({
                    ...search,
                    enabled: false,
                    tabId: undefined
                  }));
                  setSavedSearches(updatedSearches);
                  updateStorage(updatedSearches, null);
                  setGroupId(null);
                });
              } else {
                const updatedSearches = prev.map((search) => ({
                  ...search,
                  enabled: false,
                  tabId: undefined
                }));
                setSavedSearches(updatedSearches);
                updateStorage(updatedSearches, null);
                setGroupId(null);
              }
            });
          } catch (error) {
            console.error("Error while querying/removing group tabs:", error);
            scrapeIntervals.forEach((_, tabId) => stopScraping(tabId));
            const updatedSearches = prev.map((search) => ({
              ...search,
              enabled: false,
              tabId: undefined
            }));
            setSavedSearches(updatedSearches);
            updateStorage(updatedSearches, null);
            setGroupId(null);
          }
        } else {
          scrapeIntervals.forEach((_, tabId) => stopScraping(tabId));
          const updatedSearches = prev.map((search) => ({
            ...search,
            enabled: false,
            tabId: undefined
          }));
          setSavedSearches(updatedSearches);
          updateStorage(updatedSearches, null);
          setGroupId(null);
        }
        setIsMonitoringAll(false);
      }

      return prev;
    });
  };

  const handleImportClick = async () => {
    setIsLoading(true);
    try {
      const savedToLocal = async (data: any) => {
        try {
          const updatedSearches = [...data.searches, ...DEFAULT_SAVED_SEARCHES].map((search) => ({
            ...search,
            enabled: search.enabled || false,
            tabId: undefined
          }));

          setSavedSearches(updatedSearches);
          updateStorage(updatedSearches, groupId);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error("❌ Saving to local error:", err);
        }
      };

      const targetUrl = "https://www.upwork.com/nx/find-work/";

      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];

      if (currentTab?.url?.startsWith(targetUrl)) {
        console.log("Starting scraping searches");
        chrome.runtime.sendMessage({ action: "START_SCRAPING", tabId: currentTab.id }, (response) => {
          if (response?.success) {
            savedToLocal(response.data);
          } else {
            setIsLoading(false);
          }
        });
      } else {
        chrome.tabs.create({ url: targetUrl, active: false }, (newTab) => {
          const tabId = newTab?.id;

          if (!tabId) {
            setIsLoading(false);
            return;
          }

          const onTabUpdated = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
            if (updatedTabId === tabId && changeInfo.status === "complete") {
              chrome.tabs.onUpdated.removeListener(onTabUpdated);
              chrome.runtime.sendMessage({ action: "START_SCRAPING", tabId }, (response) => {
                if (response?.success) {
                  savedToLocal(response.data);
                  chrome.tabs.remove(tabId, () => {
                    if (chrome.runtime.lastError) {
                      console.error("Failed to remove import tab:", chrome.runtime.lastError.message);
                    }
                  });
                } else {
                  setIsLoading(false);
                }
              });
            }
          };

          chrome.tabs.onUpdated.addListener(onTabUpdated);
        });
      }
    } catch (err) {
      console.error("❌ Importing error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="savedSearchesHeading">Saved Searches</h1>
      <p className="savedSearchesSubHeading">
        Control which searches Job Jarvis will monitor for new jobs.
      </p>
      <div className="sectionWrapper">
        <h2 className="thirdHeading">Default Searches</h2>
        <ul className="savedSearchListContainer">
          {DEFAULT_SAVED_SEARCHES.map((search) => (
            <li key={search.name}>
              <SavedSearchCard
                savedSearch={savedSearches.find((s) => s.name === search.name) || search}
                onClickMonitoring={handleMonitoringClick}
              />
            </li>
          ))}
        </ul>
        <div className="savedSearchesSection">
          <h2 className="thirdHeading mb-2">Saved Searches</h2>
          <ul className="savedSearchListContainer">
            {savedSearches
              .filter((search) => !DEFAULT_SAVED_SEARCHES.some((s) => s.name === search.name))
              .map((search) => (
                <li key={search.name}>
                  <SavedSearchCard savedSearch={search} onClickMonitoring={handleMonitoringClick} />
                </li>
              ))}
            <li>
              <ButtonWithStyleDotted
                loading={isLoading}
                onClick={handleImportClick}
                variant="outlined"
                disabled={isLoading}
                loadingIndicator={<CircularProgress sx={{ color: "#00AEEF" }} size={20} />}
              >
                + Import Saved Searches from Upwork
              </ButtonWithStyleDotted>
            </li>
          </ul>
        </div>
        <BottomButtonWithStyle
          variant="contained"
          onClick={handleToggleMonitoringAll}
          ismonitoringall={isMonitoringAll.toString()}
        >
          {isMonitoringAll ? "Stop all monitoring" : "Start all monitoring"}
        </BottomButtonWithStyle>
      </div>
    </div>
  );
}