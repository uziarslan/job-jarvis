import { API_URL } from "./constants";
import { Job } from "./types";

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
  const waitForJobsToLoad = async (): Promise<NodeListOf<Element>> => {
    for (let i = 0; i < 10; i++) {
      const elements = document.querySelectorAll(
        '[data-ev-label="visible_job_tile_impression"]'
      );
      if (elements.length >= 5) return elements;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return document.querySelectorAll(
      '[data-ev-label="visible_job_tile_impression"]'
    );
  };

  const jobSections = await waitForJobsToLoad();
  const jobs: Job[] = [];

  jobSections.forEach((section) => {
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
    const match = infoText.match(
      /(Less than 1 month|1 to 3 months|3 to 6 months|More than 6 months)/i
    );
    if (match) duration = match[1];

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
      : undefined;

    const totalSpent =
      section
        .querySelector('[data-test="formatted-amount"]')
        ?.textContent?.trim() ?? "";

    const jobsPosted = Array.from(section.querySelectorAll("small"))
      .map((el) => el.textContent?.trim())
      .find((text) => /job posted/i.test(text ?? ""));

    jobs.push({
      id: -1,
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
        jobsPosted,
      },
    });
  });

  return jobs;
}

scrapeAndSendToBackend();
setInterval(scrapeAndSendToBackend, 3 * 60 * 1000);
