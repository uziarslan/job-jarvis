import { Job, ActiveSearch } from "./types";

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

// Add message listener for sidebar toggle
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleSidepanel") {
    const tab = sender.tab;
    if (!tab || !tab.id || !tab.windowId) {
      console.error("Invalid tab information");
      return;
    }

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
  }
});

function scrapeJobsFromDOM() {
  console.log("Executing scrapeJobsFromDOM in tab");
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
      _id: upworkId,
      link: `https://www.upwork.com${link}`,
      title,
      location,
      postedAt,
      jobType,
      contractorTier,
      budget,
      duration,
      description,
      skills,
      clientInfo: {
        paymentVerified,
        rating,
        totalSpent,
      },
      proposals,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  return jobs;
}