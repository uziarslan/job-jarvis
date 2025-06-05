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

// Function to scrape profile data
async function scrapeProfileData(tabId: number): Promise<any> {
  try {

    const modalDescriptions: string[] = await new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(
        tabId,
        { type: "SCRAPE_MODAL" },
        (response) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError.message);
          }

          if (response?.success) {
            resolve(response.data);
          } else {
            reject("Failed to scrape modal descriptions.");
          }
        }
      );
    });

    // Execute script to get profile data
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: (projects) => {
        // Wait for the profile content to load
        return new Promise((resolve) => {
          setTimeout(() => {
            // Define scrapeData helper function inside the executed script
            function scrapeData(path: string) {
              const element = document.querySelector(path);
              return element?.textContent?.trim() || '';
            }

            const skillsContainer = document.querySelector('#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section.air3-grid-container.gap-0.position-relative > div.span-12.span-md-8 > section.air3-card-section.work-history-section > div > div:nth-child(1) > div.air3-card.p-5.my-5.up-relevant-summary > div:nth-child(5) > div') || document.querySelector('#main .container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section.air3-card-section.work-history-section > div > div:first-child > div.air3-card.p-5.my-5.up-relevant-summary > div:nth-child(5) > div');
            const certificationsContainer = document.querySelector("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(8) > section > div > div") || document.querySelector("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(5) > section");
            const employmentContainer = document.querySelector("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(6) > div > section") || document.querySelector("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(9) > div > section");

            let skills: string[] = [];
            if (skillsContainer) {
              const skillElements = skillsContainer.querySelectorAll(".skill-name");
              skills = Array.from(skillElements).map(skill => skill.textContent?.trim() || '');
            }

            let certifications: { name: string; description: string }[] = [];

            if (certificationsContainer) {
              const certificationCards = certificationsContainer.querySelectorAll('[data-testid="certificate-wrapper"]');

              certifications = Array.from(certificationCards).map(card => {
                const issued = card.querySelector(".mb-2x span")?.textContent?.replace('Issued:', '').trim() || "";
                const provider = card.querySelector(".mb-2x")?.textContent?.replace('Provider:', '').trim() || "";
                const name = card.querySelector('h4')?.textContent?.trim() || "";
                const description = `${provider} - ${issued}`;
                return { name, description };
              });
            }

            let employment: { company: string; title: string; }[] = [];
            if (employmentContainer) {
              const employmentCards = employmentContainer.querySelectorAll('.air3-card-section.px-0 > div.d-flex > div.flex-1 > h4');
              employment = Array.from(employmentCards).map(card => {
                const company = card.textContent?.split("|")[1]?.trim() || "";
                const title = card.textContent?.split("|")[0]?.trim() || "";
                return { company, title };
              });
            }

            const formData = {
              profileDetails: {
                profileName: `${scrapeData('[itemprop="name"]')} - Main Profile`,
                profileDescription: "Job Jarvis AI Agent 2025"
              },
              personalDetails: {
                firstName: `${scrapeData('[itemprop="name"]').split(' ')[0]} ${scrapeData('[itemprop="name"]').split(' ')[1]}`,
                lastName: `${scrapeData('[itemprop="name"]').split(' ')[2]}`,
                location: `${scrapeData('[itemprop="locality"]')}, ${scrapeData('[itemprop="country-name"]')}`,
                profession: scrapeData('#main .container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section.air3-grid-container.gap-0.position-relative > div.span-12.span-md-8 > section:first-child > div.mb-10x > div > div:first-child > h2') || scrapeData('#main .container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section:first-child > div.air3-grid-container.my-3x > div.span-10 > h2'),
                rate: scrapeData('#main .container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section.air3-grid-container.gap-0.position-relative > div.span-12.span-md-8 > section:nth-child(1) > div.mb-10x > div > div.d-flex.align-items-center.flex-shrink-0 > div:nth-child(1) > h3 > span')?.replace('$', '').replace('/hr', '') || scrapeData('#main .container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section:first-child > div:nth-child(4) > h3 > strong > span')?.replace('$', '').replace('/hr', ''),
                skills: skills
              },
              profileSummary: {
                profileSummary: scrapeData('#air3-line-clamp-1 span'),
              },
              certifications: certifications,
              education: [{
                school: scrapeData("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section.air3-grid-container.gap-0.position-relative > div.span-md-4 > aside > section.air3-card-section.air3-grid-container.template-col-1 > div:nth-child(8) > ul > li > div:nth-child(1) > h5") || scrapeData("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(6) > div > div:nth-child(2) > div:nth-child(1) > ul > li > div:nth-child(1) > h5"),
                degree: scrapeData("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div.air3-card.air3-card-sections.air3-card-outline.profile-outer-card.mb-4x > section.air3-grid-container.gap-0.position-relative > div.span-md-4 > aside > section.air3-card-section.air3-grid-container.template-col-1 > div:nth-child(8) > ul > li > div:nth-child(1) > div") || scrapeData("#main > div.container > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(6) > div > div:nth-child(2) > div:nth-child(1) > ul > li > div:nth-child(1) > div")
              }],
              employmentHistory: employment,
              portfolioLinks: [{
                type: "Upwork",
                url: window.location.href,
              }],
              projects: projects
            }
            resolve(formData);
          }, 2000);
        });
      },
      args: [modalDescriptions]
    });

    const formData = results[0]?.result;
    return formData;
  } catch (error: any) {
    console.error('Error scraping profile:', error);
    throw error;
  }
}

