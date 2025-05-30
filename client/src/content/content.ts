import './button.css';

console.log("📦 Content script running...");

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

function injectNavbarContent() {
  const observer = new MutationObserver((mutations, obs) => {
    const navbar = document.querySelector("#nav-right > ul");
    if (navbar) {
      const customLi = document.createElement("li");
      customLi.className = "nav-dropdown";
      customLi.setAttribute("data-cy", "menu");
      customLi.setAttribute("data-cy-id", "job-jarvis");

      customLi.innerHTML = `
        <button id="caret-btn-job-jarvis" type="button" aria-expanded="false" data-cy="menu-trigger" class="nav-item">
          <span class="nav-item-label">
          <svg width="16" height="16" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.41539 6.73182C10.7388 4.35759 11.4007 3.17047 12.39 3.17047C13.3793 3.17047 14.0411 4.35759 15.3646 6.73182L15.7071 7.34607C16.0831 8.02074 16.2712 8.35809 16.5644 8.58068C16.8575 8.80325 17.2228 8.88588 17.9531 9.05112L18.618 9.20156C21.188 9.7831 22.4731 10.0738 22.7788 11.057C23.0845 12.04 22.2084 13.0645 20.4564 15.1134L20.0031 15.6434C19.5051 16.2257 19.2562 16.5168 19.1442 16.877C19.0322 17.2371 19.0699 17.6255 19.1452 18.4023L19.2137 19.1095C19.4786 21.8431 19.611 23.21 18.8106 23.8176C18.0102 24.4252 16.807 23.8712 14.4007 22.7632L13.7781 22.4766C13.0944 22.1618 12.7524 22.0043 12.39 22.0043C12.0276 22.0043 11.6856 22.1618 11.0019 22.4766L10.3793 22.7632C7.97292 23.8712 6.76975 24.4252 5.96934 23.8176C5.16893 23.21 5.30138 21.8431 5.56628 19.1095L5.63481 18.4023C5.71008 17.6255 5.74772 17.2371 5.63572 16.877C5.52373 16.5168 5.27478 16.2257 4.77689 15.6434L4.32359 15.1134C2.57148 13.0645 1.69543 12.04 2.00116 11.057C2.30688 10.0738 3.59193 9.7831 6.16201 9.20156L6.82691 9.05112C7.55725 8.88588 7.92241 8.80325 8.21562 8.58068C8.50883 8.35809 8.69688 8.02075 9.07298 7.34607L9.41539 6.73182Z" fill="url(#paint0_linear_8_295)"/>
            <path d="M3.00757 0.0979498C3.04443 -0.0320827 3.27525 -0.0328697 3.31299 0.096917C3.48534 0.689562 3.80492 1.56557 4.28818 2.04557C4.77144 2.52558 5.64957 2.83923 6.24337 3.00757C6.37342 3.04443 6.37419 3.27525 6.2444 3.31299C5.65176 3.48534 4.77575 3.80492 4.29576 4.28818C3.81575 4.77144 3.50209 5.64957 3.33376 6.24337C3.29689 6.37342 3.06607 6.37419 3.02833 6.2444C2.85599 5.65176 2.53641 4.77575 2.05315 4.29576C1.56988 3.81575 0.691751 3.50209 0.0979498 3.33376C-0.0320827 3.29689 -0.0328697 3.06607 0.096917 3.02833C0.689562 2.85599 1.56557 2.53641 2.04557 2.05315C2.52558 1.56988 2.83923 0.691751 3.00757 0.0979498Z" fill="url(#paint1_linear_8_295)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3802 1.01895C20.8894 1.01895 21.3022 1.43173 21.3022 1.94091V2.24823H21.6095C22.1187 2.24823 22.5315 2.661 22.5315 3.17018C22.5315 3.67936 22.1187 4.09214 21.6095 4.09214H21.3022V4.39945C21.3022 4.90863 20.8894 5.32141 20.3802 5.32141C19.8711 5.32141 19.4583 4.90863 19.4583 4.39945V4.09214H19.151C18.6418 4.09214 18.229 3.67936 18.229 3.17018C18.229 2.661 18.6418 2.24823 19.151 2.24823H19.4583V1.94091C19.4583 1.43173 19.8711 1.01895 20.3802 1.01895Z" fill="url(#paint2_linear_8_295)"/>
            <defs>
            <linearGradient id="paint0_linear_8_295" x1="12.39" y1="3.17047" x2="12.39" y2="24.0681" gradientUnits="userSpaceOnUse">
            <stop offset="0.25" stop-color="#19CCED"/>
            <stop offset="1" stop-color="#00AEEF"/>
            </linearGradient>
            <linearGradient id="paint1_linear_8_295" x1="3.17066" y1="0" x2="3.17066" y2="6.34133" gradientUnits="userSpaceOnUse">
            <stop offset="0.25" stop-color="#19CCED"/>
            <stop offset="1" stop-color="#00AEEF"/>
            </linearGradient>
            <linearGradient id="paint2_linear_8_295" x1="20.3802" y1="1.01895" x2="20.3802" y2="5.32141" gradientUnits="userSpaceOnUse">
            <stop offset="0.25" stop-color="#19CCED"/>
            <stop offset="1" stop-color="#00AEEF"/>
            </linearGradient>
            </defs>
          </svg>
            Job Jarvis
          </span>
          <span size="md" aria-hidden="true" class="up-s-nav-icon nav-caret nav-d-lg-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img">
              <path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M18 10l-6 5-6-5"/>
            </svg>
          </span>
        </button>
        <button type="button" aria-hidden="true" tabindex="-1" aria-labelledby="caret-btn-job-jarvis" aria-expanded="false" data-test="menu-caret" class="nav-dropdown-caret-btn">
          <span size="sm" aria-hidden="true" class="up-s-nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img">
              <path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M18 10l-6 5-6-5"/>
            </svg>
          </span>
        </button>
        <ul data-cy="dropdown-menu" class="nav-dropdown-menu mw-240" style="display: none; position: absolute; top: 100%; left: 0px; z-index: var(--nav-dropdown-zindex, 1000); width: 100%; max-height: none; min-width: 224px; margin-top: var(--nav-ws-1x, 8px); border-radius: var(--nav-dropdown-radius, 4px); background-clip: padding-box; background-color: var(--nav-dropdown-bg, #fff); box-shadow: var(--nav-dropdown-shadow); overflow: visible; padding: calc(var(--nav-ws-2x) - 3px) 0;">
          <li><button class="up-n-link nav-menu-item" data-action="toggleSidepanel">📊 Open Dashboard/Job Alert</button></li>
          <li><a href="${frontendUrl}/profiles" class="up-n-link nav-menu-item" target="_blank" data-cy="menu-item-trigger">🦸 job-jarvis Profile(s)</a></li>
          <li><a href="${frontendUrl}/templates" class="up-n-link nav-menu-item" target="_blank" data-cy="menu-item-trigger">✍️ Template Editor</a></li>
          <li><a href="${frontendUrl}/history" class="up-n-link nav-menu-item" target="_blank" data-cy="menu-item-trigger">📆 Proposal History</a></li>
          <li><a href="${frontendUrl}/settings" class="up-n-link nav-menu-item" target="_blank" data-cy="menu-item-trigger">💼 My Account/Subscription</a></li>
        </ul>
      `;

      const totalItems = navbar.children.length;
      const insertBeforeIndex = Math.max(0, totalItems - 5);
      if (totalItems >= 4) {
        navbar.insertBefore(customLi, navbar.children[insertBeforeIndex]);
      } else {
        navbar.appendChild(customLi);
      }

      // Event handlers
      const button = customLi.querySelector("#caret-btn-job-jarvis") as HTMLButtonElement;
      const dropdownMenu = customLi.querySelector(".nav-dropdown-menu") as HTMLElement;

      if (!button || !dropdownMenu) {
        console.error("Failed to find required elements");
        return;
      }

      // Mouseenter and mouseleave (desktop)
      customLi.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = "block";
      });
      customLi.addEventListener("mouseleave", () => {
        dropdownMenu.style.display = "none";
      });

      // Toggle on click (mobile)
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentDisplay = dropdownMenu.style.display;
        dropdownMenu.style.display = currentDisplay === "block" ? "none" : "block";
      });

      // Close dropdown when clicking outside (mobile fallback)
      document.addEventListener("click", (e) => {
        const target = e.target as Node;
        if (!customLi.contains(target)) {
          dropdownMenu.style.display = "none";
        }
      });

      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

