export type Route =
  | "Dashboard"
  | "Settings"
  | "Profile"
  | "History"
  | "Templates"
  | "Jobs"
  | "Saved Searches"
  | "Manual Job Proposal"
  | "Reviews";

export type SavedSearch = {
  name: string;
  enabled: boolean;
  url?: string;
  tabId?: number;
};

export interface BusinessObject {
  _id: number | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template extends BusinessObject {
  title: string;
  description: string;
  content: string;
  userId: number | string;
}

export interface Job extends BusinessObject {
  link: string;
  title: string;
  description: string;
  budget: string;
  duration: string;
  location: string;
  postedAt: string;
  skills: string[];
  jobType: string;
  contractorTier: string;
  proposals: string;
  clientInfo: {
    rating: string;
    totalSpent: string;
    paymentVerified: string;
  };
}

export interface ActiveSearch {
  name: string;
  url: string;
  tabId: number;
}