async function scrapeUpworkSearches(tabId: number): Promise<any> {
  try {
    const data = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        return new Promise((resolve) => {
          setTimeout(() => {

            function scrapeData(path: string) {
              const element = document.querySelector(path);
              return element
            }

            const searchesContainer = scrapeData('#main > div.container > div.air3-grid-container.app-frame > div.span-12.span-lg-9 > div:nth-child(3) > div > div > div.p-0 > div > div.px-0.py-4x > div > div > div') || scrapeData('#main > div.container > div.air3-grid-container.app-frame > div.span-12.span-lg-9 > div.d-none.d-lg-block.d-block-mobile-app > div.mt-6x.min-height-20 > div');

            console.log(searchesContainer);

            let searches: { name: string, url: string }[] = [];

            if (searchesContainer) {
              let searchCards = searchesContainer.querySelectorAll('[data-test="select-saved-search"]');
              if (searchCards.length === 0) {
                searchCards = searchesContainer.querySelectorAll('span.d-inline-flex > a');
              }
              searches = Array.from(searchCards).map(card => {
                let name = card.getAttribute("data-ev-topic");
                if (!name) name = card.getAttribute("data-test-key") || "";
                const href = card?.getAttribute('href') || "";
                let url;
                if (href.includes('/nx/search/jobs/?topic_id=')) {
                  const topicId = href.split('topic_id=')[1];
                  url = `https://www.upwork.com/nx/find-work/${topicId}`;
                } else {
                  url = `https://www.upwork.com${href}`;
                }
                return { name, url };
              });
            }
            const formData = {
              searches
            }
            resolve(formData);
          }, 2000)
        });
      }
    });
    return data[0]?.result;
  } catch (err: any) {
    throw err;
  }
}

// Update message listener to handle profile scraping
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = message.tabId || sender.tab?.id;
  const respond = (success: boolean, payload: any) => {
    sendResponse({ success, ...(success ? { data: payload } : { error: payload }) });
  };

  switch (message.action) {
    case "scrapeProfile":
      if (!tabId) return respond(false, 'No tab ID available'), true;

      scrapeProfileData(tabId)
        .then(data => respond(true, data))
        .catch(error => respond(false, error.message));
      return true;

    case "START_SCRAPING":
      console.log("Starting scraping searches");
      scrapeUpworkSearches(tabId)
        .then(data => {
          respond(true, data)
        })
        .catch(error => respond(false, error.message));
      return true;

    case "SCRAPE_JOBS":
      console.log(`Scraping jobs for tab ${tabId}`);
      scrapeJobsFromDOM(tabId)
        .then(data => respond(true, data))
        .catch(error => respond(false, error.message));
      return true;

    case "profileScraped":
      console.log('Profile data received:', message.data);
      respond(true, 'Profile data received successfully');
      return true;

    case "profileScrapeError":
      console.error("Scrape failed:", message.error);
      chrome.runtime.sendMessage({ action: "profileScrapeFailed", error: message.error });
      respond(false, message.error);
      return true;

    default:
      return false;
  }
});

async function scrapeJobsFromDOM(tabId: number): Promise<any> {
  try {
    const jobs = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        console.log("Executing scrapeJobsFromDOM in tab");

        // Function to perform a single scroll cycle (down and up)
        const performScrollCycle = () => {
          return new Promise((resolve) => {
            // Scroll down incrementally
            let previousHeight = 0;
            let currentHeight = document.body.scrollHeight;
            let scrollAttempts = 0;
            const maxAttempts = 50; // Increased for incremental scrolling
            const scrollStep = 500; // Scroll by 500 pixels
            const scrollDelay = 500; // Wait 500ms between scrolls

            const scrollDownLoop = setInterval(() => {
              window.scrollBy(0, scrollStep);
              currentHeight = document.body.scrollHeight;
              scrollAttempts++;

              // Check if we've reached the bottom or max attempts
              if (window.scrollY + window.innerHeight >= document.body.scrollHeight || scrollAttempts >= maxAttempts) {
                clearInterval(scrollDownLoop);
                console.log("Reached bottom, scrolling back to top");

                // Scroll to top
                window.scrollTo(0, 0);

                // Wait briefly after scrolling to top
                setTimeout(() => {
                  resolve(null);
                }, 1000); // Wait 1 second after scrolling to top
              }

              previousHeight = currentHeight;
            }, scrollDelay);
          });
        };

        // Function to scrape jobs
        const scrapeJobs = () => {
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

          console.log(`Scraped ${jobs.length} jobs`);
          return jobs;
        };

        // Perform initial scroll cycle and scrape
        return new Promise((resolve) => {
          performScrollCycle().then(() => {
            let jobs = scrapeJobs();

            // If fewer than 10 jobs, retry scroll cycle once
            if (jobs.length < 10) {
              console.log(`Only ${jobs.length} jobs scraped, retrying scroll cycle`);
              performScrollCycle().then(() => {
                jobs = scrapeJobs();
                console.log(`After retry, scraped ${jobs.length} jobs`);
                resolve(jobs);
              });
            } else {
              resolve(jobs);
            }
          });
        });
      }
    });
    return jobs[0]?.result;
  } catch (err: any) {
    throw new Error(`Failed to scrape jobs: ${err.message}`);
  }
}