injectNavbarContent();

// Function to inject buttons under job listings
function injectJobButtons() {
  // Only observe the job list container
  const jobListContainer = document.querySelector('[data-test="job-tile-list"]');
  if (!jobListContainer) return;

  const observer = new MutationObserver((mutations) => {
    console.log('Mutation detected:', mutations);
    // Only process if we have new children added
    const hasNewJobs = mutations.some(mutation => {
      console.log('Checking mutation:', mutation.type, 'addedNodes:', mutation.addedNodes.length);
      return mutation.type === 'childList' && mutation.addedNodes.length > 0;
    });
    console.log('hasNewJobs:', hasNewJobs);

    if (hasNewJobs) {
      const jobs = jobListContainer.children;
      Array.from(jobs).forEach((job: Element) => {
        if (job.querySelector('.job-jarvis-button')) return;

        const jobLinkElement = job.querySelector('a[href]');
        const jobHref = jobLinkElement?.getAttribute('href') || '#';

        const button = document.createElement('a');
        button.className = 'job-jarvis-button';
        button.href = jobHref;
        button.target = '_blank';
        button.innerHTML = `
          <span class="button-text">Apply with Job Jarvis</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_12_242)">
              <path d="M3.92744 5.93982L3.72244 6.41148C3.6904 6.48829 3.63635 6.5539 3.5671 6.60004C3.49785 6.64619 3.41649 6.67082 3.33327 6.67082C3.25005 6.67082 3.16869 6.64619 3.09944 6.60004C3.03019 6.5539 2.97614 6.48829 2.9441 6.41148L2.7391 5.93982C2.37867 5.10542 1.71859 4.43642 0.889104 4.06482L0.256604 3.78232C0.179869 3.74702 0.114865 3.69046 0.069298 3.61934C0.0237309 3.54822 -0.000488281 3.46553 -0.000488281 3.38107C-0.000488281 3.2966 0.0237309 3.21391 0.069298 3.14279C0.114865 3.07168 0.179869 3.01512 0.256604 2.97982L0.854104 2.71398C1.70444 2.3318 2.37582 1.63805 2.72994 0.775651L2.9416 0.266484C2.97257 0.187612 3.02658 0.119899 3.09659 0.0721717C3.1666 0.0244443 3.24937 -0.00108337 3.3341 -0.00108337C3.41884 -0.00108337 3.5016 0.0244443 3.57162 0.0721717C3.64163 0.119899 3.69564 0.187612 3.7266 0.266484L3.93744 0.774818C4.29118 1.63738 4.96226 2.33143 5.81244 2.71398L6.41077 2.98065C6.48727 3.01605 6.55204 3.0726 6.59744 3.14363C6.64284 3.21466 6.66696 3.29719 6.66696 3.38148C6.66696 3.46578 6.64284 3.54831 6.59744 3.61934C6.55204 3.69037 6.48727 3.74692 6.41077 3.78232L5.77744 4.06398C4.94811 4.43596 4.28833 5.10525 3.92827 5.93982M2.55327 18.0107C3.40827 12.8515 5.25994 1.66398 17.4999 1.66398C16.2533 4.16398 15.4166 5.41398 14.5833 6.24732L13.7499 7.08065L14.9999 7.91398C14.1666 10.414 11.6666 13.3307 8.33327 13.7473C6.10938 14.0251 4.71994 15.5529 4.16494 18.3307H2.49994L2.55327 18.0107Z" fill="#fff"/>
            </g>
            <defs>
              <clipPath id="clip0_12_242">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        `;

        job.appendChild(button);
      });
    }
  });

  // Only observe childList changes
  observer.observe(jobListContainer, {
    childList: true,
    subtree: false
  });
}

