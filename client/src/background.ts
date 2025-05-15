import { API_URL } from "./constants";
import { Job } from "./types";

// Activating the side panel
// This is a workaround to activate the side panel on all tabs

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.sidePanel.setOptions({
          tabId: tab.id,
          path: "popup.html",
          enabled: true,
        });
      }
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId) {
    chrome.sidePanel.setOptions({
      tabId,
      path: "popup.html",
      enabled: true,
    });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  chrome.sidePanel
    .open({ windowId: tab.windowId })
    .then(() => {
      chrome.sidePanel.setOptions({
        tabId: tab.id,
        path: "popup.html",
        enabled: true,
      });
    })
    .catch((err) => {
      console.error("Unable to open side panel:", err);
    });
});

// Function to scrape job data from Upwork and send it to the backend
// This function is called every 3 minutes

function scrapeAndSendToBackend() {
  chrome.tabs.query({ url: "*://www.upwork.com/*" }, (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: scrapeJobsFromDOM,
      },
      async (results) => {
        if (chrome.runtime.lastError) {
          console.error("Scraping error:", chrome.runtime.lastError.message);
          return;
        }

        const jobs = results[0]?.result as Job[];

        await Promise.all(
          jobs.map((job) =>
            fetch(API_URL + "jobs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(job),
            })
          )
        );
      }
    );
  });
}

async function scrapeJobsFromDOM() {
  const jobSections = document.querySelectorAll(
    '[data-ev-label="visible_job_tile_impression"]'
  );
  const jobs: Job[] = [];

  jobSections.forEach((section) => {
    const link =
      section.querySelector("h3.job-tile-title a")?.getAttribute("href") ?? "";
    const match = link.match(/_~([0-9a-z]+)/i);
    const upworkId = match ? "~" + match[1] : null;
    if (!upworkId) return;

    const title =
      section.querySelector("h3.job-tile-title a")?.textContent?.trim() ?? "";
    const postedAt =
      section.querySelector('[data-test="posted-on"]')?.textContent?.trim() ??
      "";
    const description =
      section
        .querySelector('[data-test="job-description-text"]')
        ?.textContent?.trim() ?? "";
    const budget =
      section.querySelector('[data-test="budget"]')?.textContent?.trim() ?? "";
    const jobType =
      section.querySelector('[data-test="job-type"]')?.textContent?.trim() ??
      "";
    const contractorTier =
      section
        .querySelector('[data-test="contractor-tier"]')
        ?.textContent?.trim() ?? "";
    const location =
      section
        .querySelector('[data-test="client-country"]')
        ?.textContent?.trim() ?? "";
    const proposals =
      section.querySelector('[data-test="proposals"]')?.textContent?.trim() ??
      "";

    let duration = "";
    const infoText =
      section.querySelector("small.text-caption")?.textContent ?? "";
    const matchDuration = infoText.match(
      /(Less than 1 month|1 to 3 months|3 to 6 months|More than 6 months)/i
    );
    if (matchDuration) duration = matchDuration[1];

    const skills: string[] = [];
    section.querySelectorAll('[data-test="attr-item"]').forEach((el) => {
      const skill = el.textContent?.trim();
      if (skill) skills.push(skill);
    });

    const ratingStyle = section
      .querySelector(".air3-rating-foreground")
      ?.getAttribute("style");
    const ratingMatch = ratingStyle?.match(/width:\s*([\d.]+)px/);
    const rating = ratingMatch
      ? ((parseFloat(ratingMatch[1]) / 76) * 5).toFixed(1)
      : "0.0";

    const totalSpent =
      section
        .querySelector('[data-test="formatted-amount"]')
        ?.textContent?.trim() ?? "";

    const paymentVerified =
      section
        .querySelector('[data-test="payment-verification-status"] strong')
        ?.textContent?.trim() ?? "";

    jobs.push({
      id: upworkId,
      createdAt: new Date(),
      updatedAt: new Date(),
      title,
      postedAt,
      description,
      budget,
      jobType,
      contractorTier,
      location,
      proposals,
      duration,
      skills,
      clientInfo: {
        rating,
        totalSpent,
        paymentVerified,
      },
    });
  });

  return jobs;
}

scrapeAndSendToBackend();
setInterval(scrapeAndSendToBackend, 1000);