// Function to inject button in job details page
function injectJobDetailsButton() {
  // Try to find the button container for up to 10 seconds
  let attempts = 0;
  const maxAttempts = 20; // 20 attempts * 500ms = 10 seconds

  const findAndInjectButton = () => {
    // Target the specific container using the exact path
    const buttonContainer = document.querySelector('body > div.air3-fullscreen-element > div > div.air3-fullscreen-container.is-scrolled-bottom > div > div > div.air3-slider-body > div.job-details-loader > div > div > div.job-details-card.d-flex.gap-0.air3-card.air3-card-outline.p-0.slider > div.sidebar.air3-card-sections > section > div.d-flex.flex-column.gap.air3-btn-block > div');
    console.log('Attempting to find button container:', buttonContainer);

    if (!buttonContainer) {
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(findAndInjectButton, 500);
      }
      return;
    }

    // Get the first child element
    const firstChild = buttonContainer.firstElementChild;
    if (!firstChild) return;

    // Check if our button already exists
    if (buttonContainer.querySelector('.job-jarvis-button')) return;

    const jobHref = window.location.href;
    const jobIdMatch = jobHref.match(/~([^?]+)/);
    const jobId = jobIdMatch ? jobIdMatch[1] : '';
    const jobLink = `https://www.upwork.com/nx/proposals/job/~${jobId}/apply/`

    const button = document.createElement('a');
    button.className = 'job-jarvis-button mt-0';
    button.href = jobLink;
    button.target = '_blank';
    button.innerHTML = `
      <span class="button-text">Apply with Job Jarvis</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_12_242)">
          <path d="M3.92744 5.93982L3.72244 6.41148C3.6904 6.48829 3.63635 6.5539 3.5671 6.60004C3.49785 6.64619 3.41649 6.67082 3.33327 6.67082C3.25005 6.67082 3.16869 6.64619 3.09944 6.60004C3.03019 6.5539 2.97614 6.48829 2.9441 6.41148L2.7391 5.93982C2.37867 5.10542 1.71859 4.43642 0.889104 4.06482L0.256604 3.78232C0.179869 3.74702 0.114865 3.69046 0.069298 3.61934C0.0237309 3.54822 -0.000488281 3.46553 -0.000488281 3.38107C-0.000488281 3.2966 0.0237309 3.21391 0.069298 3.14279C0.114865 3.07168 0.179869 3.01512 0.256604 2.97982L0.854104 2.71398C1.70444 2.3318 2.37582 1.63805 2.72994 0.775651L2.9416 0.266484C2.97257 0.187612 3.02658 0.119899 3.09659 0.0721717C3.1666 0.0244443 3.24937 -0.00108337 3.3341 -0.00108337C3.41884 -0.00108337 3.5016 0.0244443 3.57162 0.0721717C3.64163 0.119899 3.69564 0.187612 3.7266 0.266484L3.93744 0.774818C4.29118 1.63738 4.96226 2.33143 5.81244 2.71398L6.41077 2.98065C6.48727 3.01605 6.55204 3.0726 6.59744 3.14363C6.64284 3.21466 6.66696 3.29719 6.66696 3.38148C6.66696 3.46578 6.64284 3.54831 6.59744 3.61934C6.55204 3.69037 6.48727 3.74692 6.41077 3.78232L5.77744 4.06398C4.94811 4.43596 4.28833 5.10525 3.92827 5.93982M2.55327 18.0107C3.40827 12.8515 5.25994 1.66398 17.4999 1.66398C16.2533 4.16398 15.4166 5.41398 14.5833 6.24732L13.7499 7.08065L14.9999 7.91398C14.1666 10.414 11.6666 13.3307 8.33327 13.7473C6.10938 14.0251 4.71994 15.5529 4.16494 18.3307H2.49994L2.55327 18.0107Z" fill="#fff"/>
        </g>
        <defs>
          <clipPath id="clip0_12_242">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `;

    // Insert before the first child
    buttonContainer.insertBefore(button, firstChild);

    // Set up observer only after we've found the container
    const observer = new MutationObserver(() => {
      // Check if our button already exists
      if (!buttonContainer.querySelector('.job-jarvis-button')) {
        buttonContainer.insertBefore(button.cloneNode(true), buttonContainer.firstElementChild);
      }
    });

    // Observe changes to the button container
    observer.observe(buttonContainer, {
      childList: true,
      subtree: true
    });
  };

  // Start the first attempt
  findAndInjectButton();
}

// Function to create the apply button
function createApplyButton(jobLink: string) {
  const button = document.createElement('a');
  button.className = 'job-jarvis-button';
  button.href = jobLink;
  button.target = '_blank';
  button.innerHTML = `
    <span class="button-text">Apply with Job Jarvis</span>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_12_242)">
        <path d="M3.92744 5.93982L3.72244 6.41148C3.6904 6.48829 3.63635 6.5539 3.5671 6.60004C3.49785 6.64619 3.41649 6.67082 3.33327 6.67082C3.25005 6.67082 3.16869 6.64619 3.09944 6.60004C3.03019 6.5539 2.97614 6.48829 2.9441 6.41148L2.7391 5.93982C2.37867 5.10542 1.71859 4.43642 0.889104 4.06482L0.256604 3.78232C0.179869 3.74702 0.114865 3.69046 0.069298 3.61934C0.0237309 3.54822 -0.000488281 3.46553 -0.000488281 3.38107C-0.000488281 3.2966 0.0237309 3.21391 0.069298 3.14279C0.114865 3.07168 0.179869 3.01512 0.256604 2.97982L0.854104 2.71398C1.70444 2.3318 2.37582 1.63805 2.72994 0.775651L2.9416 0.266484C2.97257 0.187612 3.02658 0.119899 3.09659 0.0721717C3.1666 0.0244443 3.24937 -0.00108337 3.3341 -0.00108337C3.41884 -0.00108337 3.5016 0.0244443 3.57162 0.0721717C3.64163 0.119899 3.69564 0.187612 3.7266 0.266484L3.93744 0.774818C4.29118 1.63738 4.96226 2.33143 5.81244 2.71398L6.41077 2.98065C6.48727 3.01605 6.55204 3.0726 6.59744 3.14363C6.64284 3.21466 6.66696 3.29719 6.66696 3.38148C6.66696 3.46578 6.64284 3.54831 6.59744 3.61934C6.55204 3.69037 6.48727 3.74692 6.41077 3.78232L5.77744 4.06398C4.94811 4.43596 4.28833 5.10525 3.92827 5.93982M2.55327 18.0107C3.40827 12.8515 5.25994 1.66398 17.4999 1.66398C16.2533 4.16398 15.4166 5.41398 14.5833 6.24732L13.7499 7.08065L14.9999 7.91398C14.1666 10.414 11.6666 13.3307 8.33327 13.7473C6.10938 14.0251 4.71994 15.5529 4.16494 18.3307H2.49994L2.55327 18.0107Z" fill="#fff"/>
      </g>
      <defs>
        <clipPath id="clip0_12_242">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `;
  return button;
}

// Function to process jobs
function processJobs(jobs: NodeListOf<Element>) {
  Array.from(jobs).forEach((job: Element) => {
    if (job.querySelector('.job-jarvis-button')) return;

    const jobLinkElement = job.querySelector('a[href]');
    const jobHref = jobLinkElement?.getAttribute('href') || '#';

    const button = createApplyButton(jobHref);
    job.appendChild(button);
  });
}

// Function to inject buttons on search page
function injectSearchPageButtons() {
  console.log('injectSearchPageButtons');

  // Function to process jobs in the container
  const processContainer = () => {
    const parentContainer = document.querySelector('[data-ev-sublocation="search_results"]');
    if (!parentContainer) return;

    const jobs = parentContainer.querySelectorAll('article[data-ev-job-uid]');
    console.log('Jobs found:', jobs.length);
    processJobs(jobs);
  };

  // Process initial jobs
  processContainer();

  // Set up observer for the entire document
  const observer = new MutationObserver((mutations) => {
    // Check if the search results container exists
    const parentContainer = document.querySelector('[data-ev-sublocation="search_results"]');
    if (!parentContainer) return;

    // Process all current jobs
    processContainer();
  });

  // Observe the entire document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Function to handle URL-based injection
function handleUrlBasedInjection(url: string) {
  console.log('Checking URL:', url);

  // Check if we're on a job details page
  if (url.match(/https:\/\/www\.upwork\.com\/nx\/.*\/details\/.*/)) {
    console.log('Job details page detected');
    // Remove the timeout to trigger immediately
    injectJobDetailsButton();
  }
  // Check if we're on the search page
  else if (url.match(/https:\/\/www\.upwork\.com\/nx\/search\/jobs\/.*/)) {
    console.log('Search page detected');
    setTimeout(() => {
      injectSearchPageButtons();
    }, 100);
  }
  else {
    console.log('Other page detected');
    // Original behavior for job listings
    setTimeout(() => {
      injectJobButtons();
    }, 100);
  }
}

// Handle URL changes and tab switches
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    handleUrlBasedInjection(currentUrl);
  }
}).observe(document, { subtree: true, childList: true });

// Handle initial page load
handleUrlBasedInjection(location.href);

// JWT Handler
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "FROM_WEB_TO_EXTENSION" && event.data.token) {
    chrome.storage.local.set({ token: event.data.token }, () => {
      console.log("✅ JWT stored in extension");
    });
  }
});